'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import type { Photo } from '@/lib/gallery.types'

interface PhotoGridProps {
  photos: Photo[]
  selectedIds: string[]
  onToggleSelect: (photoId: string) => void
  onPreview: (photo: Photo) => void
  loading?: boolean
}

export function PhotoGrid({ photos, selectedIds, onToggleSelect, onPreview, loading }: PhotoGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="aspect-[3/2] animate-pulse bg-charcoal-soft" />
        ))}
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-2xl text-warm-white">Nenhuma foto encontrada</p>
        <p className="mt-3 text-muted-foreground">
          Tente buscar por outro número ou explore a galeria manualmente.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isSelected={selectedIds.includes(photo.id)}
          onToggleSelect={onToggleSelect}
          onPreview={onPreview}
        />
      ))}
    </div>
  )
}

function PhotoCard({
  photo,
  isSelected,
  onToggleSelect,
  onPreview,
}: {
  photo: Photo
  isSelected: boolean
  onToggleSelect: (photoId: string) => void
  onPreview: (photo: Photo) => void
}) {
  return (
    <article
      className={`group relative aspect-[3/2] cursor-pointer overflow-hidden bg-charcoal-soft transition-all ${
        isSelected ? 'ring-2 ring-cream ring-offset-2 ring-offset-background' : ''
      }`}
    >
      {/* Preview image (with watermark) */}
      <div
        className="h-full w-full"
        onClick={() => onPreview(photo)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onPreview(photo)}
        aria-label={`Visualizar foto ${photo.bibNumber || photo.filename}`}
      >
        {photo.previewThumbUrl ? (
          <Image
            src={photo.previewThumbUrl}
            alt={`Foto${photo.bibNumber ? ` — número ${photo.bibNumber}` : ''}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-charcoal-soft">
            <span className="text-sm text-muted-foreground">Processando...</span>
          </div>
        )}
      </div>

      {/* Select button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onToggleSelect(photo.id)
        }}
        className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center border transition-all ${
          isSelected
            ? 'border-cream bg-cream text-charcoal'
            : 'border-cream/50 bg-charcoal/70 text-cream opacity-0 group-hover:opacity-100'
        }`}
        aria-label={isSelected ? 'Remover da seleção' : 'Adicionar à seleção'}
      >
        {isSelected ? '✓' : '+'}
      </button>

      {/* Bib number badge */}
      {photo.bibNumber && (
        <span className="absolute bottom-2 left-2 bg-charcoal/80 px-2 py-0.5 text-xs text-cream">
          #{photo.bibNumber}
        </span>
      )}
    </article>
  )
}
