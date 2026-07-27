'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Photo, Event } from '@/lib/gallery.types'
import { PhotoGrid } from './photo-grid'
import { PhotoPreview } from './photo-preview'
import { CartBar } from './cart-bar'
import { CartModal } from './cart-modal'
import { PromoPopup } from './promo-popup'
import { ImageProtection } from './image-protection'

interface GalleryPageClientProps {
  event: Event
}

/**
 * Client-side gallery wrapper.
 * Handles photo loading, search, selection, cart management.
 */
export function GalleryPageClient({ event }: GalleryPageClientProps) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem(`magon-selection-${event.slug}`)
    if (!saved) return []

    try {
      return JSON.parse(saved)
    } catch (error) {
      console.warn('Failed to restore gallery selection:', error)
      return []
    }
  })
  const [previewPhoto, setPreviewPhoto] = useState<Photo | null>(null)
  const [showCart, setShowCart] = useState(false)
  const [showPromo, setShowPromo] = useState(() => {
    if (typeof window === 'undefined') return false
    return !localStorage.getItem(`magon-promo-dismissed-${event.slug}`)
  })

  // Save selection to localStorage
  useEffect(() => {
    localStorage.setItem(`magon-selection-${event.slug}`, JSON.stringify(selectedIds))
  }, [selectedIds, event.slug])

  const loadPhotos = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/gallery/photos?eventSlug=${event.slug}&limit=200`)
      const json = await res.json()
      if (json.success) {
        setPhotos(json.data)
      }
    } catch (err) {
      console.error('Failed to load photos:', err)
    } finally {
      setLoading(false)
    }
  }, [event.slug])

  // Load photos on mount and when event changes.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadPhotos()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [loadPhotos])

  const toggleSelect = useCallback((photoId: string) => {
    setSelectedIds((prev) =>
      prev.includes(photoId) ? prev.filter((id) => id !== photoId) : [...prev, photoId]
    )
  }, [])

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-4 backdrop-blur-sm md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {photos.length} foto{photos.length !== 1 ? 's' : ''}
            {selectedIds.length > 0 && ` · ${selectedIds.length} selecionada${selectedIds.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Photo grid */}
      <div className="px-4 py-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <PhotoGrid
            photos={photos}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onPreview={setPreviewPhoto}
            loading={loading}
          />
        </div>
      </div>

      {/* Cart bar */}
      <CartBar selectedCount={selectedIds.length} onViewCart={() => setShowCart(true)} />

      {/* Preview modal */}
      <PhotoPreview
        photo={previewPhoto}
        isSelected={previewPhoto ? selectedIds.includes(previewPhoto.id) : false}
        onClose={() => setPreviewPhoto(null)}
        onToggleSelect={toggleSelect}
      />

      {/* Cart modal */}
      {showCart && (
        <CartModal
          selectedIds={selectedIds}
          photos={photos}
          event={event}
          onClose={() => setShowCart(false)}
          onRemovePhoto={(id) => setSelectedIds((prev) => prev.filter((p) => p !== id))}
        />
      )}

      {/* Image protection */}
      <ImageProtection />

      {/* Promo popup */}
      {showPromo && (
        <PromoPopup
          promoEndDate="02/08/2026"
          onClose={() => {
            setShowPromo(false)
            localStorage.setItem(`magon-promo-dismissed-${event.slug}`, 'true')
          }}
        />
      )}
    </>
  )
}
