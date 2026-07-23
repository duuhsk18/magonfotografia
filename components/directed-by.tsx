"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const STEPS = [
  { label: "Preparação", src: "/behind-scenes-1.png" },
  { label: "Operação de câmera", src: "/media/behind-03.png" },
  { label: "Direção", src: "/behind-scenes-2.png" },
  { label: "Edição & Resultado", src: "/media/behind-04.png" },
];

export function DirectedBy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={ref} className="relative w-full bg-charcoal py-[14vh]">
      <div className="grid grid-cols-1 gap-y-16 px-6 md:grid-cols-12 md:gap-x-8 md:px-12">
        {/* Sticky editorial column */}
        <div className="md:col-span-5">
          <motion.div style={{ y: textY }} className="md:sticky md:top-[18vh]">
            <p className="micro-label mb-8 text-muted-foreground">[ Processo ]</p>
            <h2 className="font-display text-[13vw] leading-[0.85] text-cream md:text-[6vw]">
              Directed
              <br />
              by Magon
            </h2>
            <p className="mt-8 max-w-md font-serif text-2xl italic leading-snug text-cream/75 md:text-3xl">
              Direção, fotografia e construção visual. Do primeiro enquadramento
              à entrega final.
            </p>
          </motion.div>
        </div>

        {/* Asymmetric image column */}
        <div className="flex flex-col gap-6 md:col-span-7">
          {STEPS.map((step, i) => (
            <ParallaxImage key={step.label} step={step} offset={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ParallaxImage({
  step,
  offset,
}: {
  step: { label: string; src: string };
  offset: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const clip = useTransform(
    scrollYProgress,
    [0, 0.45],
    ["inset(30% 0% 30% 0%)", "inset(0% 0% 0% 0%)"],
  );

  // Alternate left/right offset for asymmetric split-screen rhythm.
  const shift = offset % 2 === 0 ? "md:ml-0 md:mr-16" : "md:ml-16 md:mr-0";

  return (
    <div ref={ref} className={`relative ${shift}`}>
      <motion.div
        style={{ clipPath: clip }}
        className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal-soft"
      >
        <motion.div style={{ scale }} className="h-full w-full">
          <Image
            src={step.src || "/placeholder.svg"}
            alt={`Bastidores Magon — ${step.label}`}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover"
          />
        </motion.div>
        <span className="micro-label absolute bottom-4 left-4 text-cream">
          {String(offset + 1).padStart(2, "0")} · {step.label}
        </span>
      </motion.div>
    </div>
  );
}
