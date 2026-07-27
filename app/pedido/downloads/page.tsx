'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface DownloadItem {
  photoId: string
  filename: string
  thumbUrl: string
  downloadUrl?: string
  loading: boolean
  error?: string
}

export default function PedidoDownloadsPage() {
  const [orderNumber] = useState(() => {
    if (typeof window === 'undefined') return ''
    return new URLSearchParams(window.location.search).get('order') || ''
  })
  const [items] = useState<DownloadItem[]>([])

  const hasSession = typeof window !== 'undefined'
    ? !!localStorage.getItem('magon-session-circuito-cidades-paulistas-sao-carlos-2026')
    : false

  const loading = false
  const error = !orderNumber
    ? 'Pedido não encontrado. Verifique o link recebido por e-mail.'
    : !hasSession
      ? 'Sessão expirada. Acesse o link enviado por e-mail.'
      : ''

  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <Image
            src="/brand/magonfotografia-white-crop.png"
            alt="Magon Fotografia"
            width={180}
            height={60}
            className="mx-auto mb-6 h-10 w-auto opacity-80"
          />
          <h1 className="font-display mb-2 text-4xl text-warm-white md:text-5xl">
            Seus downloads
          </h1>
          {orderNumber && (
            <p className="text-sm text-muted-foreground">Pedido: {orderNumber}</p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">Carregando seus downloads...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="mb-4 text-lg text-cream">{error}</p>
            <p className="mb-6 text-sm text-muted-foreground">
              Se o pagamento foi confirmado, seus downloads estarão disponíveis em alguns minutos.
              Caso contrário, verifique o status do pagamento.
            </p>
            <a
              href="https://wa.me/5516999942889?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20o%20download%20das%20fotos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg border border-border px-6 py-3 text-sm text-cream transition-colors hover:border-cream"
            >
              Pedir ajuda pelo WhatsApp
            </a>
          </div>
        )}

        {/* Downloads available */}
        {!loading && !error && items.length === 0 && (
          <div className="rounded-xl border border-amber-500/20 bg-card p-8 text-center">
            <div className="mb-4 flex justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-2xl">⏳</span>
            </div>
            <h2 className="mb-3 text-xl text-warm-white">Aguardando confirmação</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              O pagamento está sendo processado. Assim que confirmado, seus downloads aparecerão aqui automaticamente.
              Para pagamentos via Pix, a confirmação costuma levar poucos segundos.
            </p>
            <p className="text-xs text-muted-foreground">
              Você também receberá um e-mail com o link de acesso quando as fotos estiverem prontas.
            </p>
          </div>
        )}

        {/* Download items */}
        {items.length > 0 && (
          <div className="space-y-4">
            <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-center">
              <p className="text-sm font-medium text-amber-400">
                {items.length} foto{items.length !== 1 ? 's' : ''} disponíveis para download
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Links válidos por 7 dias. Fotos em alta resolução, sem marca d'água.
              </p>
            </div>

            {items.map((item) => (
              <div key={item.photoId} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-charcoal-soft">
                  {item.thumbUrl && (
                    <Image src={item.thumbUrl} alt="" fill className="object-cover" sizes="64px" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-cream">{item.filename}</p>
                  <p className="text-xs text-muted-foreground">Alta resolução, sem marca d'água</p>
                </div>
                {item.downloadUrl ? (
                  <a
                    href={item.downloadUrl}
                    download
                    className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-2 text-sm font-bold text-charcoal"
                  >
                    Baixar
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground">Processando...</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 border-t border-border pt-8 text-center">
          <Link
            href="/eventos/circuito-cidades-paulistas-sao-carlos-2026/galeria"
            className="text-sm text-muted-foreground transition-colors hover:text-cream"
          >
            ← Voltar à galeria
          </Link>
        </div>
      </div>
    </main>
  )
}
