"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { services } from "@/lib/projects";

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const [openMobile, setOpenMobile] = useState<number | null>(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section id="servicos" className="relative w-full bg-charcoal-soft py-[14vh]">
      <div className="px-6 md:px-12">
        <p className="micro-label mb-12 text-muted-foreground">[ O que fazemos ]</p>

        {/* Desktop: interactive typographic list */}
        <div
          ref={containerRef}
          onMouseMove={handleMove}
          onMouseLeave={() => setActive(null)}
          className="relative hidden md:block"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              onMouseEnter={() => setActive(i)}
              animate={{
                opacity: active === null || active === i ? 1 : 0.25,
                x: active === i ? 32 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-baseline justify-between border-b border-border py-6"
            >
              <div className="flex items-baseline gap-6">
                <span className="micro-label text-muted-foreground">
                  0{i + 1}
                </span>
                <h3 className="font-display text-[6vw] leading-none text-cream lg:text-[4.5vw]">
                  {service.title}
                </h3>
              </div>
              <AnimatePresence>
                {active === i && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="max-w-xs font-serif text-xl italic text-cream/70"
                  >
                    {service.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Floating media preview follows the cursor */}
          <AnimatePresence>
            {active !== null && (
              <motion.div
                className="pointer-events-none absolute z-20 h-64 w-48 overflow-hidden"
                style={{ x, y, top: 0, left: 0, translateX: "-50%", translateY: "-50%" }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={services[active].media || "/placeholder.svg"}
                  alt={services[active].title}
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden">
          {services.map((service, i) => (
            <div key={service.id} className="border-b border-border">
              <button
                onClick={() => setOpenMobile(openMobile === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left"
                aria-expanded={openMobile === i}
              >
                <h3 className="font-display text-[10vw] leading-none text-cream">
                  {service.title}
                </h3>
                <span className="micro-label text-muted-foreground">
                  {openMobile === i ? "—" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openMobile === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6">
                      <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={service.media || "/placeholder.svg"}
                          alt={service.title}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                      <p className="font-serif text-lg italic text-cream/70">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
