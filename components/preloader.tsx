"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(100);
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1500;
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out for a weighty count
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
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
            <span className="micro-label text-cream/60">VISUAL EXPERIENCE</span>
          </div>

          <div className="flex flex-1 items-center justify-center overflow-hidden">
            <motion.h1
              className="font-display text-[22vw] leading-none text-cream md:text-[16vw]"
              initial={{ y: "40%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              MAGON
            </motion.h1>
          </div>

          <div className="flex items-end justify-between">
            <span className="micro-label text-cream/60">FOTOGRAFIA & AUDIOVISUAL</span>
            <span className="font-display text-4xl text-cream md:text-6xl">
              {String(count).padStart(2, "0")}
              <span className="text-cream/40">—100</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
