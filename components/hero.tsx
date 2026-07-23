"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BrandMark } from "@/components/brand-mark";
import { MediaFrame } from "@/components/media-frame";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mediaScale = useTransform(scrollYProgress, [0, 0.55, 1], reduce ? [1, 1, 1] : [1.04, 1.18, 1.32]);
  const mediaY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const mediaClip = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    reduce
      ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 10% 14% 10%)"],
  );
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.72, 0.92]);

  const titleY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-76%"]);
  const titleScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.88]);
  const cornerY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-150%"]);
  const bottomY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "58%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const cutOpacity = useTransform(scrollYProgress, [0.42, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-[145svh] w-full bg-charcoal">
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* Media layer */}
        <motion.div
          className="media-grain absolute inset-0"
          style={{ scale: mediaScale, y: mediaY, clipPath: mediaClip }}
        >
          <MediaFrame
            poster="/portfolio/full/cobertura-eventos-rave/003-mg-3648.webp"
            alt="Cena cinematográfica de show ao vivo captada pela Magon"
            priority
            sizes="100vw"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-charcoal"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(246,241,230,0.10),transparent_32%),linear-gradient(to_bottom,rgba(11,10,9,0.25),transparent_38%,#0b0a09_96%)]" />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[34vh] w-full origin-bottom bg-cream"
          style={{ opacity: cutOpacity, scaleY: cutOpacity }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 flex h-full flex-col justify-between px-6 py-24 md:px-12 md:py-12"
          style={{ opacity: contentOpacity }}
        >
          {/* Top left */}
          <motion.div style={{ y: cornerY }} className="flex items-start justify-between gap-6">
            <div>
              <p className="micro-label text-cream">MAGON</p>
              <p className="micro-label mt-1 text-cream/60">Fotografia & Audiovisual</p>
            </div>
            <BrandMark priority className="hidden h-12 w-auto opacity-75 md:block" />
          </motion.div>

          {/* Main title */}
          <motion.div style={{ y: titleY, scale: titleScale }} className="max-w-[92%] origin-left">
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
                animate={reduce ? undefined : { y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Scroll to explore
              </motion.span>
              <span className="h-8 w-px bg-cream/40" />
            </div>
          </motion.div>
        </motion.div>
      </div>
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
  const reduce = useReducedMotion();

  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "110%" }}
        animate={reduce ? undefined : { y: "0%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.6 + delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
