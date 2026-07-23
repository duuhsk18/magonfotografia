"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const slides = [
  { src: "/portfolio/eventos-rave-mg-3648.webp", label: "Eventos", meta: "Cobertura · energia · presença" },
  { src: "/portfolio/eventos-rave-mg-9283.webp", label: "Eventos", meta: "Luz · movimento · atmosfera" },
  { src: "/portfolio/retratos-livia-mg-8884.webp", label: "Retratos", meta: "Direção · presença · silêncio" },
  { src: "/portfolio/retratos-stephanie-img-8298.webp", label: "Retratos", meta: "Editorial · pessoa · lugar" },
  { src: "/portfolio/retratos-giovana-mg-3063x.webp", label: "Retratos", meta: "Corpo · paisagem · identidade" },
];

const gallery = [
  "/portfolio/eventos-rave-mg-3654.webp",
  "/portfolio/eventos-rave-mg-9235.webp",
  "/portfolio/retratos-livia-mg-8880.webp",
  "/portfolio/retratos-livia-mg-8899.webp",
  "/portfolio/retratos-stephanie-img-8267.webp",
  "/portfolio/retratos-stephanie-img-8310.webp",
  "/portfolio/retratos-adriele-026.webp",
  "/portfolio/retratos-adriele-082x.webp",
  "/portfolio/retratos-giovana-mg-3141.webp",
  "/portfolio/retratos-giovana-mg-3232-1x.webp",
];

export function PortfolioShowcase() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const headerY = useTransform(scrollYProgress, [0, 0.28, 1], reduce ? ["0%", "0%", "0%"] : ["16%", "0%", "-10%"]);
  const railX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["4%", "-10%"]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduce]);

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
            {slides.map((slide, index) => (
              <motion.div
                key={slide.src}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: active === index ? 1 : 0, scale: active === index ? 1 : 1.04 }}
                transition={{ duration: reduce ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={slide.src}
                  alt={`${slide.label} — Magon Fotografia`}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-charcoal/35" />
              </motion.div>
            ))}

            <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="micro-label mb-3 text-cream/60">{slides[active].label}</p>
                  <h3 className="font-display text-[13vw] leading-[0.84] text-warm-white md:text-[6vw]">
                    {String(active + 1).padStart(2, "0")}
                  </h3>
                </div>
                <p className="micro-label max-w-xs text-cream/70 md:text-right">{slides[active].meta}</p>
              </div>
            </div>
          </div>

          <motion.div style={{ x: railX }} className="mt-8 flex gap-4 overflow-hidden">
            {gallery.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(index % slides.length)}
                className="focus-ring group relative h-44 w-32 shrink-0 overflow-hidden bg-charcoal-soft md:h-64 md:w-48"
                aria-label={`Ver imagem ${index + 1}`}
              >
                <Image
                  src={src}
                  alt="Amostra do portfólio Magon Fotografia"
                  fill
                  sizes="(max-width: 768px) 128px, 192px"
                  className="object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
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
