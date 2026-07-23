'use client';

import { projects } from '@/lib/projects';
import { ProjectCard } from './ProjectCard';

export function ProjectGrid() {
  return (
    <section id="projetos" className="w-full py-20 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Trabalhos Selecionados
          </h2>
          <div className="w-12 h-1 bg-foreground mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <div key={project.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
