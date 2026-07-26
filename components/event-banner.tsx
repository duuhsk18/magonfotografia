import Link from 'next/link'
import Image from 'next/image'

export function EventBanner() {
  return (
    <section className="relative overflow-hidden border-b border-amber-500/30 bg-gradient-to-b from-charcoal-soft via-charcoal to-charcoal-soft">
      {/* Background accents */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-amber-500/15 blur-[120px]" />
        <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-amber-500/10 blur-[100px]" />
      </div>

      <div className="relative px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10 flex flex-col items-center gap-4 text-center md:mb-14">
            <Image
              src="/brand/magonfotografia-white-crop.png"
              alt="Magon Fotografia"
              width={200}
              height={70}
              className="mb-2 h-10 w-auto opacity-80 md:h-12"
            />
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
                Novo evento
              </span>
              <span className="text-sm text-muted-foreground">26 de julho de 2026 · São Carlos/SP</span>
            </div>
          </div>

          {/* Main content */}
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <h2 className="font-display mb-6 text-[3rem] leading-[0.9] text-warm-white md:text-[4.5rem]">
                Suas fotos no Circuito Cidades Paulistas
              </h2>
              <p className="mb-6 max-w-xl text-lg leading-relaxed text-cream/80">
                Correu os 5K, os 10K ou participou da caminhada? Encontre suas fotos pelo número de peito ou navegando pela galeria completa. <span className="font-medium text-amber-400">Compre mais, pague menos.</span>
              </p>

              {/* Pricing tiers */}
              <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <PriceTier photos="1" price="R$ 10" />
                <PriceTier photos="2+" price="R$ 9" discount="10% off" />
                <PriceTier photos="3+" price="R$ 8" discount="20% off" />
                <PriceTier photos="5+" price="R$ 7" discount="30% off" highlight />
              </div>

              <p className="mb-8 text-xs text-muted-foreground">
                Desconto aplicado automaticamente. Junte fotos de amigos, casal ou equipe. Promoção válida até 02/08/2026.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/eventos/circuito-cidades-paulistas-sao-carlos-2026/galeria"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-8 py-4 text-base font-bold text-charcoal shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Ver minhas fotos →
                </Link>
                <Link
                  href="/eventos/circuito-cidades-paulistas-sao-carlos-2026"
                  className="inline-flex items-center justify-center rounded-xl border border-border px-8 py-4 text-base text-cream transition-colors hover:border-cream"
                >
                  Sobre o evento
                </Link>
              </div>
            </div>

            {/* Info card */}
            <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-warm-white">Circuito Cidades Paulistas 14</h3>
              </div>
              <dl className="space-y-3 text-sm">
                <dt className="text-muted-foreground">Data</dt>
                <dd className="text-cream">26 de julho de 2026 · Largada 7h</dd>
                <dt className="mt-2 text-muted-foreground">Local</dt>
                <dd className="text-cream">Av. José Pereira Lopes, 250 · São Carlos/SP</dd>
                <dt className="mt-2 text-muted-foreground">Modalidades</dt>
                <dd className="text-cream">Corrida 5K · Corrida 10K · Caminhada 5K</dd>
                <dt className="mt-2 text-muted-foreground">Fotos disponíveis</dt>
                <dd className="text-amber-400 font-medium">Galeria em publicação</dd>
              </dl>
              <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
                Galeria fotográfica independente produzida pela Magon Fotografia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PriceTier({ photos, price, discount, highlight }: { photos: string; price: string; discount?: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border p-3 text-center ${highlight ? 'border-amber-500/40 bg-amber-500/10' : 'border-border bg-card/30'}`}>
      <p className="text-xs text-muted-foreground">{photos} foto{photos === '1' ? '' : 's'}</p>
      <p className="text-lg font-bold text-warm-white">{price}</p>
      {discount && <p className="text-xs font-bold text-amber-400">{discount}</p>}
    </div>
  )
}
