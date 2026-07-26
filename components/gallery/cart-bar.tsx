'use client'

import { defaultEventPricing } from '@/lib/gallery-event'

interface CartBarProps {
  selectedCount: number
  onViewCart: () => void
}

export function CartBar({ selectedCount, onViewCart }: CartBarProps) {
  if (selectedCount === 0) return null

  const pricing = defaultEventPricing
  const { productType, totalPrice, savings } = calculateBestDeal(selectedCount, pricing)

  const packageLabel: Record<string, string> = {
    individual: `${selectedCount} foto${selectedCount > 1 ? 's' : ''}`,
    package_3: 'Pacote 3 fotos',
    package_5: 'Pacote 5 fotos',
    package_10: 'Pacote 10 fotos',
    all: 'Todas as fotos',
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-charcoal/95 px-4 py-3 backdrop-blur-sm md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm text-cream">
            {packageLabel[productType] || `${selectedCount} fotos`}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-medium text-warm-white">
              R$ {totalPrice.toFixed(2)}
            </span>
            {savings > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                R$ {(selectedCount * pricing.individualPrice).toFixed(2)}
              </span>
            )}
          </div>
          {savings > 0 && (
            <p className="text-xs text-cream">Você economiza R$ {savings.toFixed(2)}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Recommendation count={selectedCount} pricing={pricing} />
          <button
            type="button"
            onClick={onViewCart}
            className="focus-ring bg-cream px-6 py-3 text-sm font-medium text-charcoal transition-opacity hover:opacity-90"
          >
            Ver carrinho
          </button>
        </div>
      </div>
    </div>
  )
}

function Recommendation({ count, pricing }: { count: number; pricing: typeof defaultEventPricing }) {
  const rec = getRecommendation(count, pricing)
  if (!rec) return null

  return (
    <p className="hidden max-w-[240px] text-xs leading-tight text-muted-foreground md:block">
      {rec}
    </p>
  )
}

// Pricing logic (duplicated from API for client-side preview)
function calculateBestDeal(quantity: number, pricing: typeof defaultEventPricing) {
  const individualTotal = quantity * pricing.individualPrice

  // Packages that COVER the quantity (package must fit all selected photos)
  const options: { type: string; price: number; covers: number }[] = [
    { type: 'individual', price: individualTotal, covers: quantity },
  ]

  if (quantity <= 3) options.push({ type: 'package_3', price: pricing.package3Price, covers: 3 })
  if (quantity <= 5) options.push({ type: 'package_5', price: pricing.package5Price, covers: 5 })
  if (quantity <= 10) options.push({ type: 'package_10', price: pricing.package10Price, covers: 10 })
  if (pricing.packageAllPrice) options.push({ type: 'all', price: pricing.packageAllPrice, covers: quantity })

  // Also consider if buying a bigger package is cheaper than individual
  if (quantity > 3 && quantity <= 5 && pricing.package5Price < individualTotal) {
    options.push({ type: 'package_5', price: pricing.package5Price, covers: 5 })
  }
  if (quantity > 5 && quantity <= 10 && pricing.package10Price < individualTotal) {
    options.push({ type: 'package_10', price: pricing.package10Price, covers: 10 })
  }

  const bestOption = options.reduce((best, opt) => (opt.price < best.price ? opt : best))

  return {
    productType: bestOption.type,
    unitPrice: bestOption.price / quantity,
    totalPrice: bestOption.price,
    savings: Math.max(0, individualTotal - bestOption.price),
  }
}

function getRecommendation(quantity: number, pricing: typeof defaultEventPricing): string | null {
  if (quantity === 2) {
    const savings = quantity * pricing.individualPrice - pricing.package3Price
    if (savings > 0) return `+1 foto = pacote de 3 (economize R$ ${savings.toFixed(2)})`
  }
  if (quantity === 4) {
    const savings = quantity * pricing.individualPrice - pricing.package5Price
    if (savings > 0) return `+1 foto = pacote de 5 (economize R$ ${savings.toFixed(2)})`
  }
  if (quantity >= 5 && quantity < 10) {
    const diff = pricing.package10Price - pricing.package5Price
    return `Por +R$ ${diff.toFixed(2)}, leve 10 fotos`
  }
  return null
}
