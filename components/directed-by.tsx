"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const STEPS = [
  { label: "Preparação", src: "/behind-scenes-1.png" },
  { label: "Operação de câmera", src: "/media/behind-03.png" },
  { label: "Direção", src: "/behind-scenes-2.png" },
  { label: "Edição & Resultado", src: "/media/behind-04.png" },
];

export function DirectedBy() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["12%", "-18%"]);
  const titleScale = useTransform(scrollYProgress, [0.1, 0.55, 0.92], reduce ? [1, 1, 1] : [0.94, 1, 0.86]);
  const bg = useTransform(scrollYProgress, [0, 0.25, 0.78, 1], ["#14120f", "#0b0a09", "#0b0a09", "#14120f"]);

  return (
    <motion.section ref={ref} className="relative w-full py-[14vh]" style={{ backgroundColor: bg }}>
      <div className="grid grid-cols-1 gap-y-16 px-6 md:grid-cols-12 md:gap-x-8 md:px-12">
        {/* Sticky editorial column */}
        <div className="md:col-span-5">
          <motion.div style={{ y: textY, scale: titleScale }} className="origin-left md:sticky md:top-[18vh]">
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
        <div className="editorial-mask-soft flex flex-col gap-[10vh] md:col-span-7 md:pt-[10vh]">
          {STEPS.map((step, i) => (
            <ParallaxImage key={step.label} step={step} offset={i} />
          ))}
        </div>
      </div>
    </motion.section>
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
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.55, 1], reduce ? [1, 1, 1] : [1.18, 1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "7%"]);
  const clip = useTransform(
    scrollYProgress,
    [0, 0.35, 0.8, 1],
    reduce
      ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(35% 8% 30% 8%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(22% 0% 22% 0%)"],
  );
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [offset % 2 === 0 ? -2 : 2, 0, offset % 2 === 0 ? 1.5 : -1.5]);

  // Alternate left/right offset for asymmetric split-screen rhythm.
  const shift = offset % 2 === 0 ? "md:-ml-10 md:mr-20" : "md:ml-20 md:-mr-6";
  const ratio = offset === 1 ? "aspect-[4/5]" : offset === 2 ? "aspect-[16/9]" : "aspect-[16/10]";

  return (
    <div ref={ref} className={`relative ${shift}`}>
      <motion.div
        style={{ clipPath: clip, rotate }}
        className={`relative ${ratio} w-full overflow-hidden bg-charcoal-soft`}
      >
        <motion.div style={{ scale, y }} className="h-full w-full">
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
