"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { projects, type Project } from "@/lib/projects";
import { MediaFrame } from "@/components/media-frame";

export function FeaturedWorks() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.22], reduce ? ["0%", "0%"] : ["28%", "0%"]);
  const headingClip = useTransform(scrollYProgress, [0.02, 0.18], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]);

  return (
    <section ref={ref} id="trabalhos" className="relative w-full bg-charcoal">
      <div className="sticky top-0 z-10 pointer-events-none px-6 pb-8 pt-[12vh] md:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <motion.h2
            style={{ y: headingY, clipPath: headingClip }}
            className="font-display text-[13vw] leading-none text-cream md:text-[8vw]"
          >
            Trabalhos
            <br />
            Selecionados
          </motion.h2>
          <motion.p
            style={{ opacity: scrollYProgress }}
            className="micro-label max-w-xs text-muted-foreground md:text-right"
          >
            Quatro projetos em destaque · Fotografia, direção e movimento
          </motion.p>
        </div>
      </div>

      <div className="relative -mt-[10vh]">
        {projects.map((project, i) => (
          <ProjectPanel key={project.id} project={project} position={i} />
        ))}
      </div>
    </section>
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
    [0, 0.28, 0.76, 1],
    reduce
      ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(24% 18% 22% 18%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(18% 10% 20% 10%)"],
  );
  const mediaScale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.22, 1, 1.16]);
  const mediaY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "7%"]);
  const titleY = useTransform(scrollYProgress, [0, 0.44, 1], reduce ? ["0%", "0%", "0%"] : ["58%", "0%", "-28%"]);
  const metaY = useTransform(scrollYProgress, [0.1, 0.48, 1], reduce ? ["0%", "0%", "0%"] : ["90%", "0%", "30%"]);
  const panelScale = useTransform(scrollYProgress, [0.66, 1], reduce ? [1, 1] : [1, 0.9]);
  const panelOpacity = useTransform(scrollYProgress, [0.72, 1], [1, 0.22]);
  const indexOpacity = useTransform(scrollYProgress, [0.15, 0.36, 0.86], [0, 1, 0.28]);
  const curtainY = useTransform(scrollYProgress, [0, 0.18, 0.86, 1], reduce ? ["100%", "100%", "100%", "100%"] : ["0%", "100%", "100%", "0%"]);

  const titleSide = position % 2 === 0 ? "md:items-end md:text-right" : "md:items-start md:text-left";
  const mediaWidth = position % 2 === 0 ? "md:w-[82vw]" : "md:w-[72vw]";
  const mediaX = position % 2 === 0 ? "md:ml-auto" : "md:mr-auto";

  return (
    <div ref={ref} className="relative h-[150vh]">
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
          {/* Media with editorial cut reveal */}
          <motion.div style={{ clipPath: clip }} className="media-grain absolute inset-0">
            <motion.div style={{ scale: mediaScale, y: mediaY }} className="h-full w-full">
              <MediaFrame
                poster={project.media}
                alt={`${project.title} — ${project.category}`}
                placeholder={project.videoPlaceholder}
                sizes="(max-width: 768px) 100vw, 1400px"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-charcoal/45" />
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="absolute inset-0 z-20 bg-cream mix-blend-difference"
            style={{ y: curtainY }}
          />

          {/* Index number */}
          <motion.div style={{ opacity: indexOpacity }} className="absolute left-5 top-5 z-10 md:left-8 md:top-8">
            <span className="font-display text-3xl text-cream/80 md:text-5xl">
              {project.index}
            </span>
          </motion.div>

          {/* Title + meta */}
          <div
            className={`absolute inset-0 z-10 flex flex-col justify-end p-5 ${titleSide} md:p-10`}
          >
            <div className="max-w-[92%] overflow-hidden">
              <motion.h3
                style={{ y: titleY }}
                className="font-display text-[13vw] leading-[0.85] text-warm-white transition-transform duration-500 group-hover:-translate-y-1 md:text-[7vw]"
              >
                {project.title}
              </motion.h3>
            </div>
            <motion.div
              style={{ y: metaY }}
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
