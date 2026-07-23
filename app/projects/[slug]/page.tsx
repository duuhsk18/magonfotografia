'use client';

import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/projects';
import { useParams } from 'next/navigation';
import { Footer } from '@/components/Footer';

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;

  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!project) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Projeto não encontrado</h1>
          <Link href="/" className="text-foreground/60 hover:text-foreground transition-colors">
            Voltar para home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 bg-background/80 backdrop-blur-sm">
        <Link href="/" className="text-sm tracking-widest text-foreground/70 hover:text-foreground transition-colors">
          ← VOLTAR
        </Link>
        <Link href="/" className="text-2xl font-bold tracking-tight text-foreground">
          MAGON
        </Link>
        <div className="w-20" />
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-screen pt-20">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Project Details */}
      <section className="w-full py-16 md:py-24 px-6 md:px-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-16">
            <div>
              <p className="text-xs tracking-widest text-foreground/50 font-medium mb-2">
                CATEGORIA
              </p>
              <p className="text-lg text-foreground">{project.category}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-foreground/50 font-medium mb-2">
                LOCALIZAÇÃO
              </p>
              <p className="text-lg text-foreground">{project.city}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-foreground/50 font-medium mb-2">
                ANO
              </p>
              <p className="text-lg text-foreground">{project.year}</p>
            </div>
          </div>

          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {project.credits && (
            <div className="border-t border-foreground/10 pt-8">
              <p className="text-sm tracking-widest text-foreground/50 font-medium mb-2">
                CRÉDITOS
              </p>
              <p className="text-foreground">{project.credits}</p>
            </div>
          )}
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="w-full py-16 md:py-24 px-6 md:px-12 bg-foreground text-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-sm tracking-widest text-background/60 font-medium mb-4">
              PRÓXIMO PROJETO
            </p>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group inline-block"
            >
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight group-hover:text-background/80 transition-colors">
                {nextProject.title}
              </h2>
            </Link>
          </div>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="inline-block px-8 py-3 border-2 border-background text-background font-semibold tracking-widest text-sm hover:bg-background/10 transition-all duration-300"
          >
            VER PROJETO
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
