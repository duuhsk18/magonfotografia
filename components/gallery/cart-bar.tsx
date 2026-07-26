'use client'

import { calculateProgressiveDiscount } from '@/lib/gallery-event'

interface CartBarProps {
  selectedCount: number
  onViewCart: () => void
}

export function CartBar({ selectedCount, onViewCart }: CartBarProps) {
  if (selectedCount === 0) return null

  const deal = calculateProgressiveDiscount(selectedCount)

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-amber-500/20 bg-charcoal/95 px-4 py-3 backdrop-blur-sm md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <p className="text-sm text-cream">
              {selectedCount} foto{selectedCount !== 1 ? 's' : ''}
            </p>
            {deal.label && (
              <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-400">
                {deal.label}
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-medium text-warm-white">
              R$ {deal.totalPrice.toFixed(2)}
            </span>
            {deal.savings > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                R$ {(selectedCount * deal.basePrice).toFixed(2)}
              </span>
            )}
          </div>
          {deal.savings > 0 && (
            <p className="text-xs text-amber-400">
              Economize R$ {deal.savings.toFixed(2)} · R$ {deal.pricePerPhoto.toFixed(2)}/foto
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <NextTierHint count={selectedCount} />
          <button
            type="button"
            onClick={onViewCart}
            className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 px-6 py-3 text-sm font-bold text-charcoal transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Ver carrinho
          </button>
        </div>
      </div>
    </div>
  )
}

function NextTierHint({ count }: { count: number }) {
  let hint = ''

  if (count === 1) {
    hint = '+1 foto = 10% OFF automático'
  } else if (count === 2) {
    hint = '+1 foto = 20% OFF (R$ 8/foto)'
  } else if (count >= 3 && count < 5) {
    const needed = 5 - count
    hint = `+${needed} foto${needed > 1 ? 's' : ''} = 30% OFF (R$ 7/foto)`
  }

  if (!hint) return null

  return (
    <p className="hidden max-w-[200px] text-xs leading-tight text-muted-foreground md:block">
      {hint}
    </p>
  )
}
