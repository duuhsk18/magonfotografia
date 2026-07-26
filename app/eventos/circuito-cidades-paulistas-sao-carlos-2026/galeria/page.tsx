import type { Metadata } from 'next'
import { circuitoCidadesPaulistasEvent } from '@/lib/gallery-event'
import { GalleryPageClient } from '@/components/gallery/gallery-page-client'

export const metadata: Metadata = {
  title: 'Galeria | Circuito Cidades Paulistas São Carlos 2026 | Magon Fotografia',
  description:
    'Navegue, selecione e compre suas fotos do Circuito Cidades Paulistas São Carlos 2026. Busque pelo número de peito ou explore a galeria.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function GaleriaPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <GalleryPageClient event={circuitoCidadesPaulistasEvent} />
    </main>
  )
}
