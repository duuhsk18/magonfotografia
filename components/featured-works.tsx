"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, type Project } from "@/lib/projects";
import { MediaFrame } from "@/components/media-frame";

export function FeaturedWorks() {
  return (
    <section id="trabalhos" className="relative w-full bg-charcoal">
      <div className="px-6 pb-8 pt-[16vh] md:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[13vw] leading-none text-cream md:text-[8vw]">
            Trabalhos
            <br />
            Selecionados
          </h2>
          <p className="micro-label max-w-xs text-muted-foreground md:text-right">
            Quatro projetos em destaque · Fotografia, direção e movimento
          </p>
        </div>
      </div>

      {projects.map((project, i) => (
        <ProjectPanel key={project.id} project={project} position={i} />
      ))}
    </section>
  );
}

function ProjectPanel({ project, position }: { project: Project; position: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const clip = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["inset(18% 12% 18% 12%)", "inset(0% 0% 0% 0%)"],
  );
  const mediaScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], ["30%", "0%"]);
  const metaY = useTransform(scrollYProgress, [0.1, 0.5], ["60%", "0%"]);
  const panelScale = useTransform(scrollYProgress, [0.6, 1], [1, 0.94]);
  const panelOpacity = useTransform(scrollYProgress, [0.65, 1], [1, 0.35]);

  const align = position % 2 === 0 ? "md:items-end" : "md:items-start";

  return (
    <div ref={ref} className="relative h-[135vh]">
      <motion.div
        style={{ scale: panelScale, opacity: panelOpacity }}
        className="sticky top-0 flex h-svh items-center justify-center overflow-hidden px-4 md:px-10"
      >
        <Link
          href={`/projects/${project.slug}`}
          data-cursor
          data-cursor-text="Ver projeto"
          className="group relative block h-[82svh] w-full max-w-[1400px]"
        >
          {/* Media with clip-path reveal */}
          <motion.div style={{ clipPath: clip }} className="absolute inset-0">
            <motion.div style={{ scale: mediaScale }} className="h-full w-full">
              <MediaFrame
                poster={project.media}
                alt={`${project.title} — ${project.category}`}
                placeholder={project.videoPlaceholder}
                sizes="(max-width: 768px) 100vw, 1400px"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30" />
          </motion.div>

          {/* Index number */}
          <div className="absolute left-5 top-5 z-10 md:left-8 md:top-8">
            <span className="font-display text-3xl text-cream/80 md:text-5xl">
              {project.index}
            </span>
          </div>

          {/* Title + meta */}
          <div
            className={`absolute inset-0 z-10 flex flex-col justify-end p-5 md:p-10 ${align}`}
          >
            <div className="overflow-hidden">
              <motion.h3
                style={{ y: titleY }}
                className="font-display text-[13vw] leading-[0.85] text-warm-white md:text-[7vw]"
              >
                {project.title}
              </motion.h3>
            </div>
            <motion.div
              style={{ y: metaY }}
              className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2"
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
