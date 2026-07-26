'use client'

import { useState } from 'react'
import type { Event } from '@/lib/gallery.types'

interface EventSearchProps {
  event: Event
  statusLabel: string
  statusDescription: string
}

export function EventSearch({ event, statusLabel, statusDescription }: EventSearchProps) {
  const [bibNumber, setBibNumber] = useState('')
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifyBib, setNotifyBib] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const normalizedBib = bibNumber.replace(/\D/g, '')
  const hasSearch = normalizedBib.length > 0

  return (
    <section id="buscar" className="border-b border-border bg-background px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="micro-label mb-4 text-muted-foreground">Encontre suas fotos</p>
            <h2 className="font-display text-5xl text-warm-white md:text-7xl">Busca simples, seleção clara</h2>
          </div>
          <div className="border border-border bg-card p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-cream" aria-hidden="true" />
              <p className="micro-label text-cream">{statusLabel}</p>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">{statusDescription}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <SearchCard
            step="01"
            title="Buscar pelo número"
            description="Informe o número do peito usado na corrida. Quando as primeiras fotos forem publicadas, mostraremos correspondências prováveis e resultados próximos."
          >
            <label className="mb-2 block text-sm text-muted-foreground" htmlFor="bib-search">
              Número do peito
            </label>
            <div className="flex gap-3">
              <input
                id="bib-search"
                inputMode="numeric"
                value={bibNumber}
                onChange={(event) => setBibNumber(event.target.value)}
                placeholder="Ex: 124"
                className="focus-ring min-w-0 flex-1 border border-border bg-background px-4 py-3 text-lg text-cream placeholder:text-muted-foreground"
              />
              <button
                type="button"
                disabled={!hasSearch}
                onClick={() => {
                  const target = document.getElementById('galeria-em-processamento')
                  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="focus-ring border border-cream bg-cream px-5 py-3 text-sm font-medium text-charcoal transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                Buscar
              </button>
            </div>
            {hasSearch && (
              <p className="mt-3 text-sm text-muted-foreground">
                Busca preparada para o número <strong className="text-cream">{normalizedBib}</strong>. Os resultados aparecerão quando o lote for publicado.
              </p>
            )}
          </SearchCard>

          <SearchCard
            step="02"
            title="Encontrar pelo rosto"
            description="A busca por selfie será opcional e limitada a esta galeria. Ela só será liberada depois da tela de consentimento, retenção e exclusão estarem ativas."
          >
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed border border-border bg-muted px-5 py-3 text-sm text-muted-foreground"
            >
              Reconhecimento facial em validação
            </button>
            <p className="mt-3 text-sm text-muted-foreground">
              Você também poderá encontrar suas fotos por número, horário e navegação manual — sem usar reconhecimento facial.
            </p>
          </SearchCard>

          <SearchCard
            step="03"
            title="Explorar todas"
            description="Navegue manualmente pela galeria em ordem cronológica, favorite imagens e monte sua própria seleção antes de comprar."
          >
            <button
              type="button"
              onClick={() => {
                const target = document.getElementById('galeria-em-processamento')
                target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="focus-ring w-full border border-border px-5 py-3 text-sm text-cream transition-colors hover:border-cream"
            >
              Ver estado da galeria
            </button>
          </SearchCard>
        </div>

        <div id="galeria-em-processamento" className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border border-border bg-charcoal-soft p-6 md:p-8">
            <p className="micro-label mb-4 text-muted-foreground">Galeria em atualização</p>
            <h3 className="mb-4 text-3xl text-warm-white">Primeiro lote em preparação</h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              As fotografias desta prova ainda estão sendo processadas para gerar miniaturas rápidas, previews com marca d’água e organização por número de peito. Nenhum arquivo original será exposto antes da compra.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-cream md:grid-cols-2">
              <li>✓ Previews protegidos</li>
              <li>✓ Originais privados</li>
              <li>✓ Busca por número</li>
              <li>✓ Compra individual e combos</li>
            </ul>
          </div>

          <form
            className="border border-border bg-card p-6 md:p-8"
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <p className="micro-label mb-4 text-muted-foreground">Avise-me quando publicar</p>
            <h3 className="mb-4 text-2xl text-warm-white">Receba o aviso desta galeria</h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Usaremos esses dados somente para avisos relacionados à galeria deste evento. Não adicionaremos você automaticamente a listas de marketing.
            </p>
            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm text-muted-foreground">E-mail</span>
                <input
                  type="email"
                  required
                  value={notifyEmail}
                  onChange={(event) => setNotifyEmail(event.target.value)}
                  placeholder="voce@email.com"
                  className="focus-ring w-full border border-border bg-background px-4 py-3 text-cream placeholder:text-muted-foreground"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-muted-foreground">Número do peito (opcional)</span>
                <input
                  inputMode="numeric"
                  value={notifyBib}
                  onChange={(event) => setNotifyBib(event.target.value)}
                  placeholder="Ex: 124"
                  className="focus-ring w-full border border-border bg-background px-4 py-3 text-cream placeholder:text-muted-foreground"
                />
              </label>
              <button
                type="submit"
                className="focus-ring w-full border border-cream bg-cream px-5 py-3 text-sm font-medium text-charcoal"
              >
                Quero receber o aviso
              </button>
              {submitted && (
                <p className="text-sm text-cream" role="status">
                  Aviso registrado localmente nesta versão. Na próxima etapa, isso será salvo no Supabase.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function SearchCard({
  step,
  title,
  description,
  children,
}: {
  step: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <article className="flex min-h-[24rem] flex-col justify-between border border-border bg-card p-6 md:p-8">
      <div>
        <p className="micro-label mb-5 text-muted-foreground">{step}</p>
        <h3 className="mb-4 text-3xl text-warm-white">{title}</h3>
        <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className="mt-8">{children}</div>
    </article>
  )
}
