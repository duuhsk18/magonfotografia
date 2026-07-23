"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { projects } from "@/lib/projects";
import { BrandMark } from "@/components/brand-mark";
import { MediaFrame } from "@/components/media-frame";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Footer } from "@/components/footer";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;

  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!project) {
    return (
      <main className="flex min-h-svh w-full flex-col items-center justify-center bg-charcoal px-6 text-center">
        <h1 className="font-display text-6xl text-cream">Projeto não encontrado</h1>
        <Link
          href="/"
          className="micro-label mt-6 text-muted-foreground transition-colors hover:text-cream"
        >
          ← Voltar para home
        </Link>
      </main>
    );
  }

  return (
    <>
      <SmoothScroll />
      <main className="w-full bg-charcoal">
        {/* Top bar */}
        <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
          <Link
            href="/"
            data-cursor
            data-cursor-text="Voltar"
            className="micro-label text-cream mix-blend-difference"
          >
            ← Voltar
          </Link>
          <Link
            href="/"
            className="focus-ring mix-blend-difference"
            aria-label="Magon Fotografia & Audiovisual"
          >
            <BrandMark className="h-10 w-auto opacity-90" />
          </Link>
          <span className="micro-label text-cream mix-blend-difference">
            {project.index}
          </span>
        </div>

        {/* Full-bleed hero media */}
        <section className="relative h-svh w-full overflow-hidden">
          <MediaFrame
            poster={project.media}
            alt={`${project.title} — ${project.category}`}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <h1 className="font-display text-[16vw] leading-[0.82] text-warm-white md:text-[10vw]">
              {project.title}
            </h1>
          </div>
        </section>

        {/* Meta + narrative */}
        <section className="px-6 py-[12vh] md:px-12">
          <div className="grid grid-cols-2 gap-8 border-b border-border pb-12 md:grid-cols-4">
            <Meta label="Categoria" value={project.category} />
            <Meta label="Local" value={project.city} />
            <Meta label="Ano" value={String(project.year)} />
            {project.credits ? (
              <Meta label="Créditos" value={project.credits} />
            ) : null}
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <p className="font-serif text-3xl leading-snug text-cream md:text-5xl">
              {project.fullDescription}
            </p>
          </div>
        </section>

        {/* Next project */}
        <section className="border-t border-border px-6 py-[14vh] md:px-12">
          <p className="micro-label mb-6 text-muted-foreground">
            [ Próximo projeto ]
          </p>
          <Link
            href={`/projects/${nextProject.slug}`}
            data-cursor
            data-cursor-text="Ver projeto"
            className="group block"
          >
            <span className="micro-label text-muted-foreground">
              {nextProject.index}
            </span>
            <h2 className="font-display text-[15vw] leading-[0.85] text-cream transition-colors duration-300 group-hover:text-warm-white md:text-[9vw]">
              {nextProject.title}
            </h2>
            <span className="micro-label mt-4 inline-flex items-center gap-2 text-cream">
              {nextProject.category}
              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </span>
          </Link>
        </section>

        <Footer />
      </main>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="micro-label mb-2 text-muted-foreground">{label}</p>
      <p className="text-lg text-cream">{value}</p>
    </div>
  );
}
