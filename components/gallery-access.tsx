import Image from "next/image";
import Link from "next/link";
import { portfolioGalleries } from "@/lib/portfolio-data";

const containGalleries = new Set([
  "cobertura-eventos-bares-e-clubs",
]);

const positionByGallery: Record<string, string> = {
  "retratos-stephanie-lima-ufscar": "center 22%",
  "retratos-livia-lima-estacao": "center 22%",
  "retratos-adriele-fernandes-estacao-rodoviaria": "center 24%",
  "retratos-giovana-profit-ufscar-sul": "center 36%",
  "cobertura-eventos-rave": "center 42%",
  "cobertura-eventos-workshop-joseph-pura-arte-tatto": "center 38%",
};

export function GalleryAccess() {
  return (
    <section id="galerias" className="relative w-full bg-charcoal-soft px-6 py-[14vh] md:px-12">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="micro-label mb-6 text-muted-foreground">[ Galerias completas ]</p>
          <h2 className="font-display text-[15vw] leading-[0.84] text-cream md:text-[7vw]">
            Arquivo
            <br />
            visual
          </h2>
        </div>
        <p className="max-w-md font-serif text-2xl italic leading-snug text-cream/70 md:text-3xl">
          Todas as fotos organizadas como no acervo: retratos, eventos e coberturas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {portfolioGalleries.map((gallery, index) => {
          const contain = containGalleries.has(gallery.slug);
          return (
            <Link
              key={gallery.slug}
              href={`/galerias/${gallery.slug}`}
              data-cursor
              data-cursor-text="Abrir"
              className="focus-ring group relative min-h-[56vh] overflow-hidden bg-charcoal"
            >
              <Image
                src={gallery.cover}
                alt={`${gallery.title} — Magon Fotografia`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`${contain ? "object-contain p-4" : "object-cover"} opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-100`}
                style={{ objectPosition: positionByGallery[gallery.slug] ?? "center center" }}
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <div className="mb-5 flex items-center justify-between">
                  <span className="micro-label text-cream/60">{gallery.category}</span>
                  <span className="micro-label text-cream/60">{gallery.count} fotos</span>
                </div>
                <h3 className="font-display text-[12vw] leading-[0.84] text-warm-white md:text-[4.6vw]">
                  {String(index + 1).padStart(2, "0")}
                </h3>
                <p className="micro-label mt-4 text-cream">{gallery.title}</p>
                <p className="mt-2 line-clamp-2 text-sm text-cream/55">{gallery.sourcePath}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
