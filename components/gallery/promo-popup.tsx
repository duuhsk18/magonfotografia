'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface PromoPopupProps {
  promoEndDate: string // e.g. "02/08/2026"
  onClose: () => void
}

export function PromoPopup({ promoEndDate, onClose }: PromoPopupProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show after small delay for better UX
    const timer = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-charcoal-soft to-charcoal shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/80 text-muted-foreground transition-colors hover:text-cream"
          aria-label="Fechar"
        >
          ✕
        </button>

        {/* Content */}
        <div className="px-6 pb-6 pt-8 text-center">
          {/* Logo */}
          <div className="mb-5 flex justify-center">
            <Image
              src="/brand/magonfotografia-white-crop.png"
              alt="Magon Fotografia"
              width={180}
              height={60}
              className="h-10 w-auto opacity-90"
            />
          </div>

          {/* Title */}
          <h2 className="mb-2 text-2xl font-bold text-warm-white">
            Compre mais, pague menos
          </h2>
          <p className="mb-1 text-sm text-cream">
            Este evento tem desconto progressivo: até{' '}
            <span className="font-bold text-amber-400">30% off</span>.
            Aplicado automaticamente no carrinho.
          </p>
          <p className="mb-6 text-xs text-muted-foreground">
            Promoção válida até {promoEndDate}
          </p>

          {/* Tiers */}
          <div className="mb-6 space-y-2">
            <PromoTier quantity="2" discount="10% off" />
            <PromoTier quantity="3" discount="20% off" />
            <PromoTier quantity="5" discount="30% off" highlight />
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 py-4 text-base font-bold text-charcoal shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Ver fotos
          </button>

          <p className="mt-4 text-[11px] text-muted-foreground">
            Desconto aplicado automaticamente. Junte fotos de amigos, casal ou equipe no mesmo carrinho.
          </p>
        </div>
      </div>
    </div>
  )
}

function PromoTier({ quantity, discount, highlight }: { quantity: string; discount: string; highlight?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
        highlight
          ? 'border-amber-500/50 bg-amber-500/10'
          : 'border-border bg-charcoal-soft'
      }`}
    >
      <span className="text-sm text-cream">
        A partir de <span className="font-bold text-warm-white">{quantity} fotos</span>
      </span>
      <span className={`text-sm font-bold ${highlight ? 'text-amber-400' : 'text-amber-400/80'}`}>
        {discount}
      </span>
    </div>
  )
}
