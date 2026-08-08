import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BrandMark } from '@/components/brand-mark'
import { EventFooter } from '@/components/gallery/event-footer'
import { ImageProtection } from '@/components/gallery/image-protection'
import {
  rodeioEvent,
  rodeioHero,
  rodeioShowImages,
  rodeioMontariaImages,
  rodeioPublicoImages,
  rodeioComingSoon,
  WHATSAPP_PARTICIPANTE,
  WHATSAPP_IMPRENSA,
} from '@/lib/rodeio-preview'

export const metadata: Metadata = {
  title: 'Rodeio Fest 2026 — Cobertura 07.08 | Magon Fotografia',
  description:
    'Cobertura fotográfica e audiovisual do São Carlos Rodeio Fest 2026 — noite de 07 de agosto, com Matheus & Kauan e Ícaro e Gilmar, por Eduardo Magon. Montaria, vídeo e galeria completa em breve.',
  keywords: [
    'Rodeio Fest São Carlos 2026',
    'São Carlos Rodeio Fest 07 de agosto',
    'fotos Matheus e Kauan São Carlos',
    'fotos Ícaro e Gilmar São Carlos',
    'cobertura fotográfica rodeio São Carlos',
    'fotógrafo de show São Carlos',
    'Magon Fotografia',
  ],
  openGraph: {
    title: 'Rodeio Fest 2026 — Cobertura da noite de 07.08',
    description:
      'Matheus & Kauan + Ícaro e Gilmar. Cobertura por Eduardo Magon. Montaria, vídeo e galeria completa em breve.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Magon Fotografia',
    url: 'https://magonfotografia.com.br/eventos/sao-carlos-rodeio-fest-2026',
    images: [{ url: 'https://magonfotografia.com.br/images/rodeio/rodeio-hero.webp' }],
  },
  alternates: {
    canonical: 'https://magonfotografia.com.br/eventos/sao-carlos-rodeio-fest-2026',
  },
  robots: { index: true, follow: true },
}

export default function RodeioFestPage() {
  return (
    <main className="min-h-screen select-none bg-background text-foreground">
      <ImageProtection />
      {/* ============================ HERO ============================ */}
      <section className="relative min-h-[92vh] overflow-hidden bg-charcoal" data-protected>
        <Image src={rodeioHero.src} alt={rodeioHero.alt} fill priority sizes="100vw" draggable={false} className="object-cover opacity-80" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,10,9,0.35) 0%, rgba(11,10,9,0.15) 35%, rgba(11,10,9,0.75) 78%, #0b0a09 100%)',
          }}
        />

        <header className="relative z-10 flex items-center justify-between gap-6 px-6 py-6 md:px-12 md:py-8">
          <Link href="/" className="focus-ring inline-flex" aria-label="Voltar para Magon Fotografia">
            <BrandMark className="h-14 w-auto md:h-18" priority />
          </Link>
          <a
            href={WHATSAPP_PARTICIPANTE}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring rounded-lg border border-cream/30 bg-charcoal/40 px-4 py-2.5 text-sm text-cream backdrop-blur-sm transition-colors hover:border-cream"
          >
            WhatsApp
          </a>
        </header>

        <div className="relative z-10 flex min-h-[calc(92vh-100px)] flex-col justify-end px-6 pb-14 md:px-12 md:pb-20">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
              Cobertura · {rodeioEvent.dateShort}
            </span>
            <span className="micro-label text-cream/80">{rodeioEvent.nightLabel}</span>
          </div>

          <h1 className="font-display text-[3.5rem] leading-[0.82] text-warm-white md:text-[8rem] lg:text-[10rem]">
            Rodeio Fest
            <br />
            <span className="text-outline">2026</span>
          </h1>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <p className="text-2xl text-warm-white md:text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>
                {rodeioEvent.dateLabel} · {rodeioEvent.location}
              </p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/85">
                {rodeioEvent.credit}. Registro da <strong className="text-cream">noite de abertura</strong> do festival.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:items-end">
              <div className="flex flex-wrap gap-2 md:justify-end">
                {rodeioEvent.acts.map((a) => (
                  <span key={a} className="rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300">
                    {a}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={WHATSAPP_PARTICIPANTE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-7 py-4 text-base font-bold text-charcoal shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Quero minhas fotos →
                </a>
                <a
                  href="#imprensa"
                  className="inline-flex items-center justify-center rounded-xl border border-cream/30 px-7 py-4 text-base text-cream transition-colors hover:border-cream"
                >
                  Imprensa
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ INTRO ============================ */}
      <section className="border-b border-border px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="micro-label mb-6 text-amber-400">07 de agosto · Night One</p>
          <p className="text-2xl leading-snug text-warm-white md:text-4xl md:leading-[1.15]">
            Fui registrar a abertura do Rodeio Fest 2026 em São Carlos — a noite de{' '}
            <span className="text-amber-400">Matheus &amp; Kauan</span> e{' '}
            <span className="text-amber-400">Ícaro e Gilmar</span>. Do palco ao público, da luz à arena.
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/70">
            Esta é a primeira leva da cobertura. A montaria, o vídeo da noite e a galeria completa em
            alta resolução entram aqui em breve.
          </p>
        </div>
      </section>

      {/* ============================ O SHOW ============================ */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-5xl leading-[0.9] text-warm-white md:text-7xl">O show</h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Palco, luz e apresentação — Matheus &amp; Kauan e Ícaro e Gilmar na arena de São Carlos.
            </p>
          </div>

          {/* Feature landscape */}
          <div data-protected className="relative mb-4 aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-charcoal">
            <Image
              src={rodeioShowImages[0].src}
              alt={rodeioShowImages[0].alt}
              fill
              draggable={false}
              sizes="100vw"
              className="pointer-events-none object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>

          {/* Portrait grid */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {rodeioShowImages.slice(1).map((img) => (
              <GridImg key={img.src} img={img} className="aspect-[2/3]" />
            ))}
          </div>
        </div>
      </section>

      {/* ============================ MONTARIA & ARENA ============================ */}
      <section className="border-t border-border bg-charcoal-soft px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-5xl leading-[0.9] text-warm-white md:text-7xl">Montaria &amp; arena</h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              A abertura, a cerimônia e a montaria — a raiz do rodeio antes do show.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            <GridImg img={rodeioMontariaImages[0]} className="aspect-[3/4] md:row-span-2 md:aspect-auto" />
            <GridImg img={rodeioMontariaImages[1]} className="aspect-[16/9] md:col-span-2" />
            <GridImg img={rodeioMontariaImages[2]} className="aspect-[16/9] md:col-span-2" />
          </div>
        </div>
      </section>

      {/* ============================ O PÚBLICO ============================ */}
      <section className="border-t border-border px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-5xl leading-[0.9] text-warm-white md:text-7xl">O público</h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              A energia da plateia na noite de abertura — chapéu, brilho e a cara do rodeio.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <GridImg img={rodeioPublicoImages[0]} className="col-span-2 row-span-2 aspect-square md:aspect-auto" />
            {rodeioPublicoImages.slice(1).map((img) => (
              <GridImg key={img.src} img={img} className="aspect-[2/3]" />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EM BREVE ==================== */}
      <section className="border-t border-border px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="micro-label mb-4 text-amber-400">Full story coming soon</p>
          <h2 className="font-display max-w-3xl text-4xl leading-[0.9] text-warm-white md:text-6xl">
            Ainda vem mais desta noite
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/70">
            Esta é a prévia da cobertura de 07.08. Estão em processamento:
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {rodeioComingSoon.map((b, i) => (
              <div
                key={b.key}
                className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-charcoal-soft/60 p-6"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40"
                  style={{ background: 'radial-gradient(90% 60% at 50% 0%, rgba(245,158,11,0.12), transparent 60%)' }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="font-display text-2xl text-cream/40">0{i + 1}</span>
                  <span className="rounded-full border border-amber-500/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Em breve
                  </span>
                </div>
                <div className="relative">
                  <h3 className="font-display text-2xl uppercase text-warm-white md:text-3xl">{b.label}</h3>
                  <p className="mt-2 text-sm text-cream/60">{b.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ IMPRENSA ============================ */}
      <section id="imprensa" className="border-t border-border bg-charcoal-soft px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="micro-label mb-4 text-muted-foreground">Press · Imprensa</p>
            <h2 className="font-display text-4xl leading-[0.9] text-warm-white md:text-6xl">
              Para redações e portais
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/80">
              Cobertura editorial independente da noite de abertura do São Carlos Rodeio Fest 2026 —
              show e público. Também produzi <strong className="text-cream">vídeo</strong> da noite.
              Disponibilizo seleção em alta resolução, com crédito e liberação de publicação. Fale
              comigo pelo WhatsApp para receber o material.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_IMPRENSA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-7 py-4 text-base font-bold text-charcoal transition-transform hover:scale-[1.02]"
              >
                Falar com o Eduardo →
              </a>
              <a
                href="https://instagram.com/directedbymagon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-border px-7 py-4 text-base text-cream transition-colors hover:border-cream"
              >
                @directedbymagon
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-charcoal/60 p-8">
            <h3 className="mb-6 text-lg font-medium text-warm-white">Ficha da cobertura</h3>
            <dl className="space-y-4 text-sm">
              <PressRow label="Evento" value={rodeioEvent.name} />
              <PressRow label="Noite coberta" value={`${rodeioEvent.dateLabel} · abertura`} />
              <PressRow label="Atrações" value={rodeioEvent.acts.join(' · ')} />
              <PressRow label="Festival" value={`${rodeioEvent.festivalRange} (cobertura apenas de 07.08)`} />
              <PressRow label="Material" value="Fotografia (show + público) + vídeo da noite" />
              <PressRow label="Em processamento" value="Montaria · vídeo · galeria completa" accent />
              <PressRow label="Contato" value="WhatsApp (16) 99994-2889" />
            </dl>
            <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
              Arquivos originais não são disponibilizados publicamente. Solicite a seleção em alta
              diretamente pelo WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <EventFooter />
    </main>
  )
}

function GridImg({ img, className = '' }: { img: { src: string; alt: string }; className?: string }) {
  return (
    <div data-protected className={`relative overflow-hidden rounded-xl border border-border bg-charcoal ${className}`}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        draggable={false}
        sizes="(max-width: 768px) 50vw, 25vw"
        className="pointer-events-none object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>
  )
}

function PressRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border pb-3 last:border-0 last:pb-0">
      <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className={accent ? 'font-medium text-amber-400' : 'text-cream'}>{value}</dd>
    </div>
  )
}
