"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const portfolioItems = [
  {
    src: "/portfolio/eventos-rave-mg-3648.webp",
    label: "Eventos",
    meta: "Cobertura · energia · presença",
    position: "center 48%",
  },
  {
    src: "/portfolio/eventos-rave-mg-9283.webp",
    label: "Eventos",
    meta: "Luz · movimento · atmosfera",
    position: "center 38%",
  },
  {
    src: "/portfolio/retratos-livia-mg-8884.webp",
    label: "Retratos",
    meta: "Direção · presença · silêncio",
    position: "center 22%",
  },
  {
    src: "/portfolio/retratos-stephanie-img-8298.webp",
    label: "Retratos",
    meta: "Editorial · pessoa · lugar",
    position: "center 20%",
  },
  {
    src: "/portfolio/retratos-giovana-mg-3063x.webp",
    label: "Retratos",
    meta: "Corpo · paisagem · identidade",
    position: "center 34%",
  },
  {
    src: "/portfolio/eventos-rave-mg-3654.webp",
    label: "Eventos",
    meta: "Cobertura · luz · noite",
    position: "center 35%",
  },
  {
    src: "/portfolio/eventos-rave-mg-9235.webp",
    label: "Eventos",
    meta: "Atmosfera · público · intensidade",
    position: "center 36%",
  },
  {
    src: "/portfolio/retratos-livia-mg-8880.webp",
    label: "Retratos",
    meta: "Retrato · gesto · presença",
    position: "center 22%",
  },
  {
    src: "/portfolio/retratos-livia-mg-8899.webp",
    label: "Retratos",
    meta: "Ensaio · estação · direção",
    position: "center 24%",
  },
  {
    src: "/portfolio/retratos-stephanie-img-8267.webp",
    label: "Retratos",
    meta: "Retrato · UFSCar · editorial",
    position: "center 22%",
  },
  {
    src: "/portfolio/retratos-stephanie-img-8310.webp",
    label: "Retratos",
    meta: "Editorial · movimento · campus",
    position: "center 20%",
  },
  {
    src: "/portfolio/retratos-adriele-026.webp",
    label: "Retratos",
    meta: "Retrato · estação · cidade",
    position: "center 42%",
  },
  {
    src: "/portfolio/retratos-adriele-082x.webp",
    label: "Retratos",
    meta: "Direção · olhar · textura",
    position: "center 22%",
  },
  {
    src: "/portfolio/retratos-giovana-mg-3141.webp",
    label: "Retratos",
    meta: "Paisagem · corpo · luz",
    position: "center 42%",
  },
  {
    src: "/portfolio/retratos-giovana-mg-3232-1x.webp",
    label: "Retratos",
    meta: "Retrato · natureza · presença",
    position: "center 42%",
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
    }, 3200);
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
            Uma amostra visual do trabalho: eventos, retratos e imagens dirigidas para serem lembradas.
          </p>
        </motion.div>

        <div className="md:col-span-8">
          <div className="relative min-h-[78svh] overflow-hidden bg-charcoal-soft">
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
          </div>

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
