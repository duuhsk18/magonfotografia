import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pagamento confirmado | Magon Fotografia',
  robots: { index: false },
}

export default function PedidoSucessoPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <span className="flex h-16 w-16 items-center justify-center border border-cream text-3xl text-cream">✓</span>
        </div>
        <h1 className="font-display mb-4 text-5xl text-warm-white">Pagamento confirmado</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Suas fotos em alta resolução estão prontas para download. Confira o e-mail informado no momento da compra.
        </p>
        <div className="space-y-3">
          <Link
            href="/pedido/downloads"
            className="focus-ring block w-full bg-cream py-3 text-center text-sm font-medium text-charcoal"
          >
            Baixar minhas fotos
          </Link>
          <Link
            href="/eventos/circuito-cidades-paulistas-sao-carlos-2026"
            className="focus-ring block w-full border border-border py-3 text-center text-sm text-cream hover:border-cream"
          >
            Voltar à galeria
          </Link>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          Suas fotos ficarão disponíveis para download por 7 dias. Caso precise de ajuda, entre em contato pelo WhatsApp.
        </p>
      </div>
    </main>
  )
}
