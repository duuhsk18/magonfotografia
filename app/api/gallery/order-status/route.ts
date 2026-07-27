import { NextRequest, NextResponse } from 'next/server'
import { isSupabaseConfigured } from '@/lib/supabase'
import { getSignedDownloadUrl, photoStorageKeys } from '@/lib/server/r2'

/**
 * GET /api/gallery/order-status?session_id=cs_test_xxx
 *
 * Secure order status + download links.
 * Validates Stripe Checkout Session → finds order → returns real status.
 * Does NOT trust client-side data.
 */
export async function GET(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
    }

    // 1. Validate Stripe Checkout Session
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      return NextResponse.json({ error: 'Payment service not configured' }, { status: 503 })
    }

    const stripe = await import('stripe').then((m) => new m.default(stripeSecretKey))

    let checkoutSession
    try {
      checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)
    } catch (err) {
      console.error('Invalid Stripe session:', err)
      return NextResponse.json({ error: 'Invalid session' }, { status: 404 })
    }

    // 2. Extract order_id from Stripe metadata
    const orderId = checkoutSession.metadata?.order_id
    if (!orderId) {
      return NextResponse.json({ error: 'Order not found in session' }, { status: 404 })
    }

    // 3. Get order from database
    const { getAdminClient } = await import('@/lib/server/supabase-admin')
    const supabaseAdmin = getAdminClient()

    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('id, order_number, status, email, photo_ids, total_price, event_id, created_at, expires_at')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // 4. Verify Stripe payment status matches
    const stripePaymentStatus = checkoutSession.payment_status // 'paid', 'unpaid', 'no_payment_required'
    const stripeStatus = checkoutSession.status // 'complete', 'expired', 'open'

    // 5. If Stripe says paid but our DB hasn't caught up (webhook delay), update now
    if (stripePaymentStatus === 'paid' && order.status === 'pending') {
      // Webhook may not have arrived yet — fulfill inline
      await supabaseAdmin
        .from('orders')
        .update({ status: 'paid', completed_at: new Date().toISOString() })
        .eq('id', orderId)

      await supabaseAdmin
        .from('payments')
        .update({
          status: 'succeeded',
          provider_transaction_id: checkoutSession.payment_intent as string || null,
          webhook_received: true,
          completed_at: new Date().toISOString(),
        })
        .eq('order_id', orderId)

      // Create download records if they don't exist
      if (order.photo_ids?.length) {
        const { data: existingDownloads } = await supabaseAdmin
          .from('downloads')
          .select('id')
          .eq('order_id', orderId)
          .limit(1)

        if (!existingDownloads?.length) {
          const downloads = order.photo_ids.map((photoId: string) => ({
            order_id: orderId,
            photo_id: photoId,
            downloaded: false,
            expires_at: order.expires_at,
          }))
          await supabaseAdmin.from('downloads').insert(downloads)
        }
      }

      order.status = 'paid'
    }

    // 6. Build response based on status
    const response: Record<string, unknown> = {
      success: true,
      order: {
        orderNumber: order.order_number,
        status: order.status,
        email: order.email,
        totalPrice: order.total_price,
        photoCount: order.photo_ids?.length || 0,
        createdAt: order.created_at,
        expiresAt: order.expires_at,
      },
      stripe: {
        paymentStatus: stripePaymentStatus,
        sessionStatus: stripeStatus,
      },
    }

    // 7. If paid, generate download links
    if (order.status === 'paid' && order.photo_ids?.length) {
      // Get event slug for R2 paths
      const { data: eventRow } = await supabaseAdmin
        .from('events')
        .select('slug')
        .eq('id', order.event_id)
        .single()

      const eventSlug = eventRow?.slug || order.event_id

      // Get photo details
      const { data: photos } = await supabaseAdmin
        .from('photos')
        .select('id, filename, preview_thumb_url')
        .in('id', order.photo_ids)

      if (photos) {
        const downloadItems = await Promise.all(
          photos.map(async (photo) => {
            const keys = photoStorageKeys(eventSlug, photo.filename)
            let downloadUrl: string | null = null

            try {
              downloadUrl = await getSignedDownloadUrl(keys.original, 3600)
            } catch (err) {
              console.error(`Failed to generate URL for ${photo.filename}:`, err)
            }

            return {
              photoId: photo.id,
              filename: photo.filename,
              thumbUrl: photo.preview_thumb_url || '',
              downloadUrl,
            }
          })
        )

        response.downloads = downloadItems
      }
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('Order status error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
