'use client';

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 bg-background/80 backdrop-blur-sm">
      <div className="text-2xl font-bold tracking-tight text-foreground">
        MAGON
      </div>
      <div className="flex items-center gap-8">
        <a href="#projetos" className="text-sm tracking-widest text-foreground/70 hover:text-foreground transition-colors">
          PROJETOS
        </a>
        <a href="#contato" className="text-sm tracking-widest text-foreground/70 hover:text-foreground transition-colors">
          CONTATO
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm tracking-widest text-foreground/70 hover:text-foreground transition-colors">
          INSTAGRAM
        </a>
      </div>
    </nav>
  );
}
