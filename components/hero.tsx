"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MediaFrame } from "@/components/media-frame";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const cornerY = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]);
  const bottomY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-svh w-full overflow-hidden">
      {/* Media layer */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: mediaScale, y: mediaY }}
      >
        <MediaFrame
          poster="/media/hero-poster.png"
          alt="Cena cinematográfica de show ao vivo captada pela Magon"
          priority
          placeholder
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-charcoal"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-between px-6 py-24 md:px-12 md:py-12"
        style={{ opacity: contentOpacity }}
      >
        {/* Top left */}
        <motion.div style={{ y: cornerY }}>
          <p className="micro-label text-cream">MAGON</p>
          <p className="micro-label mt-1 text-cream/60">Fotografia & Audiovisual</p>
        </motion.div>

        {/* Main title */}
        <motion.div style={{ y: titleY }} className="max-w-[92%]">
          <h1 className="font-display text-[15vw] text-warm-white md:text-[11vw] lg:text-[10vw]">
            <RevealLine delay={0}>Imagens para</RevealLine>
            <RevealLine delay={0.08}>viver agora.</RevealLine>
            <RevealLine delay={0.16}>
              <span className="text-outline">Lembrar depois.</span>
            </RevealLine>
          </h1>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          style={{ y: bottomY }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-1">
            <p className="micro-label text-cream">São Carlos — SP</p>
            <p className="micro-label text-cream/50">Available for selected projects</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.span
              className="micro-label text-cream/70"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Scroll to explore
            </motion.span>
            <span className="h-8 w-px bg-cream/40" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function RevealLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.6 + delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
