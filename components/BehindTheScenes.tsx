'use client';

import Image from 'next/image';

const behindTheScenes = [
  {
    id: 1,
    image: '/behind-scenes-1.png',
    alt: 'Behind the scenes 1',
  },
  {
    id: 2,
    image: '/behind-scenes-2.png',
    alt: 'Behind the scenes 2',
  },
];

export function BehindTheScenes() {
  return (
    <section className="w-full py-20 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16">
          Directed by Magon
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {behindTheScenes.map((item) => (
            <div key={item.id} className="relative aspect-square overflow-hidden">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <p className="text-lg text-foreground/70 mt-16 max-w-2xl">
          A criatividade não é um trabalho solitário. É colaboração, entusiasmo, expertise reunidos em torno de uma visão. Esse é o nosso estúdio.
        </p>
      </div>
    </section>
  );
}
