import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pagamento não concluído | Magon Fotografia',
  robots: { index: false },
}

export default function PedidoCanceladoPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-md text-center">
        <h1 className="font-display mb-4 text-5xl text-warm-white">Pagamento não concluído</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          O pagamento não foi finalizado. Sua seleção continua salva — volte para a galeria quando quiser tentar novamente.
        </p>
        <div className="space-y-3">
          <Link
            href="/eventos/circuito-cidades-paulistas-sao-carlos-2026/galeria"
            className="focus-ring block w-full bg-cream py-3 text-center text-sm font-medium text-charcoal"
          >
            Voltar à galeria
          </Link>
          <a
            href="https://wa.me/5516999942889?text=Ol%C3%A1%2C%20tive%20problema%20no%20pagamento%20das%20fotos"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring block w-full border border-border py-3 text-center text-sm text-cream hover:border-cream"
          >
            Pedir ajuda pelo WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
