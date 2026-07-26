import { NextRequest, NextResponse } from 'next/server'
import { isSupabaseConfigured } from '@/lib/supabase'
import { getSignedDownloadUrl, photoStorageKeys } from '@/lib/server/r2'

/**
 * GET /api/gallery/download?orderId=xxx&photoId=yyy
 * Returns a signed download URL for a purchased photo.
 *
 * SECURITY:
 * - Verifies order exists and is paid
 * - Verifies photoId is in the order's photo_ids
 * - Returns signed URL valid for 1 hour only
 * - Tracks download attempt
 */
export async function GET(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')
    const photoId = searchParams.get('photoId')
    const sessionToken = searchParams.get('sessionToken')

    if (!orderId || !photoId || !sessionToken) {
      return NextResponse.json(
        { error: 'Missing orderId, photoId, or sessionToken' },
        { status: 400 }
      )
    }

    const { getAdminClient } = await import('@/lib/server/supabase-admin')
    const supabaseAdmin = getAdminClient()

    // Verify order belongs to session and is paid
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('id, session_id, status, photo_ids, event_id')
      .eq('id', orderId)
      .eq('status', 'paid')
      .single()

    if (orderError || !order) {
      console.warn(`Unauthorized download attempt: orderId=${orderId}`)
      return NextResponse.json({ error: 'Order not found or not paid' }, { status: 403 })
    }

    // Resolve session token to user_sessions.id and compare
    const { data: session } = await supabaseAdmin
      .from('user_sessions')
      .select('id')
      .eq('session_token', sessionToken)
      .maybeSingle()

    if (!session || order.session_id !== session.id) {
      console.warn(`Session mismatch: orderId=${orderId}`)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Verify photoId is in the order
    if (!order.photo_ids?.includes(photoId)) {
      console.warn(`Photo not in order: orderId=${orderId}, photoId=${photoId}`)
      return NextResponse.json({ error: 'Photo not in order' }, { status: 403 })
    }

    // Get photo to determine storage key
    const { data: photo } = await supabaseAdmin
      .from('photos')
      .select('filename')
      .eq('id', photoId)
      .single()

    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 })
    }

    // Get event slug for R2 storage path
    const { data: eventRow } = await supabaseAdmin
      .from('events')
      .select('slug')
      .eq('id', order.event_id)
      .single()

    const eventSlug = eventRow?.slug || order.event_id

    // Generate signed URL to R2
    const storageKeys = photoStorageKeys(eventSlug, photo.filename)
    const downloadUrl = await getSignedDownloadUrl(storageKeys.original, 3600) // 1 hour

    // Record download attempt (but don't block if this fails)
    const { error: downloadUpdateError } = await supabaseAdmin
      .from('downloads')
      .update({
        downloaded: true,
        downloaded_at: new Date().toISOString(),
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
      })
      .eq('order_id', orderId)
      .eq('photo_id', photoId)

    if (downloadUpdateError) {
      console.error('Failed to record download:', downloadUpdateError)
    }

    return NextResponse.json(
      {
        success: true,
        downloadUrl,
        expiresIn: 3600,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
