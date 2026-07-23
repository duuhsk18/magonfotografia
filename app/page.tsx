import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { Preloader } from "@/components/preloader";
import { Hero } from "@/components/hero";
import { PortfolioShowcase } from "@/components/portfolio-showcase";
import { Manifesto } from "@/components/manifesto";
import { FeaturedWorks } from "@/components/featured-works";
import { VisualRange } from "@/components/visual-range";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/services";
import { GalleryAccess } from "@/components/gallery-access";
import { DirectedBy } from "@/components/directed-by";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <ScrollProgress />
      <main className="w-full bg-charcoal">
        <Hero />
        <PortfolioShowcase />
        <Manifesto />
        <FeaturedWorks />
        <VisualRange />
        <Marquee />
        <Services />
        <GalleryAccess />
        <DirectedBy />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
