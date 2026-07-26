import Link from 'next/link'
import { BrandMark } from '@/components/brand-mark'
import type { Event } from '@/lib/gallery.types'

interface EventHeroProps {
  event: Event
}

export function EventHero({ event }: EventHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-charcoal px-6 py-8 md:px-12 md:py-10">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        poster="/media/hero-poster.png"
      >
        <source src="/media/marathon-hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal/90" />

      <header className="mb-16 flex items-center justify-between gap-6 md:mb-24">
        <Link href="/" className="focus-ring inline-flex" aria-label="Voltar para Magon Fotografia">
          <BrandMark className="h-16 w-auto md:h-20" priority />
        </Link>
        <a
          href="https://wa.me/5516999942889?text=Ol%C3%A1%2C%20quero%20falar%20sobre%20as%20fotos%20do%20Circuito%20Cidades%20Paulistas"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring hidden border border-border px-4 py-2 text-sm text-cream transition-colors hover:border-cream md:inline-flex"
        >
          WhatsApp
        </a>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="max-w-5xl">
          <p className="micro-label mb-5 text-muted-foreground">Galeria de evento · São Carlos/SP</p>
          <h1 className="font-display max-w-5xl text-[4rem] text-warm-white md:text-[7rem] lg:text-[9rem]">
            Suas fotos no Circuito Cidades Paulistas
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-cream md:text-2xl">
            Correu os 5K, os 10K ou participou da caminhada? Encontre suas fotos pelo número de peito, por selfie ou navegando pela galeria.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Evento realizado em 26 de julho de 2026, com largada às 7h, em frente à fábrica da Electrolux, em São Carlos/SP.
          </p>
        </div>

        <aside className="border border-border bg-card/70 p-6 md:p-8">
          <p className="micro-label mb-4 text-muted-foreground">Evento</p>
          <h2 className="mb-6 text-2xl text-warm-white">{event.name}</h2>
          <dl className="space-y-4 text-sm text-cream">
            <div>
              <dt className="micro-label mb-1 text-muted-foreground">Data</dt>
              <dd>26 de julho de 2026 · 7h</dd>
            </div>
            <div>
              <dt className="micro-label mb-1 text-muted-foreground">Local</dt>
              <dd>{event.location}</dd>
            </div>
            <div>
              <dt className="micro-label mb-1 text-muted-foreground">Modalidades</dt>
              <dd>{event.modalities.join(' · ')}</dd>
            </div>
          </dl>
          <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
            {event.publicNote}
          </p>
        </aside>
      </div>
    </section>
  )
}
