'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import type { Photo } from '@/lib/gallery.types'

interface PhotoPreviewProps {
  photo: Photo | null
  isSelected: boolean
  onClose: () => void
  onToggleSelect: (photoId: string) => void
}

export function PhotoPreview({ photo, isSelected, onClose, onToggleSelect }: PhotoPreviewProps) {
  useEffect(() => {
    if (!photo) return

    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [photo, onClose])

  if (!photo) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualização da foto"
    >
      <div
        className="relative flex max-h-[90vh] max-w-[90vw] flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {photo.bibNumber && (
              <span className="border border-border px-3 py-1 text-sm text-cream">
                Número #{photo.bibNumber}
              </span>
            )}
            {photo.modality && (
              <span className="text-sm text-muted-foreground">{photo.modality}</span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring flex h-10 w-10 items-center justify-center border border-border text-cream hover:border-cream"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        {/* Image */}
        <div className="relative flex-1 overflow-hidden">
          {photo.previewUrl ? (
            <Image
              src={photo.previewUrl}
              alt={`Foto${photo.bibNumber ? ` — número ${photo.bibNumber}` : ''}`}
              width={photo.originalWidth || 1920}
              height={photo.originalHeight || 1280}
              className="max-h-[70vh] w-auto object-contain"
              priority
            />
          ) : (
            <div className="flex h-96 w-full items-center justify-center bg-charcoal-soft">
              <p className="text-muted-foreground">Preview não disponível</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Preview com marca d'água. O original em alta resolução será entregue após a compra.
          </p>
          <button
            type="button"
            onClick={() => onToggleSelect(photo.id)}
            className={`focus-ring px-6 py-3 text-sm font-medium transition-colors ${
              isSelected
                ? 'border border-cream bg-transparent text-cream'
                : 'border border-cream bg-cream text-charcoal'
            }`}
          >
            {isSelected ? 'Remover da seleção' : 'Adicionar à seleção'}
          </button>
        </div>
      </div>
    </div>
  )
}
