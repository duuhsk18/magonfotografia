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
  individualPrice: 19.9,
  package3Price: 49.9,
  package5Price: 79.9,
  package10Price: 149.9,
  packageAllPrice: undefined,
  promoActive: false,
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
