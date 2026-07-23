'use client';

const services = [
  'Fotografia',
  'Filmes e Vídeos',
  'Cobertura de Eventos',
  'Conteúdo para Marcas',
  'Retratos',
  'Direção e Produção Visual',
];

export function Services() {
  return (
    <section className="w-full py-20 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 md:mb-20">
          Serviços
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
          {services.map((service) => (
            <div key={service} className="pb-8 border-b border-foreground/10">
              <p className="text-lg md:text-xl tracking-wide text-foreground/90">
                {service}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
