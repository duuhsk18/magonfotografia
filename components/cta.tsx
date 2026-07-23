"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WHATSAPP = "https://wa.me/5516999999999?text=Ol%C3%A1%2C%20quero%20iniciar%20um%20projeto%20com%20a%20Magon";
const EMAIL = "mailto:contato@magon.com.br";

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section
      ref={ref}
      id="contato"
      className="relative flex min-h-svh w-full flex-col justify-center overflow-hidden bg-charcoal px-6 py-[16vh] md:px-12"
    >
      <motion.div style={{ y }}>
        <h2 className="font-display text-[18vw] leading-[0.82] text-warm-white md:text-[13vw]">
          Tem algo
          <br />
          <span className="text-outline">acontecendo?</span>
        </h2>

        <p className="mt-8 max-w-lg font-serif text-2xl italic text-cream/70 md:text-4xl">
          Vamos fazer isso ser visto.
        </p>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <MagneticLink href={WHATSAPP} text="Iniciar um projeto" primary />
          <MagneticLink href={WHATSAPP} text="Falar pelo WhatsApp" />
          <MagneticLink href={EMAIL} text="Enviar e-mail" />
        </div>
      </motion.div>
    </section>
  );
}

function MagneticLink({
  href,
  text,
  primary = false,
}: {
  href: string;
  text: string;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      data-cursor
      data-cursor-text={text}
      className={`group inline-flex items-center gap-3 px-8 py-5 text-base font-medium tracking-wide transition-colors duration-300 will-change-transform ${
        primary
          ? "bg-cream text-charcoal hover:bg-warm-white"
          : "border border-border text-cream hover:border-cream"
      }`}
    >
      <span>{text}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}
