import { NextRequest, NextResponse } from 'next/server'
import { isSupabaseConfigured } from '@/lib/supabase'

/**
 * POST /api/gallery/upload
 * Receives processed photo metadata from the local Python script.
 * Expects JSON body with photo metadata array.
 *
 * This route does NOT handle file uploads directly.
 * Files are uploaded to R2 via the CLI script.
 * This route only registers metadata in Supabase.
 */
export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 503 }
      )
    }

    // Verify admin auth token
    const authHeader = request.headers.get('authorization')
    const adminToken = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!authHeader || !adminToken || authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { eventId, photos, batchId } = body

    if (!eventId || !photos || !Array.isArray(photos)) {
      return NextResponse.json(
        { error: 'Missing eventId or photos array' },
        { status: 400 }
      )
    }

    // Import admin client dynamically to avoid build-time errors
    const { getAdminClient } = await import('@/lib/server/supabase-admin')
    const supabaseAdmin = getAdminClient()

    // Insert photos in batches of 50
    const results = []
    const BATCH_SIZE = 50

    for (let i = 0; i < photos.length; i += BATCH_SIZE) {
      const batch = photos.slice(i, i + BATCH_SIZE).map((photo: Record<string, unknown>) => ({
        event_id: eventId,
        filename: photo.filename,
        original_width: photo.original_width || photo.originalWidth,
        original_height: photo.original_height || photo.originalHeight,
        file_hash: photo.file_hash || photo.fileHash,
        exif_datetime: photo.exif_datetime || photo.exifDatetime || null,
        bib_number: photo.bib_number || photo.bibNumber || null,
        bib_confidence: photo.bib_confidence || photo.bibConfidence || 0,
        bib_status: photo.bib_number || photo.bibNumber ? 'pending' : 'not_found',
        face_cluster_id: photo.face_cluster_id || photo.faceClusterId || null,
        face_confidence: photo.face_confidence || photo.faceConfidence || null,
        face_count: photo.face_count || photo.faceCount || 0,
        preview_url: photo.preview_url || photo.previewUrl,
        preview_thumb_url: photo.preview_thumb_url || photo.previewThumbUrl,
        original_url: photo.original_url || photo.originalUrl,
        status: 'published',
        visibility: 'public',
        batch_id: batchId || null,
      }))

      const { data, error } = await supabaseAdmin
        .from('photos')
        .upsert(batch, { onConflict: 'file_hash' })
        .select('id')

      if (error) {
        console.error(`Batch ${i} error:`, error)
        results.push({ batch: i, error: error.message })
      } else {
        results.push({ batch: i, count: data?.length || 0 })
      }
    }

    return NextResponse.json(
      {
        success: true,
        totalReceived: photos.length,
        results,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
