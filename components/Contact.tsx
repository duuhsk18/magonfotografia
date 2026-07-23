'use client';

export function Contact() {
  const whatsappLink = `https://wa.me/5511999999999?text=${encodeURIComponent(
    'Olá Magon! Gostaria de conversar sobre um projeto.'
  )}`;

  return (
    <section id="contato" className="w-full py-20 md:py-32 px-6 md:px-12 bg-foreground text-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
          Tem algo acontecendo?
        </h2>
        <p className="text-xl md:text-2xl font-light mb-12 text-background/90">
          Vamos fazer isso ser visto.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-background text-foreground font-semibold tracking-widest text-sm hover:bg-background/90 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            INICIAR UM PROJETO
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-background text-background font-semibold tracking-widest text-sm hover:bg-background/10 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            FALAR PELO WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}
