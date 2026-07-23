"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const WORDS = [
  "Não", "registramos", "apenas", "o", "que", "aconteceu.",
  "Construímos", "a", "maneira", "como", "será", "lembrado.",
];

// Words rendered as outline for editorial contrast.
const OUTLINE = new Set(["registramos", "lembrado."]);

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const background = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], ["#0b0a09", "#e5ddca", "#e5ddca", "#0b0a09"]);
  const rotate = useTransform(scrollYProgress, [0.08, 0.5, 0.92], reduce ? [0, 0, 0] : [-1.3, 0, 1.2]);
  const scale = useTransform(scrollYProgress, [0.08, 0.5, 0.92], reduce ? [1, 1, 1] : [0.92, 1, 0.9]);
  const labelX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "18%"]);

  return (
    <motion.section ref={ref} className="relative h-[230svh] w-full" style={{ backgroundColor: background }}>
      <div className="sticky top-0 flex min-h-svh items-center overflow-hidden px-6 md:px-12">
        <motion.div
          aria-hidden="true"
          className="absolute left-6 top-[14vh] h-px w-[42vw] bg-charcoal/25 md:left-12"
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        />
        <motion.div style={{ rotate, scale }} className="mx-auto max-w-6xl origin-center">
          <motion.p style={{ x: labelX }} className="micro-label mb-10 text-charcoal/60">
            [ Manifesto ]
          </motion.p>
          <p className="font-display text-[10vw] leading-[0.95] text-charcoal md:text-[7vw]">
            {WORDS.map((word, i) => (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[0.12 + i / (WORDS.length * 1.32), 0.2 + (i + 1.5) / (WORDS.length * 1.32)]}
                outline={OUTLINE.has(word)}
              >
                {word}
              </Word>
            ))}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Word({
  children,
  progress,
  range,
  outline,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  outline: boolean;
}) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, range, [0.08, 1]);
  const y = useTransform(progress, range, reduce ? [0, 0] : [36, 0]);
  const blur = useTransform(progress, range, reduce ? ["0px", "0px"] : ["8px", "0px"]);

  return (
    <span className="mr-[0.25em] inline-block overflow-hidden align-bottom">
      <motion.span
        className={`inline-block ${outline ? "text-transparent [-webkit-text-stroke:1px_#0b0a09] md:[-webkit-text-stroke:1.5px_#0b0a09]" : "text-charcoal"}`}
        style={{ opacity, y, filter: blur }}
      >
        {children}
      </motion.span>
    </span>
  );
}
