import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { mapPhotoFromDb, resolveEventIdBySlug, type DbPhoto } from '@/lib/server/gallery-db'

/**
 * GET /api/gallery/photos
 * Fetch photos for an event.
 * Query params:
 *   - eventSlug: required, event slug
 *   - limit: optional, default 50
 *   - offset: optional, default 0
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
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200)
    const offset = parseInt(searchParams.get('offset') || '0')

    if (!eventSlug) {
      return NextResponse.json(
        { error: 'Missing eventSlug parameter' },
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

    // Query published photos for the event
    // Ordered by creation date
    const { data: photos, error, count } = await supabase
      .from('photos')
      .select('*', { count: 'exact' })
      .eq('event_id', eventId)
      .eq('status', 'published')
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch photos' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: (photos || []).map((photo) => mapPhotoFromDb(photo as DbPhoto)),
        total: count || 0,
        limit,
        offset,
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
