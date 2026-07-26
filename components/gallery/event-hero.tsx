import Link from 'next/link'
import Image from 'next/image'
import { BrandMark } from '@/components/brand-mark'
import type { Event } from '@/lib/gallery.types'

interface EventHeroProps {
  event: Event
}

export function EventHero({ event }: EventHeroProps) {
  return (
    <section className="relative overflow-hidden bg-charcoal">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between gap-6 px-6 py-6 md:px-12 md:py-8">
        <Link href="/" className="focus-ring inline-flex" aria-label="Voltar para Magon Fotografia">
          <BrandMark className="h-14 w-auto md:h-18" priority />
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/eventos/circuito-cidades-paulistas-sao-carlos-2026/galeria"
            className="hidden rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 px-5 py-2.5 text-sm font-bold text-charcoal transition-transform hover:scale-[1.02] md:inline-flex"
          >
            Ver fotos
          </Link>
          <a
            href="https://wa.me/5516999942889?text=Ol%C3%A1%2C%20quero%20falar%20sobre%20as%20fotos%20do%20Circuito%20Cidades%20Paulistas"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring rounded-lg border border-border px-4 py-2.5 text-sm text-cream transition-colors hover:border-cream"
          >
            WhatsApp
          </a>
        </div>
      </header>

      {/* Main hero content */}
      <div className="relative z-10 px-6 pb-16 pt-8 md:px-12 md:pb-24 md:pt-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          {/* Left: Title + info */}
          <div className="max-w-5xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
                Galeria de evento
              </span>
              <span className="micro-label text-muted-foreground">São Carlos/SP · 26 JUL 2026</span>
            </div>

            <h1 className="font-display text-[3.5rem] leading-[0.88] text-warm-white md:text-[6rem] lg:text-[8rem]">
              Circuito
              <br />
              Cidades
              <br />
              Paulistas
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-cream/80 md:text-2xl">
              Correu os 5K, os 10K ou participou da caminhada? Encontre suas fotos pelo número de peito ou navegando pela galeria.
            </p>

            {/* Quick event details */}
            <div className="mt-8 flex flex-wrap gap-4">
              <EventTag label="Data" value="26 de julho · 7h" />
              <EventTag label="Local" value="Av. José Pereira Lopes, 250" />
              <EventTag label="Provas" value="5K · 10K · Caminhada" />
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/eventos/circuito-cidades-paulistas-sao-carlos-2026/galeria"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-8 py-4 text-base font-bold text-charcoal shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Encontrar minhas fotos →
              </Link>
              <a
                href="#buscar"
                className="inline-flex items-center justify-center rounded-xl border border-border px-8 py-4 text-base text-cream transition-colors hover:border-cream"
              >
                Buscar pelo número
              </a>
            </div>
          </div>

          {/* Right: Background photo + pricing card + featured photos */}
          <div className="relative space-y-6">
            {/* Vertical photo as background slide */}
            <div className="absolute -inset-6 -z-10 hidden overflow-hidden rounded-3xl lg:block">
              <img
                src="https://pub-19508add45684695bff4e914175513fd.r2.dev/events/circuito-cidades-paulistas-sao-carlos-2026/previews/019_preview.jpg"
                alt=""
                className="h-full w-full object-cover object-center"
                draggable={false}
              />
              {/* Gradient overlay: left side more transparent, right side more opaque */}
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-charcoal/60" />
            </div>
            {/* Pricing card */}
            <div className="rounded-2xl border border-amber-500/20 bg-charcoal-soft/80 p-6 backdrop-blur-sm md:p-8">
              <p className="mb-3 text-sm font-medium text-amber-400">Compre mais, pague menos</p>
              <div className="grid grid-cols-2 gap-2">
                <PriceTag qty="1" price="R$ 10" />
                <PriceTag qty="2+" price="R$ 9" badge="10% off" />
                <PriceTag qty="3+" price="R$ 8" badge="20% off" />
                <PriceTag qty="5+" price="R$ 7" badge="30% off" highlight />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Desconto automático no carrinho. Promoção até 02/08.
              </p>
            </div>

            {/* Featured photos placeholder — will show curated event photos */}
            <div className="grid grid-cols-3 gap-2 overflow-hidden rounded-xl">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-charcoal-soft">
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                    Foto {i}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Destaques da cobertura (em breve)
            </p>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="relative z-10 border-t border-border bg-charcoal-soft/50 px-6 py-4 md:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {event.publicNote}
          </p>
          <Image
            src="/brand/magonfotografia-white-crop.png"
            alt="Magon Fotografia"
            width={120}
            height={40}
            className="h-5 w-auto opacity-60"
          />
        </div>
      </div>
    </section>
  )
}

function EventTag({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-charcoal-soft/60 px-4 py-2.5">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm text-cream">{value}</p>
    </div>
  )
}

function PriceTag({ qty, price, badge, highlight }: { qty: string; price: string; badge?: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border p-3 text-center ${highlight ? 'border-amber-500/40 bg-amber-500/10' : 'border-border bg-charcoal/50'}`}>
      <p className="text-[10px] text-muted-foreground">{qty} foto{qty === '1' ? '' : 's'}</p>
      <p className="text-base font-bold text-warm-white">{price}</p>
      {badge && <p className="text-[10px] font-bold text-amber-400">{badge}</p>}
    </div>
  )
}
