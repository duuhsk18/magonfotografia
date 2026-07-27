'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PedidoPixPage() {
  const [pixCode] = useState(() => {
    if (typeof window === 'undefined') return ''
    const eventSlug = 'circuito-cidades-paulistas-sao-carlos-2026'
    return localStorage.getItem(`magon-pix-${eventSlug}`) || ''
  })
  const [orderNumber] = useState(() => {
    if (typeof window === 'undefined') return ''
    return new URLSearchParams(window.location.search).get('order') || ''
  })
  const [copied, setCopied] = useState(false)

  async function copyPix() {
    try {
      await navigator.clipboard.writeText(pixCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (error) {
      console.warn('Failed to copy Pix code:', error)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <span className="flex h-16 w-16 items-center justify-center border border-cream text-2xl text-cream">Pix</span>
        </div>
        <h1 className="font-display mb-4 text-5xl text-warm-white">Pague com Pix</h1>
        {orderNumber && (
          <p className="mb-2 text-sm text-muted-foreground">Pedido: {orderNumber}</p>
        )}
        <p className="mb-8 text-lg text-muted-foreground">
          Copie o código Pix abaixo e cole no aplicativo do seu banco. Após a confirmação, suas fotos serão liberadas automaticamente.
        </p>

        {pixCode ? (
          <div className="mb-6">
            <div className="border border-border bg-card p-4">
              <p className="break-all font-mono text-xs text-cream">{pixCode}</p>
            </div>
            <button
              type="button"
              onClick={copyPix}
              className="focus-ring mt-3 w-full bg-cream py-3 text-sm font-medium text-charcoal"
            >
              {copied ? 'Copiado!' : 'Copiar código Pix'}
            </button>
          </div>
        ) : (
          <p className="mb-6 text-sm text-muted-foreground">
            Código Pix não disponível. Verifique seu e-mail ou tente novamente.
          </p>
        )}

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            O Pix expira em 30 minutos. Após o pagamento, você receberá um e-mail com o link de download.
          </p>
          <Link
            href="/eventos/circuito-cidades-paulistas-sao-carlos-2026"
            className="focus-ring block w-full border border-border py-3 text-center text-sm text-cream hover:border-cream"
          >
            Voltar à galeria
          </Link>
        </div>
      </div>
    </main>
  )
}
