"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { CustomCursor } from "@/components/custom-cursor";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { getPortfolioGallery, portfolioGalleries } from "@/lib/portfolio-data";

export default function GalleryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const gallery = getPortfolioGallery(slug);
  const [active, setActive] = useState(0);

  if (!gallery) notFound();

  const activePhoto = gallery.photos[active];
  const nextGallery = useMemo(() => {
    const index = portfolioGalleries.findIndex((item) => item.slug === gallery.slug);
    return portfolioGalleries[(index + 1) % portfolioGalleries.length];
  }, [gallery.slug]);

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <main className="min-h-screen bg-charcoal text-cream">
        <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
          <Link href="/#galerias" className="focus-ring micro-label text-cream mix-blend-difference">
            ← Galerias
          </Link>
          <Link href="/" className="focus-ring font-display text-xl text-cream mix-blend-difference">
            MAGON
          </Link>
          <span className="micro-label text-cream mix-blend-difference">
            {String(active + 1).padStart(3, "0")}/{String(gallery.count).padStart(3, "0")}
          </span>
        </div>

        <section className="grid min-h-svh gap-8 px-6 pb-10 pt-28 md:grid-cols-12 md:px-12">
          <aside className="md:sticky md:top-28 md:col-span-4 md:h-[calc(100svh-8rem)]">
            <p className="micro-label mb-6 text-muted-foreground">{gallery.category}</p>
            <h1 className="font-display text-[18vw] leading-[0.82] text-warm-white md:text-[7vw]">
              {gallery.title}
            </h1>
            <p className="micro-label mt-8 text-cream/60">{gallery.sourcePath}</p>
            <p className="mt-8 max-w-sm font-serif text-2xl italic leading-snug text-cream/70 md:text-3xl">
              Galeria completa com passagem em slide e acesso a todas as fotos deste conjunto.
            </p>
          </aside>

          <div className="md:col-span-8">
            <div className="relative h-[76svh] overflow-hidden bg-charcoal-soft">
              <Image
                key={activePhoto.src}
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-contain"
              />
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setActive((current) => (current - 1 + gallery.photos.length) % gallery.photos.length)}
                className="focus-ring micro-label border border-border px-5 py-4 text-cream hover:border-cream"
              >
                ← Anterior
              </button>
              <p className="micro-label hidden text-muted-foreground md:block">{activePhoto.originalName}</p>
              <button
                type="button"
                onClick={() => setActive((current) => (current + 1) % gallery.photos.length)}
                className="focus-ring micro-label border border-border px-5 py-4 text-cream hover:border-cream"
              >
                Próxima →
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 md:grid-cols-5 lg:grid-cols-6">
              {gallery.photos.map((photo, index) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`focus-ring relative aspect-[3/4] overflow-hidden bg-charcoal-soft ${
                    active === index ? "ring-1 ring-cream" : "opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Abrir foto ${index + 1}`}
                  aria-current={active === index ? "true" : undefined}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 33vw, 11vw"
                    className="object-cover"
                  />
                  <span className="micro-label absolute bottom-2 left-2 text-cream/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border px-6 py-[12vh] md:px-12">
          <p className="micro-label mb-6 text-muted-foreground">[ Próxima galeria ]</p>
          <Link href={`/galerias/${nextGallery.slug}`} className="focus-ring group block" data-cursor data-cursor-text="Abrir">
            <span className="micro-label text-muted-foreground">{nextGallery.count} fotos</span>
            <h2 className="font-display text-[14vw] leading-[0.84] text-cream transition group-hover:text-warm-white md:text-[7vw]">
              {nextGallery.title}
            </h2>
          </Link>
        </section>

        <Footer />
      </main>
    </>
  );
}
