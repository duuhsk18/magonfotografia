import { NextRequest, NextResponse } from 'next/server'
import { isSupabaseConfigured } from '@/lib/supabase'

/**
 * POST /api/gallery/orders
 * Create an order from a cart and initiate payment.
 * Body: { sessionToken, email, paymentMethod: 'card' | 'pix' }
 */
export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
    }

    const body = await request.json()
    const { sessionToken, email, paymentMethod } = body

    if (!sessionToken || !email || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing sessionToken, email, or paymentMethod' },
        { status: 400 }
      )
    }

    if (!['card', 'pix'].includes(paymentMethod)) {
      return NextResponse.json(
        { error: 'Invalid paymentMethod. Use "card" or "pix".' },
        { status: 400 }
      )
    }

    // Import admin client
    const { getAdminClient } = await import('@/lib/server/supabase-admin')
    const supabaseAdmin = getAdminClient()

    // Get cart
    const { data: cart, error: cartError } = await supabaseAdmin
      .from('carts')
      .select('*')
      .eq('session_id', sessionToken)
      .single()

    if (cartError || !cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    if (!cart.photo_ids?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Recalculate price server-side (NEVER trust client price)
    const totalPrice = cart.total_price
    if (!totalPrice || totalPrice <= 0) {
      return NextResponse.json({ error: 'Invalid cart total' }, { status: 400 })
    }

    // Generate order number: MF-YYYYMMDD-NNN
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const { count } = await supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', new Date().toISOString().slice(0, 10))

    const orderNumber = `MF-${today}-${String((count || 0) + 1).padStart(3, '0')}`

    // Create order
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_number: orderNumber,
        cart_id: cart.id,
        event_id: cart.event_id,
        session_id: sessionToken,
        email,
        photo_ids: cart.photo_ids,
        product_type: cart.product_type,
        quantity: cart.quantity,
        subtotal: cart.subtotal,
        discount_amount: cart.discount_amount,
        total_price: totalPrice,
        status: 'pending',
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .select()
      .single()

    if (orderError || !order) {
      console.error('Order creation error:', orderError)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Initiate payment based on method
    let paymentResult: { redirectUrl?: string; pixCode?: string; pixQrCode?: string; paymentId?: string }

    if (paymentMethod === 'card') {
      paymentResult = await createStripePayment(order.id, totalPrice, email, orderNumber)
    } else {
      paymentResult = await createMercadoPagoPixPayment(order.id, totalPrice, email, orderNumber)
    }

    // Record payment attempt
    await supabaseAdmin.from('payments').insert({
      order_id: order.id,
      provider: paymentMethod === 'card' ? 'stripe' : 'mercado_pago',
      provider_payment_id: paymentResult.paymentId || null,
      amount: totalPrice,
      currency: 'BRL',
      status: 'pending',
      payment_method: paymentMethod,
      attempted_at: new Date().toISOString(),
      client_ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    })

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber,
        totalPrice,
        status: 'pending',
      },
      payment: paymentResult,
    })
  } catch (error) {
    console.error('Order error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ========================
// STRIPE
// ========================

async function createStripePayment(
  orderId: string,
  amount: number,
  email: string,
  orderNumber: string
) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    throw new Error('STRIPE_SECRET_KEY not configured')
  }

  // Dynamic import to avoid build errors when Stripe isn't installed yet
  const stripe = await import('stripe').then((m) => new m.default(stripeSecretKey))

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'brl',
          product_data: {
            name: `Fotos Magon — Pedido ${orderNumber}`,
            description: 'Fotografias em alta resolução sem marca d\'água',
          },
          unit_amount: Math.round(amount * 100), // Stripe uses cents
        },
        quantity: 1,
      },
    ],
    metadata: {
      order_id: orderId,
      order_number: orderNumber,
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pedido/sucesso?order=${orderNumber}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pedido/cancelado?order=${orderNumber}`,
  })

  return {
    redirectUrl: session.url || undefined,
    paymentId: session.id,
  }
}

// ========================
// MERCADO PAGO (PIX)
// ========================

async function createMercadoPagoPixPayment(
  orderId: string,
  amount: number,
  email: string,
  orderNumber: string
) {
  const accessToken = process.env.MP_ACCESS_TOKEN
  if (!accessToken) {
    throw new Error('MP_ACCESS_TOKEN not configured')
  }

  const response = await fetch('https://api.mercadopago.com/v1/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Idempotency-Key': `order-${orderId}`,
    },
    body: JSON.stringify({
      transaction_amount: amount,
      description: `Fotos Magon — Pedido ${orderNumber}`,
      payment_method_id: 'pix',
      payer: { email },
      metadata: {
        order_id: orderId,
        order_number: orderNumber,
      },
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercado-pago`,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    console.error('Mercado Pago error:', data)
    throw new Error(`Mercado Pago error: ${data.message || 'Unknown'}`)
  }

  return {
    pixCode: data.point_of_interaction?.transaction_data?.qr_code || undefined,
    pixQrCode: data.point_of_interaction?.transaction_data?.qr_code_base64 || undefined,
    paymentId: String(data.id),
  }
}
