'use client';

export function Footer() {
  return (
    <footer className="w-full py-12 px-6 md:px-12 bg-background border-t border-foreground/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <p className="text-sm tracking-widest text-foreground/50 font-medium mb-2">
              MAGON
            </p>
            <p className="text-sm text-foreground/60">
              Fotografia & Audiovisual
            </p>
          </div>
          <div>
            <p className="text-sm tracking-widest text-foreground/50 font-medium mb-2">
              REDES SOCIAIS
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                Instagram
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm tracking-widest text-foreground/50 font-medium mb-2">
              CONTATO
            </p>
            <a href="mailto:hello@magon.com" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              hello@magon.com
            </a>
          </div>
        </div>

        <div className="border-t border-foreground/10 pt-8">
          <p className="text-xs text-foreground/40 text-center">
            © 2024 Magon Fotografia & Audiovisual. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
