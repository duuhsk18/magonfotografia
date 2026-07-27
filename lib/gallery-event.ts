import type { Event, EventPricing } from './gallery.types'

export const circuitoCidadesPaulistasEvent: Event = {
  id: 'circuito-cidades-paulistas-sao-carlos-2026',
  name: 'Circuito Cidades Paulistas 14 — São Carlos 2026',
  slug: 'circuito-cidades-paulistas-sao-carlos-2026',
  description:
    'Galeria fotográfica independente do Circuito Cidades Paulistas 14 — Etapa São Carlos, realizado em 26 de julho de 2026.',
  dateEvent: '2026-07-26T07:00:00-03:00',
  location: 'Avenida José Pereira Lopes, 250 — Vila Prado — São Carlos/SP',
  modalities: ['Corrida 5 km', 'Corrida 10 km', 'Caminhada 5 km'],
  status: 'draft',
  coverUrl: undefined,
  coverThumbUrl: undefined,
  publicNote:
    'Galeria fotográfica independente produzida pela Magon Fotografia. A Magon Fotografia não representa a organização do evento.',
  createdAt: '2026-07-26T00:00:00-03:00',
  updatedAt: '2026-07-26T00:00:00-03:00',
}

export const defaultEventPricing: EventPricing = {
  id: 'pricing-circuito-cidades-paulistas-sao-carlos-2026',
  eventId: circuitoCidadesPaulistasEvent.id,
  individualPrice: 10.0,
  package3Price: 24.0,   // 3 fotos × R$8,00 (20% OFF)
  package5Price: 35.0,   // 5 fotos × R$7,00 (30% OFF)
  package10Price: 70.0,  // 10 fotos × R$7,00 (30% OFF)
  packageAllPrice: undefined, // sem pacote "todas"
  promoActive: true,
  promoDiscountPercent: undefined,
  promoStartAt: '2026-07-26T00:00:00-03:00',
  promoEndAt: '2026-08-02T23:59:59-03:00',
  promoDescription: 'Preços promocionais durante a primeira semana. Válido até 02/08/2026.',
}

/**
 * Pricing tiers for display:
 * 1 foto: R$10,00
 * 2+ fotos: 10% OFF → R$9,00/foto
 * 3+ fotos: 20% OFF → R$8,00/foto
 * 5+ fotos: 30% OFF → R$7,00/foto
 *
 * Após 7 dias (02/08): base sobe para R$12,00 mantendo mesmos %.
 */
export function calculateProgressiveDiscount(quantity: number, basePrice = 10.0) {
  let discountPercent = 0
  let label = ''

  if (quantity >= 5) {
    discountPercent = 30
    label = '30% OFF'
  } else if (quantity >= 3) {
    discountPercent = 20
    label = '20% OFF'
  } else if (quantity >= 2) {
    discountPercent = 10
    label = '10% OFF'
  }

  const pricePerPhoto = basePrice * (1 - discountPercent / 100)
  const totalPrice = pricePerPhoto * quantity
  const savings = (basePrice * quantity) - totalPrice

  return {
    quantity,
    basePrice,
    discountPercent,
    label,
    pricePerPhoto,
    totalPrice,
    savings,
  }
}

export type GalleryPublicationStatus =
  | 'processing'
  | 'first_photos_available'
  | 'updating'
  | 'complete'
  | 'sales_closed'
  | 'archived'

export const galleryPublicationStatus: GalleryPublicationStatus = 'processing'

export const galleryStatusCopy: Record<GalleryPublicationStatus, { label: string; description: string }> = {
  processing: {
    label: 'Fotos em processamento',
    description:
      'Estamos preparando as primeiras imagens protegidas desta prova. A galeria será liberada em lotes.',
  },
  first_photos_available: {
    label: 'Primeiras fotos disponíveis',
    description:
      'Já existem fotos disponíveis para busca e compra. Novos lotes ainda podem ser adicionados.',
  },
  updating: {
    label: 'Galeria sendo atualizada',
    description:
      'Estamos adicionando novas fotos desta prova. Faça sua busca agora e volte novamente em breve.',
  },
  complete: {
    label: 'Galeria completa',
    description: 'Todas as fotos disponíveis deste evento já foram publicadas.',
  },
  sales_closed: {
    label: 'Vendas encerradas',
    description: 'As vendas desta galeria foram encerradas.',
  },
  archived: {
    label: 'Galeria arquivada',
    description: 'Esta galeria foi arquivada e não recebe novas compras.',
  },
}
