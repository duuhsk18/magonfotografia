import { BrandMark } from "@/components/brand-mark";

const WHATSAPP = "https://wa.me/5516999942889?text=Ol%C3%A1%2C%20quero%20iniciar%20um%20projeto%20com%20a%20Magon";
const EMAIL = "mailto:contato@magonfotografia.com";
const INSTAGRAM = "https://instagram.com/magonfotografia";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-charcoal-soft px-6 py-14 md:px-12">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <BrandMark className="h-24 w-auto md:h-28" />
            <p className="sr-only">MAGON</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3">
            <FooterLink href={INSTAGRAM} label="@magonfotografia" />
            <FooterLink href={EMAIL} label="contato@magonfotografia.com" />
            <FooterLink href={WHATSAPP} label="WhatsApp · (16) 99994-2889" />
            <FooterLink href="/#trabalhos" label="Trabalhos" external={false} />
            <FooterLink href="/#galerias" label="Galerias" external={false} />
            <FooterLink href="/#contato" label="Contato" external={false} />
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="micro-label text-muted-foreground">São Carlos — SP</p>
          <p className="micro-label text-muted-foreground">
            Contratos e parcerias pelo WhatsApp
          </p>
          <p className="micro-label text-muted-foreground">
            © {year} Magon · Eduardo Magon
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  external = true,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="focus-ring group flex items-center gap-2 text-cream transition-colors hover:text-warm-white"
    >
      <span className="text-lg">{label}</span>
      <span className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">
        {external ? "↗" : "→"}
      </span>
    </a>
  );
}
