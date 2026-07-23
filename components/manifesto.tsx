"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const LINES = [
  {
    text: "Não registramos apenas o que aconteceu.",
    emphasis: "registramos",
  },
  {
    text: "Construímos a maneira como será lembrado.",
    emphasis: "lembrado.",
  },
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const background = useTransform(
    scrollYProgress,
    [0, 0.16, 0.82, 1],
    ["#0b0a09", "#e5ddca", "#e5ddca", "#0b0a09"],
  );
  const labelOpacity = useTransform(scrollYProgress, [0.08, 0.22, 0.75, 0.92], [0, 1, 1, 0]);
  const labelY = useTransform(scrollYProgress, [0.08, 0.22, 0.9], reduce ? [0, 0, 0] : [24, 0, -18]);
  const blockY = useTransform(scrollYProgress, [0, 0.34, 0.78, 1], reduce ? ["0%", "0%", "0%", "0%"] : ["14%", "0%", "0%", "-16%"]);
  const blockScale = useTransform(scrollYProgress, [0, 0.34, 0.78, 1], reduce ? [1, 1, 1, 1] : [0.94, 1, 1, 0.96]);
  const ruleScale = useTransform(scrollYProgress, [0.12, 0.72], [0, 1]);
  const exitVeil = useTransform(scrollYProgress, [0.82, 1], [0, 1]);

  return (
    <motion.section
      ref={ref}
      className="relative h-[190svh] w-full overflow-clip"
      style={{ backgroundColor: background }}
    >
      <div className="sticky top-0 flex min-h-svh items-center px-6 py-[14vh] md:px-12">
        <motion.div
          aria-hidden="true"
          className="absolute left-6 top-[14vh] h-px w-[42vw] origin-left bg-charcoal/25 md:left-12"
          style={{ scaleX: ruleScale }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[34vh] origin-bottom bg-charcoal"
          style={{ opacity: exitVeil, scaleY: exitVeil }}
        />

        <motion.div
          style={{ y: blockY, scale: blockScale }}
          className="relative z-10 mx-auto w-full max-w-6xl origin-center"
        >
          <motion.p
            style={{ opacity: labelOpacity, y: labelY }}
            className="micro-label mb-10 text-charcoal/60"
          >
            [ Manifesto ]
          </motion.p>

          <div className="space-y-[0.18em] font-display text-[11.5vw] leading-[0.88] text-charcoal md:text-[6.7vw]">
            {LINES.map((line, index) => (
              <ManifestoLine
                key={line.text}
                text={line.text}
                emphasis={line.emphasis}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function ManifestoLine({
  text,
  emphasis,
  index,
  progress,
}: {
  text: string;
  emphasis: string;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const reduce = useReducedMotion();
  const start = 0.16 + index * 0.16;
  const end = start + 0.22;
  const exitStart = 0.72 + index * 0.06;

  const y = useTransform(progress, [start, end, exitStart, 1], reduce ? [0, 0, 0, 0] : [72, 0, 0, -42]);
  const opacity = useTransform(progress, [start - 0.06, start, end, exitStart, 1], [0, 0, 1, 1, 0]);
  const clipPath = useTransform(
    progress,
    [start, end, exitStart, 1],
    reduce
      ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"],
  );

  const parts = text.split(emphasis);

  return (
    <div className="overflow-hidden pb-[0.08em]">
      <motion.p style={{ y, opacity, clipPath }} className={index === 1 ? "md:pl-[10vw]" : ""}>
        {parts[0]}
        <span className="text-transparent [-webkit-text-stroke:1px_#0b0a09] md:[-webkit-text-stroke:1.5px_#0b0a09]">
          {emphasis}
        </span>
        {parts[1]}
      </motion.p>
    </div>
  );
}
