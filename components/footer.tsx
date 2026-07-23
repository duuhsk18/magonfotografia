export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-charcoal-soft px-6 py-14 md:px-12">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-6xl leading-none text-cream md:text-8xl">
              MAGON
            </p>
            <p className="micro-label mt-3 text-muted-foreground">
              Fotografia & Audiovisual
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3">
            <FooterLink
              href="https://instagram.com"
              label="Instagram"
            />
            <FooterLink href="mailto:contato@magon.com.br" label="E-mail" />
            <FooterLink
              href="https://wa.me/5516999999999"
              label="WhatsApp"
            />
            <FooterLink href="#trabalhos" label="Trabalhos" external={false} />
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="micro-label text-muted-foreground">São Carlos — SP</p>
          <p className="micro-label text-muted-foreground">
            Available for selected projects
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
      data-cursor
      data-cursor-text={label}
      className="group flex items-center gap-2 text-cream transition-colors hover:text-warm-white"
    >
      <span className="text-lg">{label}</span>
      <span className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">
        ↗
      </span>
    </a>
  );
}
