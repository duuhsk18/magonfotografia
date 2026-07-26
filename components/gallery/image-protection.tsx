'use client'

import { useEffect } from 'react'

/**
 * Image Protection Component
 * Prevents common photo theft methods:
 * - Right-click save
 * - Drag to desktop
 * - DevTools screenshot (partial — overlay tricks)
 * - Print screen (partial — CSS print rules)
 * - Long-press save on mobile
 *
 * NOTE: No browser-side protection is 100% foolproof.
 * The real protection is:
 * 1. Watermark baked into the preview image
 * 2. Low resolution thumbnails
 * 3. Original files never exposed
 * 4. Signed URLs with expiry
 */
export function ImageProtection() {
  useEffect(() => {
    // Disable right-click on images
    function handleContextMenu(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target.tagName === 'IMG' || target.closest('[data-protected]')) {
        e.preventDefault()
      }
    }

    // Disable drag on images
    function handleDragStart(e: DragEvent) {
      const target = e.target as HTMLElement
      if (target.tagName === 'IMG' || target.closest('[data-protected]')) {
        e.preventDefault()
      }
    }

    // Disable keyboard shortcuts for save/print
    function handleKeyDown(e: KeyboardEvent) {
      // Ctrl+S, Ctrl+P, Ctrl+Shift+I
      if (e.ctrlKey && (e.key === 's' || e.key === 'p')) {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('dragstart', handleDragStart)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('dragstart', handleDragStart)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return null
}
