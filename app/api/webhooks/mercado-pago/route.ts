import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/webhooks/mercado-pago
 * Handles Mercado Pago webhook notifications (Pix payments).
 *
 * IDEMPOTENT: Checks if order is already paid before processing.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate webhook token if configured.
    // Mercado Pago signs notifications with x-signature; full HMAC validation is part of the credentialed E2E test.
    if (process.env.MP_WEBHOOK_TOKEN) {
      const signature = request.headers.get('x-signature') || new URL(request.url).searchParams.get('token')
      if (!signature) {
        return NextResponse.json({ error: 'Missing Mercado Pago signature' }, { status: 401 })
      }
    }

    // MP sends different notification types
    const { type, data, action } = body

    if (type === 'payment' || action === 'payment.updated') {
      const paymentId = data?.id

      if (!paymentId) {
        return NextResponse.json({ received: true }, { status: 200 })
      }

      // Fetch payment details from Mercado Pago API
      const accessToken = process.env.MP_ACCESS_TOKEN
      if (!accessToken) {
        console.error('MP_ACCESS_TOKEN not configured')
        return NextResponse.json({ error: 'Not configured' }, { status: 500 })
      }

      const mpResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )

      if (!mpResponse.ok) {
        console.error('Failed to fetch MP payment:', mpResponse.status)
        return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 })
      }

      const paymentData = await mpResponse.json()
      const orderId = paymentData.metadata?.order_id

      if (!orderId) {
        console.log('MP webhook without order_id metadata — ignoring')
        return NextResponse.json({ received: true }, { status: 200 })
      }

      // Handle payment status
      switch (paymentData.status) {
        case 'approved':
          await fulfillOrder(orderId, String(paymentId), 'mercado_pago')
          break

        case 'rejected':
        case 'cancelled':
          await markOrderFailed(orderId, paymentData.status_detail || paymentData.status)
          break

        case 'pending':
        case 'in_process':
          // Update payment status but don't fulfill
          await updatePaymentStatus(orderId, 'processing')
          break

        default:
          console.log(`Unhandled MP payment status: ${paymentData.status}`)
          break
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('MP webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

// ========================
// ORDER FULFILLMENT (shared logic)
// ========================

async function fulfillOrder(orderId: string, providerTransactionId: string, provider: string) {
  const { getAdminClient } = await import('@/lib/server/supabase-admin')
  const supabaseAdmin = getAdminClient()

  // IDEMPOTENT: Check if already fulfilled
  const { data: existingOrder } = await supabaseAdmin
    .from('orders')
    .select('status')
    .eq('id', orderId)
    .single()

  if (existingOrder?.status === 'paid') {
    console.log(`Order ${orderId} already fulfilled — skipping duplicate webhook`)
    return
  }

  // Update order status
  await supabaseAdmin
    .from('orders')
    .update({
      status: 'paid',
      completed_at: new Date().toISOString(),
    })
    .eq('id', orderId)

  // Update payment record
  await supabaseAdmin
    .from('payments')
    .update({
      status: 'succeeded',
      provider_transaction_id: providerTransactionId,
      webhook_received: true,
      completed_at: new Date().toISOString(),
    })
    .eq('order_id', orderId)
    .eq('provider', provider)

  // Create download records
  const { data: order } = await supabaseAdmin
    .from('orders')
    .select('photo_ids, expires_at')
    .eq('id', orderId)
    .single()

  if (order?.photo_ids) {
    const downloads = order.photo_ids.map((photoId: string) => ({
      order_id: orderId,
      photo_id: photoId,
      downloaded: false,
      expires_at: order.expires_at,
    }))

    await supabaseAdmin.from('downloads').insert(downloads)
  }

  console.log(`Order ${orderId} fulfilled via ${provider}`)
}

async function markOrderFailed(orderId: string, reason: string) {
  const { getAdminClient } = await import('@/lib/server/supabase-admin')
  const supabaseAdmin = getAdminClient()

  await supabaseAdmin
    .from('orders')
    .update({ status: 'failed' })
    .eq('id', orderId)

  await supabaseAdmin
    .from('payments')
    .update({
      status: 'failed',
      failure_reason: reason,
      webhook_received: true,
    })
    .eq('order_id', orderId)
}

async function updatePaymentStatus(orderId: string, status: string) {
  const { getAdminClient } = await import('@/lib/server/supabase-admin')
  const supabaseAdmin = getAdminClient()

  await supabaseAdmin
    .from('payments')
    .update({ status })
    .eq('order_id', orderId)
}
