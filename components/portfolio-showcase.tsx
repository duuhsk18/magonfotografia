"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const portfolioItems = [
  {
    src: "/portfolio/full/cobertura-eventos-rave/003-mg-3648.webp",
    label: "Eventos",
    meta: "Cobertura · energia · presença",
    position: "center 48%",
    gallery: "/galerias/cobertura-eventos-rave",
  },
  {
    src: "/portfolio/full/retratos-livia-lima-estacao/004-mg-8884.webp",
    label: "Retratos",
    meta: "Direção · presença · silêncio",
    position: "center 22%",
    gallery: "/galerias/retratos-livia-lima-estacao",
  },
  {
    src: "/portfolio/full/cobertura-eventos-automobilisticos-carros-exposicoes-expocar-expor-com-logo/055-mg-2168-aprimorado-nr.webp",
    label: "Automotivo",
    meta: "Detalhe · marca · produto",
    position: "center 45%",
    gallery: "/galerias/cobertura-eventos-automobilisticos-carros-exposicoes-expocar-expor-com-logo",
  },
  {
    src: "/portfolio/full/cobertura-eventos-workshop-joseph-pura-arte-tatto/035-mg-4998.webp",
    label: "Workshop",
    meta: "Processo · bastidores · arte",
    position: "center 38%",
    gallery: "/galerias/cobertura-eventos-workshop-joseph-pura-arte-tatto",
  },
  {
    src: "/portfolio/full/retratos-stephanie-lima-ufscar/025-img-8267.webp",
    label: "Retratos",
    meta: "Editorial · pessoa · lugar",
    position: "center 20%",
    gallery: "/galerias/retratos-stephanie-lima-ufscar",
  },
  {
    src: "/portfolio/full/cidade-em-foco/005-eduardo-0270.webp",
    label: "Cidade",
    meta: "Drone · paisagem · perspectiva",
    position: "center 50%",
    gallery: "/galerias/cidade-em-foco",
  },
  {
    src: "/portfolio/full/cobertura-eventos-rave/008-mg-9235.webp",
    label: "Eventos",
    meta: "Atmosfera · público · noite",
    position: "center 36%",
    gallery: "/galerias/cobertura-eventos-rave",
  },
  {
    src: "/portfolio/full/retratos-giovana-profit-ufscar-sul/001-mg-3063x.webp",
    label: "Retratos",
    meta: "Corpo · paisagem · identidade",
    position: "center 34%",
    gallery: "/galerias/retratos-giovana-profit-ufscar-sul",
  },
  {
    src: "/portfolio/full/cobertura-eventos-automobilisticos-carros-exposicoes-expocar-expor-com-logo/010-mg-2067.webp",
    label: "Automotivo",
    meta: "Exposição · atmosfera · marca",
    position: "center 42%",
    gallery: "/galerias/cobertura-eventos-automobilisticos-carros-exposicoes-expocar-expor-com-logo",
  },
  {
    src: "/portfolio/full/cobertura-eventos-workshop-joseph-pura-arte-tatto/012-mg-4936.webp",
    label: "Workshop",
    meta: "Tatuagem · detalhe · criação",
    position: "center 40%",
    gallery: "/galerias/cobertura-eventos-workshop-joseph-pura-arte-tatto",
  },
  {
    src: "/portfolio/full/retratos-adriele-fernandes-estacao-rodoviaria/005-062.webp",
    label: "Retratos",
    meta: "Retrato · estação · presença",
    position: "center 22%",
    gallery: "/galerias/retratos-adriele-fernandes-estacao-rodoviaria",
  },
  {
    src: "/portfolio/full/cobertura-eventos-rave/006-mg-9231-2.webp",
    label: "Eventos",
    meta: "Luz · energia · movimento",
    position: "center 35%",
    gallery: "/galerias/cobertura-eventos-rave",
  },
];

export function PortfolioShowcase() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const headerY = useTransform(scrollYProgress, [0, 0.28, 1], reduce ? ["0%", "0%", "0%"] : ["16%", "0%", "-10%"]);
  const railX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["4%", "-10%"]);
  const activeItem = portfolioItems[active];

  useEffect(() => {
    if (reduce || isAutoPaused) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % portfolioItems.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [isAutoPaused, reduce]);

  const selectItem = (index: number) => {
    setIsAutoPaused(true);
    setActive(index);
  };

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-charcoal px-6 py-[14vh] md:px-12">
      <div className="grid gap-10 md:grid-cols-12 md:items-start">
        <motion.div style={{ y: headerY }} className="w-full max-w-full md:sticky md:top-[12vh] md:col-span-4">
          <p className="micro-label mb-8 text-muted-foreground">[ Demonstração ]</p>
          <h2 className="max-w-[calc(100vw-3rem)] font-display text-[15vw] leading-[0.82] text-cream md:max-w-none md:text-[6.6vw]">
            Galeria{" "}
            <br />
            em cena
          </h2>
          <p className="mt-8 max-w-sm font-serif text-2xl italic leading-snug text-cream/70 md:text-3xl">
            Uma amostra visual do trabalho: eventos, retratos, workshops, coberturas automotivas e imagens aéreas.
          </p>
          <Link
            href="/#galerias"
            className="focus-ring mt-10 inline-flex items-center gap-3 border border-border px-6 py-4 text-base font-medium text-cream transition hover:border-cream"
          >
            Ver todas as galerias <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        <div className="md:col-span-8">
          <Link href={activeItem.gallery} className="focus-ring relative block min-h-[78svh] overflow-hidden bg-charcoal-soft">
            <motion.div
              key={activeItem.src}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, scale: 1.025 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                key={activeItem.src}
                src={activeItem.src}
                alt={`${activeItem.label} — Magon Fotografia`}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
                style={{ objectPosition: activeItem.position }}
                priority={active === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-charcoal/35" />
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="micro-label mb-3 text-cream/60">{activeItem.label}</p>
                  <h3 className="font-display text-[13vw] leading-[0.84] text-warm-white md:text-[6vw]">
                    {String(active + 1).padStart(2, "0")}
                  </h3>
                </div>
                <p className="micro-label max-w-xs text-cream/70 md:text-right">{activeItem.meta}</p>
              </div>
            </div>
          </Link>

          <motion.div style={{ x: railX }} className="mt-8 flex gap-4 overflow-hidden">
            {portfolioItems.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => selectItem(index)}
                className={`focus-ring group relative h-44 w-32 shrink-0 overflow-hidden bg-charcoal-soft md:h-64 md:w-48 ${
                  active === index ? "ring-1 ring-cream/70" : ""
                }`}
                aria-label={`Ver imagem ${index + 1}`}
                aria-current={active === index ? "true" : undefined}
              >
                <Image
                  src={item.src}
                  alt={`${item.label} — Magon Fotografia`}
                  fill
                  sizes="(max-width: 768px) 128px, 192px"
                  className="object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  style={{ objectPosition: item.position }}
                />
                <span className="micro-label absolute bottom-3 left-3 text-cream/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
