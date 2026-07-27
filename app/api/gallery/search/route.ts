import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { mapPhotoFromDb, resolveEventIdBySlug, type DbPhoto } from '@/lib/server/gallery-db'

/**
 * GET /api/gallery/search
 * Search photos by bib number in an event.
 * Query params:
 *   - eventSlug: required
 *   - bibNumber: required
 */
export async function GET(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.' },
        { status: 503 }
      )
    }

    const { searchParams } = new URL(request.url)
    const eventSlug = searchParams.get('eventSlug')
    const bibNumber = searchParams.get('bibNumber')

    if (!eventSlug || !bibNumber) {
      return NextResponse.json(
        { error: 'Missing eventSlug or bibNumber' },
        { status: 400 }
      )
    }

    // Normalize: remove non-digits
    const normalizedBib = bibNumber.replace(/\D/g, '')

    if (normalizedBib.length === 0) {
      return NextResponse.json(
        { error: 'Invalid bib number format' },
        { status: 400 }
      )
    }

    const eventId = await resolveEventIdBySlug(supabase, eventSlug)

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // Search for exact or partial matches
    // First try exact match (OCR recognized and confirmed)
    const { data: exactMatches, error: exactError } = await supabase
      .from('photos')
      .select('*')
      .eq('event_id', eventId)
      .eq('status', 'published')
      .eq('bib_number', normalizedBib)
      .eq('bib_status', 'confirmed')
      .order('created_at', { ascending: true })

    if (exactError) {
      console.error('Supabase error:', exactError)
      return NextResponse.json(
        { error: 'Search failed' },
        { status: 500 }
      )
    }

    // Then try partial/OCR matches (lower confidence)
    const { data: probableMatches, error: probableError } = await supabase
      .from('photos')
      .select('*')
      .eq('event_id', eventId)
      .eq('status', 'published')
      .ilike('bib_number', `%${normalizedBib}%`)
      .neq('bib_status', 'confirmed')
      .order('bib_confidence', { ascending: false })
      .order('created_at', { ascending: true })

    if (probableError) {
      console.error('Supabase error:', probableError)
      // Don't fail the entire request, just return exact matches
    }

    return NextResponse.json(
      {
        success: true,
        matched: (exactMatches || []).map((photo) => mapPhotoFromDb(photo as DbPhoto)),
        suggested: (probableMatches || []).map((photo) => mapPhotoFromDb(photo as DbPhoto)),
        totalMatched: (exactMatches?.length || 0) + (probableMatches?.length || 0),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
