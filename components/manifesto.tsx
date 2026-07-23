"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const WORDS = [
  "Não", "registramos", "apenas", "o", "que", "aconteceu.",
  "Construímos", "a", "maneira", "como", "será", "lembrado.",
];

// Words rendered as outline for editorial contrast.
const OUTLINE = new Set(["registramos", "lembrado."]);

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  return (
    <section ref={ref} className="relative w-full bg-charcoal py-[18vh]">
      <div className="sticky top-0 flex min-h-svh items-center px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="micro-label mb-10 text-muted-foreground">
            [ Manifesto ]
          </p>
          <p className="font-display text-[10vw] leading-[0.95] text-cream md:text-[7vw]">
            {WORDS.map((word, i) => (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[i / WORDS.length, (i + 1.5) / WORDS.length]}
                outline={OUTLINE.has(word)}
              >
                {word}
              </Word>
            ))}
          </p>
        </div>
      </div>
    </section>
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
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [12, 0]);

  return (
    <span className="mr-[0.25em] inline-block">
      <motion.span
        className={`inline-block ${outline ? "text-outline" : "text-cream"}`}
        style={{ opacity, y }}
      >
        {children}
      </motion.span>
    </span>
  );
}
