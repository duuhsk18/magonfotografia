import Link from 'next/link'
import Image from 'next/image'

export function EventBanner() {
  return (
    <section className="relative overflow-hidden border-b border-amber-500/20 bg-gradient-to-r from-charcoal via-charcoal-soft to-charcoal px-6 py-10 md:px-12 md:py-14">
      {/* Accent glow */}
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-amber-500/10 blur-[100px]" />
      <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-amber-500/5 blur-[80px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 text-center md:flex-row md:text-left">
        {/* Icon/badge */}
        <div className="flex shrink-0 flex-col items-center gap-3 md:items-start">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
            <svg className="h-6 w-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
          <Image
            src="/brand/magonfotografia-white-crop.png"
            alt="Magon Fotografia"
            width={120}
            height={40}
            className="h-6 w-auto opacity-70"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400">
              NOVO
            </span>
            <span className="text-xs text-muted-foreground">26 JUL 2026 · São Carlos/SP</span>
          </div>
          <h2 className="mb-2 text-xl font-bold text-warm-white md:text-2xl">
            Fotos do Circuito Cidades Paulistas — São Carlos 2026
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Correu os 5K, os 10K ou caminhou? Encontre suas fotos pelo número de peito ou navegando pela galeria.
            Compre mais, pague menos — desconto progressivo de até 30% OFF.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/eventos/circuito-cidades-paulistas-sao-carlos-2026/galeria"
          className="shrink-0 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 px-6 py-3 text-sm font-bold text-charcoal shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Ver minhas fotos
        </Link>
      </div>
    </section>
  )
}
