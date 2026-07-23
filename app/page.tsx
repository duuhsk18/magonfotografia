import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { Preloader } from "@/components/preloader";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { FeaturedWorks } from "@/components/featured-works";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/services";
import { DirectedBy } from "@/components/directed-by";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />
      <main className="w-full bg-charcoal">
        <Hero />
        <Manifesto />
        <FeaturedWorks />
        <Marquee />
        <Services />
        <DirectedBy />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
