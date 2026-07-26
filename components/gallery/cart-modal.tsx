'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Photo, Event } from '@/lib/gallery.types'
import { defaultEventPricing } from '@/lib/gallery-event'

interface CartModalProps {
  selectedIds: string[]
  photos: Photo[]
  event: Event
  onClose: () => void
  onRemovePhoto: (id: string) => void
}

export function CartModal({ selectedIds, photos, event, onClose, onRemovePhoto }: CartModalProps) {
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('pix')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  const selectedPhotos = photos.filter((p) => selectedIds.includes(p.id))
  const pricing = defaultEventPricing
  const { productType, totalPrice, savings } = calculateBestDeal(selectedPhotos.length, pricing)

  const packageLabels: Record<string, string> = {
    individual: `${selectedPhotos.length} foto${selectedPhotos.length > 1 ? 's' : ''} avulsas`,
    package_3: 'Pacote 3 fotos',
    package_5: 'Pacote 5 fotos',
    package_10: 'Pacote 10 fotos',
    all: 'Pacote completo',
  }

  async function handleCheckout() {
    if (!email.trim()) {
      setError('Informe seu e-mail para receber as fotos.')
      return
    }
    if (selectedIds.length === 0) {
      setError('Selecione pelo menos uma foto.')
      return
    }

    setProcessing(true)
    setError('')

    try {
      // Generate session token
      const sessionToken = getOrCreateSessionToken(event.slug)

      // Create cart
      await fetch('/api/gallery/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionToken,
          eventSlug: event.slug,
          photoIds: selectedIds,
        }),
      })

      // Create order
      const orderRes = await fetch('/api/gallery/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionToken,
          email,
          paymentMethod,
        }),
      })

      const orderData = await orderRes.json()

      if (!orderData.success) {
        setError(orderData.error || 'Erro ao processar pedido.')
        setProcessing(false)
        return
      }

      // Redirect based on payment method
      if (paymentMethod === 'card' && orderData.payment?.redirectUrl) {
        window.location.href = orderData.payment.redirectUrl
      } else if (paymentMethod === 'pix') {
        // Show Pix code (in a real implementation this would be a modal)
        const pixCode = orderData.payment?.pixCode
        if (pixCode) {
          // Store order info and redirect to success page
          localStorage.setItem(`magon-order-${event.slug}`, JSON.stringify(orderData.order))
          localStorage.setItem(`magon-pix-${event.slug}`, pixCode)
          window.location.href = `/pedido/pix?order=${orderData.order.orderNumber}`
        }
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.')
      setProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/90 md:items-center" onClick={onClose}>
      <div
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden border border-border bg-background md:rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-xl text-warm-white">Carrinho</h2>
          <button type="button" onClick={onClose} className="focus-ring text-cream" aria-label="Fechar">
            ✕
          </button>
        </div>

        {/* Photos list */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {selectedPhotos.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">Nenhuma foto selecionada</p>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {selectedPhotos.map((photo) => (
                <div key={photo.id} className="group relative aspect-[3/2] overflow-hidden bg-charcoal-soft">
                  {photo.previewThumbUrl && (
                    <Image
                      src={photo.previewThumbUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => onRemovePhoto(photo.id)}
                    className="absolute inset-0 flex items-center justify-center bg-charcoal/60 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Remover"
                  >
                    <span className="text-sm text-cream">✕</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="border-t border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-cream">{packageLabels[productType]}</span>
            <div className="text-right">
              <span className="text-xl font-medium text-warm-white">R$ {totalPrice.toFixed(2)}</span>
              {savings > 0 && (
                <span className="ml-2 text-sm text-muted-foreground line-through">
                  R$ {(selectedPhotos.length * pricing.individualPrice).toFixed(2)}
                </span>
              )}
            </div>
          </div>
          {savings > 0 && (
            <p className="mt-1 text-sm text-cream">Economia de R$ {savings.toFixed(2)}</p>
          )}
        </div>

        {/* Checkout form */}
        <div className="border-t border-border px-6 py-4">
          <label className="mb-3 block">
            <span className="mb-1 block text-sm text-muted-foreground">E-mail para receber as fotos</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              className="focus-ring w-full border border-border bg-transparent px-4 py-3 text-cream placeholder:text-muted-foreground"
            />
          </label>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('pix')}
              className={`focus-ring border px-4 py-3 text-sm transition-colors ${
                paymentMethod === 'pix'
                  ? 'border-cream bg-cream/10 text-cream'
                  : 'border-border text-muted-foreground hover:text-cream'
              }`}
            >
              Pix (instantâneo)
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`focus-ring border px-4 py-3 text-sm transition-colors ${
                paymentMethod === 'card'
                  ? 'border-cream bg-cream/10 text-cream'
                  : 'border-border text-muted-foreground hover:text-cream'
              }`}
            >
              Cartão
            </button>
          </div>

          {error && (
            <p className="mb-3 text-sm text-red-400" role="alert">{error}</p>
          )}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={processing || selectedIds.length === 0}
            className="focus-ring w-full bg-cream py-4 text-sm font-medium text-charcoal transition-opacity disabled:opacity-40"
          >
            {processing ? 'Processando...' : `Pagar R$ ${totalPrice.toFixed(2)}`}
          </button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Pagamento seguro via {paymentMethod === 'pix' ? 'Mercado Pago' : 'Stripe'}.
            Fotos em alta resolução, sem marca d'água.
          </p>
        </div>
      </div>
    </div>
  )
}

// ========================
// Helpers
// ========================

function getOrCreateSessionToken(eventSlug: string): string {
  const key = `magon-session-${eventSlug}`
  let token = localStorage.getItem(key)
  if (!token) {
    token = crypto.randomUUID()
    localStorage.setItem(key, token)
  }
  return token
}

function calculateBestDeal(quantity: number, pricing: typeof defaultEventPricing) {
  const individualTotal = quantity * pricing.individualPrice

  const options = [
    { type: 'individual', price: individualTotal, minQty: 1 },
    { type: 'package_3', price: pricing.package3Price, minQty: 3 },
    { type: 'package_5', price: pricing.package5Price, minQty: 5 },
    { type: 'package_10', price: pricing.package10Price, minQty: 10 },
  ]

  if (pricing.packageAllPrice) {
    options.push({ type: 'all', price: pricing.packageAllPrice, minQty: quantity })
  }

  const validOptions = options.filter((opt) => quantity >= opt.minQty || opt.type === 'individual')
  const bestOption = validOptions.reduce((best, opt) => (opt.price < best.price ? opt : best))

  return {
    productType: bestOption.type,
    unitPrice: bestOption.price / quantity,
    totalPrice: bestOption.price,
    savings: Math.max(0, individualTotal - bestOption.price),
  }
}
