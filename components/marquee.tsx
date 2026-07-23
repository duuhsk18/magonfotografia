"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from "framer-motion";

const ITEMS = [
  "Fotografia",
  "Filmes",
  "Eventos",
  "Marcas",
  "Retratos",
  "Cultura",
  "Direção Visual",
];

export function Marquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionRef = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionRef.current * 3 * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) directionRef.current = -1;
    else if (factor > 0) directionRef.current = 1;
    moveBy += directionRef.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section className="relative w-full overflow-hidden border-y border-border bg-charcoal py-8 md:py-12">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {ITEMS.map((item) => (
              <span key={item} className="flex items-center">
                <span className="font-display text-[7vw] text-cream md:text-[4.5vw]">
                  {item}
                </span>
                <span className="mx-6 text-[4vw] text-espresso-soft md:mx-10 md:text-[2.5vw]">
                  —
                </span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
