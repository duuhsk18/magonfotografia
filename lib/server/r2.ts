import 'server-only'
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
const accessKeyId = process.env.CLOUDFLARE_ACCESS_KEY_ID
const secretAccessKey = process.env.CLOUDFLARE_SECRET_ACCESS_KEY
const bucket = process.env.CLOUDFLARE_R2_BUCKET || 'magon-gallery-staging'

/**
 * Cloudflare R2 client (S3-compatible).
 * Used for storing photo originals (private) and previews (public).
 */
function getR2Client() {
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      'Missing Cloudflare R2 environment variables. '
      + 'Check CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_ACCESS_KEY_ID, CLOUDFLARE_SECRET_ACCESS_KEY.'
    )
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })
}

/**
 * Upload a file to R2.
 * @param key - Object key (path in bucket), e.g. "events/slug/originals/photo.jpg"
 * @param body - File buffer or stream
 * @param contentType - MIME type
 * @param isPublic - If true, adds public-read header (for previews/thumbnails)
 */
export async function uploadToR2(
  key: string,
  body: Buffer | Uint8Array,
  contentType: string,
  isPublic = false
) {
  const client = getR2Client()

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      ...(isPublic ? { ACL: 'public-read' } : {}),
    })
  )

  // If public, return the direct URL
  if (isPublic && process.env.CLOUDFLARE_R2_PUBLIC_URL) {
    return `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`
  }

  return key
}

/**
 * Generate a presigned URL for private file download.
 * Expires after specified seconds (default 1 hour).
 * Uses the PRIVATE bucket (magon-gallery-originals) — no public access.
 */
export async function getSignedDownloadUrl(
  key: string,
  expiresIn = 3600
): Promise<string> {
  const client = getR2Client()
  const privateBucket = getOriginalsBucket()

  const url = await getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: privateBucket,
      Key: key,
    }),
    { expiresIn }
  )

  return url
}

/**
 * Delete a file from R2.
 */
export async function deleteFromR2(key: string) {
  const client = getR2Client()

  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    })
  )
}

/**
 * Generate storage key paths for photo versions.
 *
 * ARCHITECTURE:
 * - Previews/thumbs: stored in the PUBLIC bucket (r2.dev enabled)
 * - Originals: stored in a PRIVATE bucket (no public access)
 *
 * The private bucket name is set via CLOUDFLARE_R2_PRIVATE_BUCKET env var.
 * If not set, falls back to same bucket with 'private/' prefix (NOT SECURE
 * if r2.dev is enabled — must be fixed before production launch).
 *
 * BEFORE PRODUCTION:
 * 1. Create bucket 'magon-gallery-originals' in Cloudflare R2
 * 2. Do NOT enable r2.dev public access on it
 * 3. Set CLOUDFLARE_R2_PRIVATE_BUCKET=magon-gallery-originals
 * 4. Re-upload originals to the private bucket
 * 5. Delete originals from the public bucket
 */
export function photoStorageKeys(eventSlug: string, filename: string) {
  const base = `events/${eventSlug}`
  const name = filename.replace(/\.[^.]+$/, '')

  return {
    original: `${eventSlug}/${filename}`,
    preview: `${base}/previews/${name}_preview.jpg`,
    thumb: `${base}/thumbs/${name}_thumb.jpg`,
  }
}

/**
 * Get the bucket name for original files.
 * Uses CLOUDFLARE_R2_PRIVATE_BUCKET if set, otherwise falls back to main bucket.
 */
export function getOriginalsBucket(): string {
  return process.env.CLOUDFLARE_R2_PRIVATE_BUCKET || process.env.CLOUDFLARE_R2_BUCKET || 'magon-gallery-staging'
}
