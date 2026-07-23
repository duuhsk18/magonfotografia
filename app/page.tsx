import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { ProjectGrid } from '@/components/ProjectGrid';
import { Manifesto } from '@/components/Manifesto';
import { Services } from '@/components/Services';
import { BehindTheScenes } from '@/components/BehindTheScenes';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <main className="w-full">
      <Navigation />
      <Hero />
      <ProjectGrid />
      <Manifesto />
      <Services />
      <BehindTheScenes />
      <Contact />
      <Footer />
    </main>
  );
}
