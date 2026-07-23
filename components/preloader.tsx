"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["MAGON", "FOTOGRAFIA", "VÍDEOS", "AUDIOVISUAL", "DIREÇÃO CRIATIVA"];

export function Preloader() {
  const [wordIndex, setWordIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const id = requestAnimationFrame(() => setDone(true));
      return () => cancelAnimationFrame(id);
    }

    document.body.style.overflow = "hidden";

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < WORDS.length) {
        setWordIndex(current);
      } else {
        clearInterval(interval);
        setTimeout(() => setDone(true), 400);
      }
    }, 480);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col justify-between bg-charcoal px-6 py-8 md:px-12 md:py-10"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-start justify-between">
            <span className="micro-label text-cream/60">MAGON</span>
            <span className="micro-label text-cream/60">DIREÇÃO VISUAL</span>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={WORDS[wordIndex]}
                className="absolute font-display text-[18vw] leading-none text-cream md:text-[13vw]"
                initial={{ y: "40%", opacity: 0, scale: 0.94 }}
                animate={{ y: "0%", opacity: 1, scale: 1 }}
                exit={{ y: "-30%", opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                {WORDS[wordIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="flex items-end justify-between">
            <span className="micro-label text-cream/60">FOTOGRAFIA & AUDIOVISUAL</span>
            <div className="flex gap-2">
              {WORDS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 w-6 transition-colors duration-300 ${
                    i <= wordIndex ? "bg-cream" : "bg-cream/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
