import Link from 'next/link'
import { BrandMark } from '@/components/brand-mark'

const WHATSAPP =
  'https://wa.me/5516999942889?text=Ol%C3%A1%2C%20quero%20falar%20sobre%20as%20fotos%20do%20Circuito%20Cidades%20Paulistas'
const EMAIL = 'mailto:contato@magonfotografia.com.br'
const INSTAGRAM = 'https://instagram.com/magonfotografia'

export function EventFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal-soft px-6 py-14 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <Link href="/" className="focus-ring inline-flex" aria-label="Voltar para Magon Fotografia">
                <BrandMark className="h-20 w-auto md:h-24" />
              </Link>
              <p className="mt-4 max-w-sm text-lg leading-relaxed text-cream">
                Fotografia por Magon Fotografia
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Cobertura fotográfica e audiovisual em São Carlos e região.
              </p>
            </div>

            <nav className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FooterLink href={INSTAGRAM} label="@magonfotografia" />
              <FooterLink href={EMAIL} label="contato@magonfotografia.com.br" />
              <FooterLink href={WHATSAPP} label="WhatsApp · (16) 99994-2889" />
              <FooterLink href="/" label="Portfólio" external={false} />
              <FooterLink href="/#contato" label="Contato e orçamento" external={false} />
            </nav>
          </div>

          <div className="grid gap-4 border-t border-border pt-8 md:grid-cols-3">
            <p className="micro-label text-muted-foreground">São Carlos — SP</p>
            <p className="micro-label text-muted-foreground">
              Galeria independente · Magon Fotografia não representa a organização.
            </p>
            <p className="micro-label text-muted-foreground">© {year} Magon · Eduardo Magon</p>
          </div>

          <div className="border-t border-border pt-8">
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <Link href="/privacidade" className="focus-ring hover:text-cream">
                Política de Privacidade
              </Link>
              <span className="text-border">·</span>
              <Link href="/termos" className="focus-ring hover:text-cream">
                Termos de Uso
              </Link>
              <span className="text-border">·</span>
              <a href="#galeria-em-processamento" className="focus-ring hover:text-cream">
                Solicitar remoção de imagem
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({
  href,
  label,
  external = true,
}: {
  href: string
  label: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="focus-ring group flex items-center gap-2 text-cream transition-colors hover:text-warm-white"
    >
      <span className="text-base">{label}</span>
      <span className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">
        {external ? '↗' : '→'}
      </span>
    </a>
  )
}
