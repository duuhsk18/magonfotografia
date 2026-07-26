import { NextRequest, NextResponse } from 'next/server'
import { isSupabaseConfigured } from '@/lib/supabase'
import { defaultEventPricing } from '@/lib/gallery-event'
import { resolveEventIdBySlug } from '@/lib/server/gallery-db'

/**
 * POST /api/gallery/cart
 * Create or update a cart.
 * Body: { sessionToken, eventSlug, photoIds, productType? }
 */
export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
    }

    const body = await request.json()
    const { sessionToken, eventSlug, photoIds } = body

    if (!sessionToken || !eventSlug || !photoIds?.length) {
      return NextResponse.json(
        { error: 'Missing sessionToken, eventSlug, or photoIds' },
        { status: 400 }
      )
    }

    const { getAdminClient } = await import('@/lib/server/supabase-admin')
    const supabaseAdmin = getAdminClient()
    const eventId = await resolveEventIdBySlug(supabaseAdmin, eventSlug)

    if (!eventId) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Calculate pricing based on quantity
    const pricing = defaultEventPricing
    const quantity = photoIds.length
    const { productType, unitPrice, totalPrice, savings } = calculateBestDeal(quantity, pricing)

    const { data: session, error: sessionError } = await supabaseAdmin
      .from('user_sessions')
      .upsert(
        {
          event_id: eventId,
          session_token: sessionToken,
          selected_photo_ids: photoIds,
          last_activity: new Date().toISOString(),
        },
        { onConflict: 'session_token' }
      )
      .select('id')
      .single()

    if (sessionError || !session) {
      console.error('Session upsert error:', sessionError)
      return NextResponse.json({ error: 'Failed to save session' }, { status: 500 })
    }

    const cartPayload = {
      session_id: session.id,
      event_id: eventId,
      photo_ids: photoIds,
      product_type: productType,
      quantity,
      unit_price: unitPrice,
      subtotal: unitPrice * quantity,
      discount_amount: savings,
      total_price: totalPrice,
      updated_at: new Date().toISOString(),
    }

    const { data: existingCart } = await supabaseAdmin
      .from('carts')
      .select('id')
      .eq('session_id', session.id)
      .maybeSingle()

    const { data, error } = existingCart?.id
      ? await supabaseAdmin
          .from('carts')
          .update(cartPayload)
          .eq('id', existingCart.id)
          .select()
          .single()
      : await supabaseAdmin
          .from('carts')
          .insert(cartPayload)
          .select()
          .single()

    if (error) {
      console.error('Cart save error:', error)
      return NextResponse.json({ error: 'Failed to save cart' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      cart: data,
      pricing: {
        productType,
        unitPrice,
        totalPrice,
        savings,
        recommendation: getRecommendation(quantity, pricing),
      },
    })
  } catch (error) {
    console.error('Cart error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * GET /api/gallery/cart?sessionToken=xxx
 * Retrieve current cart.
 */
export async function GET(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const sessionToken = searchParams.get('sessionToken')

    if (!sessionToken) {
      return NextResponse.json({ error: 'Missing sessionToken' }, { status: 400 })
    }

    const { getAdminClient } = await import('@/lib/server/supabase-admin')
    const supabaseAdmin = getAdminClient()

    const { data: session } = await supabaseAdmin
      .from('user_sessions')
      .select('id')
      .eq('session_token', sessionToken)
      .maybeSingle()

    if (!session) {
      return NextResponse.json({ success: true, cart: null })
    }

    const { data, error } = await supabaseAdmin
      .from('carts')
      .select('*')
      .eq('session_id', session.id)
      .maybeSingle()

    if (error || !data) {
      return NextResponse.json({ success: true, cart: null })
    }

    const pricing = defaultEventPricing
    const quantity = data.photo_ids?.length || 0

    return NextResponse.json({
      success: true,
      cart: data,
      pricing: {
        recommendation: getRecommendation(quantity, pricing),
      },
    })
  } catch (error) {
    console.error('Cart fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ========================
// PRICING LOGIC
// ========================

interface PricingResult {
  productType: string
  unitPrice: number
  totalPrice: number
  savings: number
}

function calculateBestDeal(
  quantity: number,
  pricing: typeof defaultEventPricing
): PricingResult {
  const individualTotal = quantity * pricing.individualPrice

  // Find the best package deal
  const options: { type: string; price: number; minQty: number }[] = [
    { type: 'individual', price: individualTotal, minQty: 1 },
    { type: 'package_3', price: pricing.package3Price, minQty: 3 },
    { type: 'package_5', price: pricing.package5Price, minQty: 5 },
    { type: 'package_10', price: pricing.package10Price, minQty: 10 },
  ]

  if (pricing.packageAllPrice) {
    options.push({ type: 'all', price: pricing.packageAllPrice, minQty: quantity })
  }

  // Find cheapest option that covers the quantity
  const validOptions = options.filter((opt) => quantity >= opt.minQty || opt.type === 'individual')
  const bestOption = validOptions.reduce((best, opt) =>
    opt.price < best.price ? opt : best
  )

  return {
    productType: bestOption.type,
    unitPrice: bestOption.price / quantity,
    totalPrice: bestOption.price,
    savings: Math.max(0, individualTotal - bestOption.price),
  }
}

function getRecommendation(
  quantity: number,
  pricing: typeof defaultEventPricing
): string | null {
  if (quantity === 2) {
    const savings = (quantity * pricing.individualPrice) - pricing.package3Price
    if (savings > 0) {
      return `Adicione mais 1 foto e economize R$ ${savings.toFixed(2)} com o pacote de 3.`
    }
  }
  if (quantity === 4) {
    const savings = (quantity * pricing.individualPrice) - pricing.package5Price
    if (savings > 0) {
      return `Adicione mais 1 foto e economize R$ ${savings.toFixed(2)} com o pacote de 5.`
    }
  }
  if (quantity >= 5 && quantity < 10) {
    const currentBest = pricing.package5Price
    const nextDeal = pricing.package10Price
    const extraNeeded = 10 - quantity
    const extraCostIndividual = extraNeeded * pricing.individualPrice
    if (nextDeal < currentBest + extraCostIndividual) {
      return `Por mais R$ ${(nextDeal - currentBest).toFixed(2)}, leve 10 fotos em vez de ${quantity}.`
    }
  }
  if (quantity >= 3 && pricing.packageAllPrice) {
    const currentTotal = calculateBestDeal(quantity, pricing).totalPrice
    const diff = pricing.packageAllPrice - currentTotal
    if (diff > 0 && diff < pricing.individualPrice * 2) {
      return `Por apenas mais R$ ${diff.toFixed(2)}, leve todas as suas fotos.`
    }
  }
  return null
}
