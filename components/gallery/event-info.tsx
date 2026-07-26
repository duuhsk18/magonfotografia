import Link from 'next/link'
import type { Event } from '@/lib/gallery.types'

interface EventInfoProps {
  event: Event
}

export function EventInfo({ event }: EventInfoProps) {
  return (
    <section className="border-b border-border bg-charcoal px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="micro-label mb-4 text-muted-foreground">Sobre a galeria</p>
          <h2 className="font-display text-5xl text-warm-white md:text-7xl">
            Fotos produzidas pela Magon Fotografia
          </h2>
        </div>

        <div className="space-y-10">
          <div className="grid gap-6 md:grid-cols-2">
            <InfoBlock title="Sobre o evento">
              O Circuito Cidades Paulistas passou por São Carlos no dia 26 de julho de 2026, com provas de corrida de 5 km e 10 km e caminhada de 5 km. A largada aconteceu às 7h, em frente à fábrica da Electrolux, na Avenida José Pereira Lopes, 250, Vila Prado.
            </InfoBlock>
            <InfoBlock title="Sobre a compra">
              A compra é das fotografias produzidas pela Magon Fotografia. Não vendemos inscrição, kit, resultado oficial ou qualquer produto da organização do evento.
            </InfoBlock>
            <InfoBlock title="Busca sem resultado">
              Ainda não encontrou sua foto? Informe seu número, modalidade, horário aproximado e as cores da sua roupa. Nós ajudaremos a procurar quando os lotes estiverem publicados.
            </InfoBlock>
            <InfoBlock title="Privacidade">
              A busca por rosto será opcional, limitada a este evento e só será liberada depois do fluxo de consentimento, retenção e exclusão estar implementado e testado.
            </InfoBlock>
          </div>

          <div className="border border-border bg-card p-6 md:p-8">
            <p className="micro-label mb-4 text-muted-foreground">Fotografia esportiva em São Carlos</p>
            <h3 className="mb-4 text-3xl text-warm-white">
              Organizando uma corrida ou evento?
            </h3>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Conheça a cobertura fotográfica e audiovisual da Magon Fotografia para corridas, empresas, retratos, ações comerciais e eventos em São Carlos e região.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#trabalhos"
                className="focus-ring inline-flex border border-border px-5 py-3 text-sm text-cream transition-colors hover:border-cream"
              >
                Ver portfólio
              </Link>
              <a
                href="https://wa.me/5516999942889?text=Ol%C3%A1%2C%20quero%20or%C3%A7ar%20cobertura%20fotogr%C3%A1fica%20para%20um%20evento"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex border border-cream bg-cream px-5 py-3 text-sm font-medium text-charcoal"
              >
                Solicitar orçamento
              </a>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            {event.publicNote}
          </p>
        </div>
      </div>
    </section>
  )
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="border border-border bg-background p-5">
      <h3 className="mb-3 text-xl text-warm-white">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
    </article>
  )
}
