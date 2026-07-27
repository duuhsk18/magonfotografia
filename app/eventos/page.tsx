import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Eventos | Magon Fotografia',
  description: 'Galerias de fotos de eventos cobertos pela Magon Fotografia. Encontre e compre suas fotos.',
}

const events = [
  {
    slug: 'circuito-cidades-paulistas-sao-carlos-2026',
    name: 'Circuito Cidades Paulistas 14 — São Carlos 2026',
    date: '26 de julho de 2026',
    location: 'São Carlos/SP',
    modalities: 'Corrida 5K · 10K · Caminhada',
    photoCount: 335,
    status: 'Galeria disponível' as const,
    cover: '/media/hero-slide-1.jpg',
  },
]

export default function EventosPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <Link href="/" className="mb-8 inline-block">
            <Image
              src="/brand/magonfotografia-white-crop.png"
              alt="Magon Fotografia"
              width={180}
              height={60}
              className="h-10 w-auto opacity-80"
            />
          </Link>
          <h1 className="font-display text-5xl text-warm-white md:text-7xl">Eventos</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Galerias de fotos de eventos cobertos pela Magon Fotografia.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event.slug}
              href={`/eventos/${event.slug}`}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-amber-500/30"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={event.cover}
                  alt={event.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-400">
                    {event.status}
                  </span>
                  <span className="text-xs text-cream/80">{event.photoCount} fotos</span>
                </div>
              </div>
              <div className="p-5">
                <h2 className="mb-2 text-lg font-medium text-warm-white">{event.name}</h2>
                <dl className="space-y-1 text-sm text-muted-foreground">
                  <dd>{event.date} · {event.location}</dd>
                  <dd>{event.modalities}</dd>
                </dl>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
