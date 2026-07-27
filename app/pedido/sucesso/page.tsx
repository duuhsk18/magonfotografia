'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface OrderStatus {
  order: {
    orderNumber: string
    status: string
    email: string
    totalPrice: number
    photoCount: number
  }
  stripe: {
    paymentStatus: string
    sessionStatus: string
  }
  downloads?: Array<{
    photoId: string
    filename: string
    thumbUrl: string
    downloadUrl: string | null
  }>
}

export default function PedidoSucessoPage() {
  const [sessionId] = useState(() => {
    if (typeof window === 'undefined') return ''
    return new URLSearchParams(window.location.search).get('session_id') || ''
  })
  const [data, setData] = useState<OrderStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pollCount, setPollCount] = useState(0)

  const fetchStatus = useCallback(async () => {
    if (!sessionId) {
      setError('Sessão de pagamento não encontrada.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`/api/gallery/order-status?session_id=${sessionId}`)
      const json = await res.json()

      if (!res.ok) {
        setError(json.error || 'Erro ao verificar pedido.')
        setLoading(false)
        return
      }

      setData(json)
      setLoading(false)
    } catch (err) {
      console.error('Status fetch error:', err)
      setError('Erro de conexão. Tente atualizar a página.')
      setLoading(false)
    }
  }, [sessionId])

  // Initial fetch
  useEffect(() => {
    const timer = window.setTimeout(() => { void fetchStatus() }, 0)
    return () => window.clearTimeout(timer)
  }, [fetchStatus])

  // Auto-poll if pending (max 10 attempts, every 5s)
  useEffect(() => {
    if (!data || data.order.status === 'paid' || pollCount >= 10) return

    const timer = window.setTimeout(() => {
      setPollCount((c) => c + 1)
      void fetchStatus()
    }, 5000)

    return () => window.clearTimeout(timer)
  }, [data, pollCount, fetchStatus])

  const isPaid = data?.order.status === 'paid'
  const isPending = data && !isPaid

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
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">Verificando pagamento...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="mb-4 text-lg text-cream">{error}</p>
            <button
              type="button"
              onClick={() => { setError(''); setLoading(true); void fetchStatus() }}
              className="rounded-lg border border-border px-6 py-3 text-sm text-cream hover:border-cream"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Paid — show downloads */}
        {isPaid && data && (
          <div>
            <div className="mb-8 text-center">
              <div className="mb-4 flex justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-3xl text-amber-400">✓</span>
              </div>
              <h1 className="font-display mb-2 text-4xl text-warm-white md:text-5xl">Pagamento confirmado</h1>
              <p className="text-sm text-muted-foreground">Pedido {data.order.orderNumber} · R$ {data.order.totalPrice.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">{data.order.photoCount} foto{data.order.photoCount !== 1 ? 's' : ''} · {data.order.email}</p>
            </div>

            {/* Downloads */}
            {data.downloads && data.downloads.length > 0 && (
              <div className="space-y-3">
                <div className="mb-4 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-center">
                  <p className="text-sm font-medium text-amber-400">
                    {data.downloads.length} foto{data.downloads.length !== 1 ? 's' : ''} prontas para download
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Arquivos em alta resolução, sem marca d'água. Links válidos por 1 hora.</p>
                </div>

                {data.downloads.map((item) => (
                  <div key={item.photoId} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-charcoal-soft">
                      {item.thumbUrl && (
                        <Image src={item.thumbUrl} alt="" fill className="object-cover" sizes="56px" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-cream">{item.filename}</p>
                      <p className="text-xs text-muted-foreground">Alta resolução</p>
                    </div>
                    {item.downloadUrl ? (
                      <a
                        href={item.downloadUrl}
                        download={item.filename}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-2 text-sm font-bold text-charcoal"
                      >
                        Baixar
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">Indisponível</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="mb-4 text-xs text-muted-foreground">
                Downloads disponíveis por 7 dias. Caso precise de ajuda, entre em contato pelo WhatsApp.
              </p>
              <Link
                href="/eventos/circuito-cidades-paulistas-sao-carlos-2026/galeria"
                className="text-sm text-muted-foreground hover:text-cream"
              >
                ← Voltar à galeria
              </Link>
            </div>
          </div>
        )}

        {/* Pending — waiting for confirmation */}
        {isPending && data && (
          <div className="rounded-xl border border-amber-500/20 bg-card p-8 text-center">
            <div className="mb-4 flex justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-xl">⏳</span>
            </div>
            <h1 className="font-display mb-3 text-3xl text-warm-white">Confirmando pagamento</h1>
            <p className="mb-2 text-sm text-muted-foreground">Pedido {data.order.orderNumber}</p>
            <p className="mb-6 text-sm text-cream">
              Seu pagamento foi recebido e está sendo confirmado. Esta página será atualizada automaticamente.
            </p>
            {pollCount < 10 && (
              <p className="text-xs text-muted-foreground">Verificando... ({pollCount}/10)</p>
            )}
            {pollCount >= 10 && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  A confirmação está demorando mais que o esperado.
                </p>
                <button
                  type="button"
                  onClick={() => { setPollCount(0); void fetchStatus() }}
                  className="rounded-lg border border-border px-6 py-3 text-sm text-cream hover:border-cream"
                >
                  Verificar novamente
                </button>
                <a
                  href="https://wa.me/5516999942889?text=Ol%C3%A1%2C%20fiz%20um%20pagamento%20mas%20n%C3%A3o%20recebi%20as%20fotos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-cream"
                >
                  Pedir ajuda pelo WhatsApp
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
