import type { Metadata } from 'next'
import { circuitoCidadesPaulistasEvent, galleryStatusCopy } from '@/lib/gallery-event'
import { EventHero } from '@/components/gallery/event-hero'
import { EventSearch } from '@/components/gallery/event-search'
import { EventInfo } from '@/components/gallery/event-info'
import { EventFooter } from '@/components/gallery/event-footer'

export const metadata: Metadata = {
  title: 'Fotos do Circuito Cidades Paulistas São Carlos 2026 | Magon Fotografia',
  description:
    'Encontre e compre suas fotos do Circuito Cidades Paulistas realizado em São Carlos. Pesquise pelo número do peito, encontre por selfie ou explore a galeria.',
  keywords: [
    'fotos Circuito Cidades Paulistas São Carlos 2026',
    'fotos corrida São Carlos 26 de julho',
    'fotos corrida Electrolux São Carlos',
    'fotos corrida 5K São Carlos',
    'fotos corrida 10K São Carlos',
    'fotógrafo corrida São Carlos',
    'fotos Circuito Cidades Paulistas 14',
    'comprar fotos da corrida São Carlos',
    'Magon Fotografia',
  ],
  openGraph: {
    title: 'Suas fotos no Circuito Cidades Paulistas — São Carlos 2026',
    description:
      'Correu os 5K, os 10K ou participou da caminhada? Encontre suas fotos pelo número de peito, por selfie ou navegando pela galeria.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Magon Fotografia',
    url: 'https://magonfotografia.com.br/eventos/circuito-cidades-paulistas-sao-carlos-2026',
  },
  alternates: {
    canonical: 'https://magonfotografia.com.br/eventos/circuito-cidades-paulistas-sao-carlos-2026',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CircuitoCidadesPaulistasPage() {
  const event = circuitoCidadesPaulistasEvent
  const status = galleryStatusCopy.processing

  return (
    <main className="min-h-screen bg-background text-foreground">
      <EventHero event={event} />
      <EventSearch event={event} statusLabel={status.label} statusDescription={status.description} />
      <EventInfo event={event} />
      <EventFooter />
    </main>
  )
}
