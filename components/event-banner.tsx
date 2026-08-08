import Link from 'next/link'
import Image from 'next/image'
import { rodeioEvent } from '@/lib/rodeio-preview'

const RODEIO_URL = '/eventos/sao-carlos-rodeio-fest-2026'

export function EventBanner() {
  return (
    <section className="relative overflow-hidden border-y border-amber-500/30">
      {/* Background photo (atmosphere) */}
      <Image
        src="/images/rodeio/rodeio-hero.webp"
        alt="Palco do São Carlos Rodeio Fest 2026 — noite de 07 de agosto"
        fill
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/80 to-charcoal/95" />
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-amber-500/15 blur-[120px]" />
        <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-amber-500/10 blur-[100px]" />
      </div>

      <div className="relative px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
              Coverage preview
            </span>
            <span className="text-sm text-cream/70">
              {rodeioEvent.dateShort} · {rodeioEvent.nightLabel} · {rodeioEvent.location}
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <h2 className="font-display mb-6 text-[3.25rem] leading-[0.85] text-warm-white md:text-[6rem]">
                Rodeio Fest
                <br />
                <span className="text-amber-400">2026</span>
              </h2>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-cream/80">
                Cobertura da noite de abertura em São Carlos, com{' '}
                <span className="font-medium text-amber-400">Matheus &amp; Kauan</span> e{' '}
                <span className="font-medium text-amber-400">Ícaro e Gilmar</span>. Fotografia e
                audiovisual por Eduardo Magon — galeria completa e vídeo em breve.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={RODEIO_URL}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-8 py-4 text-base font-bold text-charcoal shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Ver a cobertura →
                </Link>
                <Link
                  href={`${RODEIO_URL}#imprensa`}
                  className="inline-flex items-center justify-center rounded-xl border border-cream/30 px-8 py-4 text-base text-cream transition-colors hover:border-cream"
                >
                  Imprensa
                </Link>
              </div>
            </div>

            {/* Info card */}
            <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm md:p-8">
              <h3 className="mb-5 text-lg font-medium text-warm-white">{rodeioEvent.name}</h3>
              <dl className="space-y-3 text-sm">
                <dt className="text-muted-foreground">Noite coberta</dt>
                <dd className="text-cream">{rodeioEvent.dateLabel} · abertura</dd>
                <dt className="mt-2 text-muted-foreground">Atrações</dt>
                <dd className="text-cream">{rodeioEvent.acts.join(' · ')}</dd>
                <dt className="mt-2 text-muted-foreground">Cobertura</dt>
                <dd className="text-cream">Fotografia + audiovisual</dd>
                <dt className="mt-2 text-muted-foreground">Galeria</dt>
                <dd className="font-medium text-amber-400">Em breve · prévia no ar</dd>
              </dl>
              <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
                Cobertura editorial independente da Magon Fotografia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
