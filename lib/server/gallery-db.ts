import 'server-only'

export interface DbPhoto {
  id: string
  event_id: string
  filename: string
  original_width: number | null
  original_height: number | null
  file_hash: string | null
  exif_datetime: string | null
  bib_number: string | null
  bib_confidence: number | null
  bib_manual: string | null
  bib_status: string | null
  face_cluster_id: string | null
  face_confidence: number | null
  face_count: number | null
  preview_url: string | null
  preview_thumb_url: string | null
  original_url: string | null
  status: string | null
  processing_error: string | null
  visibility: string | null
  featured: boolean | null
  modality: string | null
  sort_order: number | null
  created_at: string | null
  updated_at: string | null
  batch_id: string | null
}

export function mapPhotoFromDb(photo: DbPhoto) {
  return {
    id: photo.id,
    eventId: photo.event_id,
    filename: photo.filename,
    originalWidth: photo.original_width || 0,
    originalHeight: photo.original_height || 0,
    fileHash: photo.file_hash || '',
    exifDatetime: photo.exif_datetime || undefined,
    bibNumber: photo.bib_number || undefined,
    bibConfidence: photo.bib_confidence || 0,
    bibManual: photo.bib_manual || undefined,
    bibStatus: photo.bib_status || 'pending',
    faceClusterId: photo.face_cluster_id || undefined,
    faceConfidence: photo.face_confidence || undefined,
    faceCount: photo.face_count || 0,
    previewUrl: photo.preview_url || '',
    previewThumbUrl: photo.preview_thumb_url || '',
    originalUrl: photo.original_url || undefined,
    status: photo.status || 'processing',
    processingError: photo.processing_error || undefined,
    visibility: photo.visibility || 'public',
    featured: photo.featured || false,
    modality: photo.modality || undefined,
    sortOrder: photo.sort_order || undefined,
    createdAt: photo.created_at || '',
    updatedAt: photo.updated_at || '',
    batchId: photo.batch_id || undefined,
  }
}

interface EventQueryClient {
  from: (table: 'events') => {
    select: (columns: string) => {
      eq: (column: string, value: string) => {
        single: () => PromiseLike<{ data: { id?: string } | null; error: unknown }>
      }
    }
  }
}

export async function resolveEventIdBySlug(
  supabaseClient: unknown,
  slug: string
): Promise<string | null> {
  const supabase = supabaseClient as EventQueryClient
  const { data, error } = await supabase
    .from('events')
    .select('id')
    .eq('slug', slug)
    .single()

  if (error || !data?.id) {
    return null
  }

  return data.id
}
