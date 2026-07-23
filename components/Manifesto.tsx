'use client';

export function Manifesto() {
  return (
    <section className="w-full py-20 md:py-32 px-6 md:px-12 bg-foreground text-background">
      <div className="max-w-4xl mx-auto">
        <p className="text-2xl md:text-4xl font-light leading-relaxed md:leading-[1.8] tracking-tight text-balance">
          A <span className="font-semibold">Magon Fotografia & Audiovisual</span> cria imagens para pessoas, marcas e experiências que merecem ser vistas de verdade.
        </p>
        <p className="text-2xl md:text-4xl font-light leading-relaxed md:leading-[1.8] tracking-tight mt-12 text-balance">
          Fotografamos o que acontece. Dirigimos o que precisa acontecer. E transformamos tudo isso em uma narrativa que continua viva depois que o momento termina.
        </p>
      </div>
    </section>
  );
}
