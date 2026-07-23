import Image from "next/image";
import Link from "next/link";

const rangeItems = [
  {
    title: "Eventos",
    label: "Rave · Cobertura",
    href: "/galerias/cobertura-eventos-rave",
    src: "/portfolio/full/cobertura-eventos-rave/008-mg-9235.webp",
  },
  {
    title: "Retratos",
    label: "Direção · Presença",
    href: "/galerias/retratos-livia-lima-estacao",
    src: "/portfolio/full/retratos-livia-lima-estacao/004-mg-8884.webp",
  },
  {
    title: "Workshop",
    label: "Processo · Atmosfera",
    href: "/galerias/cobertura-eventos-workshop-joseph-pura-arte-tatto",
    src: "/portfolio/full/cobertura-eventos-workshop-joseph-pura-arte-tatto/012-mg-4936.webp",
  },
  {
    title: "Automobilístico",
    label: "Detalhe · Movimento",
    href: "/galerias/cobertura-eventos-automobilisticos-carros-exposicoes-expocar-expor-com-logo",
    src: "/portfolio/full/cobertura-eventos-automobilisticos-carros-exposicoes-expocar-expor-com-logo/012-mg-2070.webp",
  },
];

export function VisualRange() {
  return (
    <section className="relative w-full bg-charcoal px-6 py-[14vh] md:px-12">
      <div className="mb-12 grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="micro-label mb-6 text-muted-foreground">[ Diversidade visual ]</p>
          <h2 className="font-display text-[15vw] leading-[0.84] text-cream md:text-[7vw]">
            Do evento
            <br />
            ao detalhe
          </h2>
        </div>
        <p className="max-w-md font-serif text-2xl italic leading-snug text-cream/70 md:col-span-5 md:text-3xl">
          Cobertura para mostrar energia, retrato para revelar presença, workshop para contar processo e detalhe para construir percepção.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {rangeItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className="focus-ring group relative h-[58vh] overflow-hidden bg-charcoal-soft md:h-[72vh]"
          >
            <Image
              src={item.src}
              alt={`${item.title} — Magon Fotografia`}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="micro-label text-cream/60">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-[13vw] leading-[0.84] text-warm-white md:text-[4vw]">
                {item.title}
              </h3>
              <p className="micro-label mt-4 text-cream/70">{item.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
