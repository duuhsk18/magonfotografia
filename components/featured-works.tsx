"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { projects, type Project } from "@/lib/projects";
import { MediaFrame } from "@/components/media-frame";

export function FeaturedWorks() {
  return (
    <section id="trabalhos" className="relative w-full bg-charcoal">
      <WorksIntro />

      <div className="relative">
        {projects.map((project, i) => (
          <ProjectPanel key={project.id} project={project} position={i} />
        ))}
      </div>
    </section>
  );
}

function WorksIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.45, 1], reduce ? ["0%", "0%", "0%"] : ["18%", "0%", "-18%"]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0, 1, 1, 0]);
  const labelX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["10%", "-6%"]);

  return (
    <div ref={ref} className="relative flex min-h-[92svh] items-end overflow-hidden px-6 pb-[12vh] pt-[16vh] md:px-12">
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-6 bottom-[10vh] h-px origin-left bg-cream/20 md:inset-x-12"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="relative z-10 flex w-full flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <motion.h2
          style={{ y: headingY, opacity: headingOpacity }}
          className="font-display text-[18vw] leading-[0.78] text-cream md:text-[9vw]"
        >
          Trabalhos
          <br />
          Selecionados
        </motion.h2>
        <motion.p
          style={{ x: labelX, opacity: headingOpacity }}
          className="micro-label max-w-xs text-muted-foreground md:mb-3 md:text-right"
        >
          Quatro projetos em destaque · Fotografia, direção e movimento
        </motion.p>
      </div>
    </div>
  );
}

function ProjectPanel({ project, position }: { project: Project; position: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const clip = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    reduce
      ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(20% 12% 20% 12%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(12% 8% 16% 8%)"],
  );
  const mediaScale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.12, 1, 1.08]);
  const mediaY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-3%", "4%"]);
  const titleY = useTransform(scrollYProgress, [0, 0.28, 0.82, 1], reduce ? ["0%", "0%", "0%", "0%"] : ["24%", "0%", "0%", "16%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.18, 0.84, 1], [0, 1, 1, 0]);
  const metaY = useTransform(scrollYProgress, [0, 0.35, 0.86, 1], reduce ? ["0%", "0%", "0%", "0%"] : ["30%", "0%", "0%", "18%"]);
  const metaOpacity = useTransform(scrollYProgress, [0.08, 0.28, 0.82, 1], [0, 1, 1, 0]);
  const panelScale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.96, 1, 0.96]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [0.5, 1, 1, 0.45]);
  const indexOpacity = useTransform(scrollYProgress, [0.12, 0.3, 0.86], [0, 1, 0.45]);

  const titleSide = position % 2 === 0 ? "md:items-end md:text-right" : "md:items-start md:text-left";
  const mediaWidth = position % 2 === 0 ? "md:w-[84vw]" : "md:w-[74vw]";
  const mediaX = position % 2 === 0 ? "md:ml-auto" : "md:mr-auto";

  return (
    <div ref={ref} className="relative h-[128vh]">
      <motion.div
        style={{ scale: panelScale, opacity: panelOpacity }}
        className="sticky top-0 flex h-svh items-center justify-center overflow-hidden px-4 md:px-10"
      >
        <Link
          href={`/projects/${project.slug}`}
          data-cursor
          data-cursor-text="Ver projeto"
          className={`focus-ring group relative block h-[78svh] w-full ${mediaWidth} ${mediaX}`}
        >
          <motion.div style={{ clipPath: clip }} className="media-grain absolute inset-0">
            <motion.div style={{ scale: mediaScale, y: mediaY }} className="h-full w-full">
              <MediaFrame
                poster={project.media}
                alt={`${project.title} — ${project.category}`}
                placeholder={project.videoPlaceholder}
                sizes="(max-width: 768px) 100vw, 1400px"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/88 via-charcoal/10 to-charcoal/35" />
          </motion.div>

          <motion.div style={{ opacity: indexOpacity }} className="absolute left-5 top-5 z-10 md:left-8 md:top-8">
            <span className="font-display text-3xl text-cream/80 md:text-5xl">
              {project.index}
            </span>
          </motion.div>

          <div
            className={`absolute inset-0 z-10 flex flex-col justify-end p-5 ${titleSide} md:p-10`}
          >
            <div className="max-w-[92%] overflow-hidden pb-1">
              <motion.h3
                style={{ y: titleY, opacity: titleOpacity }}
                className="font-display text-[13vw] leading-[0.85] text-warm-white transition-transform duration-500 group-hover:-translate-y-1 md:text-[7vw]"
              >
                {project.title}
              </motion.h3>
            </div>
            <motion.div
              style={{ y: metaY, opacity: metaOpacity }}
              className={`mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 ${position % 2 === 0 ? "md:justify-end" : ""}`}
            >
              <span className="micro-label text-cream">{project.category}</span>
              <span className="micro-label text-cream/60">{project.city}</span>
              <span className="micro-label text-cream/60">{project.year}</span>
            </motion.div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
