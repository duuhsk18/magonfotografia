import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/webhooks/stripe
 * Handles Stripe webhook events.
 * Confirms payment and releases photo downloads.
 *
 * IDEMPOTENT: Checks if order is already paid before processing.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET not configured')
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
    }

    // Verify webhook signature
    const stripe = await import('stripe').then(
      (m) => new m.default(process.env.STRIPE_SECRET_KEY!)
    )

    let event: import('stripe').default.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle events
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as import('stripe').default.Checkout.Session
        const orderId = session.metadata?.order_id

        if (!orderId) {
          console.error('Webhook missing order_id in metadata')
          break
        }

        await fulfillOrder(orderId, session.id, 'stripe')
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as import('stripe').default.PaymentIntent
        const orderId = paymentIntent.metadata?.order_id

        if (orderId) {
          await markOrderFailed(orderId, paymentIntent.last_payment_error?.message || 'Payment failed')
        }
        break
      }

      default:
        // Ignore unhandled events
        break
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

// ========================
// ORDER FULFILLMENT
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

  // Create download records for each purchased photo
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

  console.log(`Order ${orderId} fulfilled successfully`)
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
