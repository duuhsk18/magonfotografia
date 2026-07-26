'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Photo, Event } from '@/lib/gallery.types'
import { PhotoGrid } from './photo-grid'
import { PhotoPreview } from './photo-preview'
import { CartBar } from './cart-bar'
import { CartModal } from './cart-modal'

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
  const [searchBib, setSearchBib] = useState('')
  const [searchResults, setSearchResults] = useState<{ matched: Photo[]; suggested: Photo[] } | null>(null)
  const [searching, setSearching] = useState(false)

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

  async function handleSearch() {
    if (!searchBib.trim()) return
    setSearching(true)
    try {
      const bib = searchBib.replace(/\D/g, '')
      const res = await fetch(`/api/gallery/search?eventSlug=${event.slug}&bibNumber=${bib}`)
      const json = await res.json()
      if (json.success) {
        setSearchResults({ matched: json.matched, suggested: json.suggested })
      }
    } catch (err) {
      console.error('Search error:', err)
    } finally {
      setSearching(false)
    }
  }

  const toggleSelect = useCallback((photoId: string) => {
    setSelectedIds((prev) =>
      prev.includes(photoId) ? prev.filter((id) => id !== photoId) : [...prev, photoId]
    )
  }, [])

  const clearSearch = () => {
    setSearchResults(null)
    setSearchBib('')
  }

  return (
    <>
      {/* Search bar */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-4 backdrop-blur-sm md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <input
              type="text"
              inputMode="numeric"
              value={searchBib}
              onChange={(e) => setSearchBib(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Número do peito"
              className="focus-ring min-w-0 flex-1 border border-border bg-transparent px-4 py-2.5 text-cream placeholder:text-muted-foreground md:max-w-[200px]"
            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={searching || !searchBib.trim()}
              className="focus-ring border border-cream bg-cream px-5 py-2.5 text-sm font-medium text-charcoal disabled:opacity-40"
            >
              {searching ? 'Buscando...' : 'Buscar'}
            </button>
            {searchResults && (
              <button
                type="button"
                onClick={clearSearch}
                className="focus-ring text-sm text-muted-foreground hover:text-cream"
              >
                Limpar busca
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {searchResults && (
              <p className="text-sm text-muted-foreground">
                {searchResults.matched.length} correspondência{searchResults.matched.length !== 1 ? 's' : ''}
                {searchResults.suggested.length > 0 && ` · ${searchResults.suggested.length} sugerida${searchResults.suggested.length !== 1 ? 's' : ''}`}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              {selectedIds.length > 0 && `${selectedIds.length} selecionada${selectedIds.length !== 1 ? 's' : ''}`}
            </p>
            <p className="text-sm text-muted-foreground">
              {photos.length} foto{photos.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Photo grid */}
      <div className="px-4 py-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          {searchResults && searchResults.matched.length > 0 && (
            <div className="mb-6">
              <p className="micro-label mb-3 text-cream">Correspondências prováveis</p>
              <PhotoGrid
                photos={searchResults.matched}
                selectedIds={selectedIds}
                onToggleSelect={toggleSelect}
                onPreview={setPreviewPhoto}
              />
            </div>
          )}

          {searchResults && searchResults.suggested.length > 0 && (
            <div className="mb-6">
              <p className="micro-label mb-3 text-muted-foreground">Talvez seja você</p>
              <PhotoGrid
                photos={searchResults.suggested}
                selectedIds={selectedIds}
                onToggleSelect={toggleSelect}
                onPreview={setPreviewPhoto}
              />
            </div>
          )}

          {!searchResults && (
            <PhotoGrid
              photos={photos}
              selectedIds={selectedIds}
              onToggleSelect={toggleSelect}
              onPreview={setPreviewPhoto}
              loading={loading}
            />
          )}
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
    </>
  )
}
