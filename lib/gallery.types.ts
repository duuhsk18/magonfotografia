/**
 * MAGON GALLERY MVP — Type definitions
 * Event galleries, photos, orders, payments
 */

// ============================================
// EVENTS
// ============================================

export interface Event {
  id: string
  name: string
  slug: string
  description?: string
  dateEvent: string // ISO datetime
  location: string
  modalities: string[] // ["5K", "10K", "Caminhada"]
  status: 'draft' | 'published' | 'archived'
  coverUrl?: string
  coverThumbUrl?: string
  publicNote?: string // e.g., "Galeria independente produzida por Magon Fotografia"
  createdAt: string
  updatedAt: string
}

export interface EventPricing {
  id: string
  eventId: string
  individualPrice: number // 19.90
  package3Price: number // 49.90
  package5Price: number // 79.90
  package10Price: number // 149.90
  packageAllPrice?: number // dynamic or fixed
  promoActive: boolean
  promoDiscountPercent?: number
  promoStartAt?: string
  promoEndAt?: string
  promoDescription?: string
}

// ============================================
// PHOTOS
// ============================================

export interface Photo {
  id: string
  eventId: string
  filename: string
  originalWidth: number
  originalHeight: number
  fileHash: string
  exifDatetime?: string
  bibNumber?: string
  bibConfidence: number // 0.0-1.0
  bibManual?: string
  bibStatus: 'pending' | 'confirmed' | 'not_found' | 'manual'
  faceClusterId?: string
  faceConfidence?: number
  faceCount: number
  previewUrl: string // with watermark
  previewThumbUrl: string
  originalUrl?: string // signed/private
  status: 'uploading' | 'processing' | 'published' | 'hidden' | 'deleted'
  processingError?: string
  visibility: 'public' | 'private'
  featured: boolean
  modality?: string // e.g., "5K"
  sortOrder?: number
  createdAt: string
  updatedAt: string
  batchId?: string
}

// ============================================
// USER SESSIONS
// ============================================

export interface UserSession {
  id: string
  eventId: string
  sessionToken: string
  email?: string
  facialConsent: boolean
  facialConsentVersion?: string
  facialConsentAt?: string
  selfieUrl?: string
  selfieDeletedAt?: string
  searchQuery?: string
  searchMethod?: 'number' | 'facial' | 'manual' | 'assisted'
  searchResultsCount: number
  selectedPhotoIds: string[]
  createdAt: string
  lastActivity: string
  ipAddress?: string
}

// ============================================
// CART & ORDERS
// ============================================

export interface Cart {
  id: string
  sessionId?: string
  eventId: string
  photoIds: string[]
  productType: 'individual' | 'package_3' | 'package_5' | 'package_10' | 'all'
  quantity: number
  unitPrice: number
  subtotal: number
  discountAmount: number
  couponCode?: string
  totalPrice: number
  createdAt: string
  updatedAt: string
  abandonedAt?: string
}

export interface Order {
  id: string
  orderNumber: string // e.g., "MF-20260726-001"
  cartId?: string
  eventId: string
  sessionId?: string
  email: string
  phone?: string
  photoIds: string[]
  productType: 'individual' | 'package_3' | 'package_5' | 'package_10' | 'all'
  quantity: number
  subtotal: number
  discountAmount: number
  couponCode?: string
  totalPrice: number
  status: 'pending' | 'paid' | 'failed' | 'refunded' | 'expired'
  createdAt: string
  expiresAt?: string
  completedAt?: string
}

// ============================================
// PAYMENTS
// ============================================

export interface Payment {
  id: string
  orderId: string
  provider: 'stripe' | 'mercado_pago'
  providerPaymentId: string
  providerTransactionId?: string
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled'
  paymentMethod?: 'card' | 'pix'
  lastFour?: string
  webhookReceived: boolean
  webhookData?: Record<string, unknown>
  createdAt: string
  attemptedAt?: string
  completedAt?: string
  failureReason?: string
}

// ============================================
// DOWNLOADS
// ============================================

export interface Download {
  id: string
  orderId: string
  photoId: string
  downloadUrl?: string
  downloaded: boolean
  downloadedAt?: string
  createdAt: string
  expiresAt?: string
}

// ============================================
// REMOVAL REQUESTS
// ============================================

export interface RemovalRequest {
  id: string
  photoId: string
  requesterName: string
  requesterEmail: string
  requesterPhone?: string
  reason: 'privacy' | 'inappropriate' | 'not_me' | 'other'
  message: string
  status: 'pending' | 'approved' | 'rejected' | 'archived'
  adminResponse?: string
  createdAt: string
  reviewedAt?: string
}

// ============================================
// API RESPONSES
// ============================================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ============================================
// SEARCH RESULTS
// ============================================

export interface PhotoSearchResult {
  photo: Photo
  confidence: number
  matchType: 'number' | 'facial' | 'manual' | 'suggested'
}

export interface SearchResults {
  matched: PhotoSearchResult[]
  suggested?: PhotoSearchResult[]
  totalCount: number
}
