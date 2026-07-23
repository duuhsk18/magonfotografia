'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="group cursor-pointer h-full hover:translate-y-[-4px] transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-foreground/5 mb-4">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white font-semibold tracking-widest text-xs">
              VER PROJETO
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs tracking-widest text-foreground/50 font-medium group-hover:text-foreground/70 transition-colors">
            {project.category}
          </p>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight group-hover:text-foreground/80 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-foreground/60">
            {project.city}, {project.year}
          </p>
          <p className="text-sm text-foreground/70 pt-2 line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
