"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const STEPS = [
  {
    label: "Filmagem · Eventos ao vivo",
    src: "/portfolio/full/cobertura-eventos-rave/003-mg-3648.webp",
    description: "Câmera dentro do acontecimento. Registro de perto, sem ensaio, sem segunda chance.",
  },
  {
    label: "Técnica · Longa exposição",
    src: "/portfolio/full/cidade-em-foco/005-eduardo-0270.webp",
    description: "Imagem feita na estação com controle de tempo, luz e movimento. Técnica aplicada para transformar o lugar em sensação.",
  },
  {
    label: "Empresas · Cobertura automotiva",
    src: "/portfolio/full/cobertura-eventos-automobilisticos-carros-exposicoes-expocar-expor-com-logo/055-mg-2168-aprimorado-nr.webp",
    description: "Produto, detalhe e atmosfera da marca. Cada quadro comunica identidade para quem ainda não conhece.",
  },
  {
    label: "Workshop · Bastidores de processo",
    src: "/portfolio/full/cobertura-eventos-workshop-joseph-pura-arte-tatto/035-mg-4998.webp",
    description: "O processo criativo de outros artistas registrado com a mesma intenção que o resultado final.",
  },
  {
    label: "Retratos · Direção de presença",
    src: "/portfolio/full/retratos-livia-lima-estacao/004-mg-8884.webp",
    description: "Direção de luz e gesto. A pessoa não posa — existe no quadro.",
  },
  {
    label: "Noite · Atmosfera e público",
    src: "/portfolio/full/cobertura-eventos-rave/008-mg-9235.webp",
    description: "Luz baixa, energia alta. Registro que mantém o impacto mesmo fora do momento.",
  },
];

export function DirectedBy() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["10%", "-14%"]);
  const titleScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], reduce ? [1, 1, 1] : [0.96, 1, 0.92]);

  return (
    <section ref={ref} className="relative w-full bg-charcoal py-[14vh]">
      <div className="grid grid-cols-1 gap-y-16 px-6 md:grid-cols-12 md:gap-x-8 md:px-12">
        {/* Sticky editorial column */}
        <div className="md:col-span-5">
          <motion.div style={{ y: textY, scale: titleScale }} className="origin-left md:sticky md:top-[16vh]">
            <p className="micro-label mb-8 text-muted-foreground">[ Direção criativa ]</p>
            <h2 className="font-display text-[13vw] leading-[0.85] text-cream md:text-[6vw]">
              Directed
              <br />
              by Magon
            </h2>
            <div className="mt-10 space-y-6 max-w-md">
              <p className="font-serif text-2xl italic leading-snug text-cream/75 md:text-3xl">
                Filmagem, direção de fotografia, cobertura para marcas e eventos. Direção que conecta câmera ao que importa.
              </p>
              <p className="text-lg leading-relaxed text-cream/55">
                Cada produção começa pela intenção: o que esse registro precisa comunicar. Do plano aberto ao retrato de perto — o enquadramento serve a história, não ao equipamento.
              </p>
              <p className="text-lg leading-relaxed text-cream/55">
                Cobrimos desde a preparação do palco até a entrega de galeria. Empresa, evento ou projeto pessoal — a direção criativa é a mesma: presente, intencional e construída para ser lembrada.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Image column — diversity of work */}
        <div className="editorial-mask-soft flex flex-col gap-[8vh] md:col-span-7 md:pt-[8vh]">
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
  step: { label: string; src: string; description: string };
  offset: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.55, 1], reduce ? [1, 1, 1] : [1.12, 1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "5%"]);
  const clip = useTransform(
    scrollYProgress,
    [0, 0.32, 0.82, 1],
    reduce
      ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(28% 6% 24% 6%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(18% 0% 18% 0%)"],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.88, 1], [0.3, 1, 1, 0.4]);

  const shift = offset % 2 === 0 ? "md:-ml-6 md:mr-16" : "md:ml-16 md:-mr-4";
  const ratio = offset % 3 === 0 ? "aspect-[16/10]" : offset % 3 === 1 ? "aspect-[4/5]" : "aspect-[16/9]";

  return (
    <motion.div ref={ref} style={{ opacity }} className={`relative ${shift}`}>
      <motion.div
        style={{ clipPath: clip }}
        className={`relative ${ratio} w-full overflow-hidden bg-charcoal-soft`}
      >
        <motion.div style={{ scale, y }} className="relative h-full w-full">
          <Image
            src={step.src}
            alt={`Magon — ${step.label}`}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="micro-label text-cream">
            {String(offset + 1).padStart(2, "0")} · {step.label}
          </span>
          <p className="mt-2 max-w-sm text-sm leading-snug text-cream/65">
            {step.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
