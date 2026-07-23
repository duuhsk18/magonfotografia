"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { services, type Service } from "@/lib/projects";

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const reduce = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionRadius = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], reduce ? ["0px", "0px", "0px", "0px"] : ["48px", "0px", "0px", "48px"]);
  const mediaRailX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "-10%"]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.section
      ref={sectionRef}
      id="servicos"
      className="relative w-full overflow-hidden bg-charcoal-soft py-[14vh]"
      style={{ borderTopLeftRadius: sectionRadius, borderTopRightRadius: sectionRadius }}
    >
      <div className="px-6 md:px-12">
        <motion.p
          style={{ x: mediaRailX }}
          className="micro-label mb-12 text-muted-foreground"
        >
          [ O que fazemos ]
        </motion.p>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-[10vh] hidden h-[70vh] w-[34vw] opacity-30 md:block"
          style={{ x: mediaRailX }}
        >
          <div className="relative h-full w-full overflow-hidden border-l border-border">
            <Image
              src="/projects/culture-project.png"
              alt=""
              fill
              sizes="34vw"
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-charcoal/55" />
          </div>
        </motion.div>

        {/* Desktop: interactive typographic list */}
        <div
          ref={containerRef}
          onMouseMove={handleMove}
          onMouseLeave={() => setActive(null)}
          className="relative hidden max-w-[78vw] md:block"
        >
          {services.map((service, i) => (
            <ServiceRow
              key={service.id}
              service={service}
              index={i}
              active={active}
              setActive={setActive}
              progress={scrollYProgress}
            />
          ))}

          {/* Floating media preview follows the cursor */}
          <AnimatePresence>
            {active !== null && !reduce && (
              <motion.div
                className="pointer-events-none absolute z-20 h-72 w-52 overflow-hidden border border-cream/20"
                style={{ x, y, top: 0, left: 0, translateX: "-50%", translateY: "-50%" }}
                initial={{ opacity: 0, scale: 0.82, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: active % 2 === 0 ? -3 : 3 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={services[active].media || "/placeholder.svg"}
                  alt={services[active].title}
                  fill
                  sizes="208px"
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
                className="focus-ring flex w-full items-center justify-between py-5 text-left"
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
                    initial={reduce ? false : { height: 0, opacity: 0 }}
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
    </motion.section>
  );
}

function ServiceRow({
  service,
  index,
  active,
  setActive,
  progress,
}: {
  service: Service;
  index: number;
  active: number | null;
  setActive: (index: number) => void;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, [0.06 + index * 0.045, 0.18 + index * 0.045], [0, 1]);
  const x = useTransform(progress, [0.06 + index * 0.045, 0.18 + index * 0.045], reduce ? [0, 0] : [-36, 0]);

  return (
    <motion.div
      onMouseEnter={() => setActive(index)}
      style={{ opacity, x }}
      animate={{
        opacity: active === null || active === index ? 1 : 0.22,
        x: active === index ? 42 : 0,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-baseline justify-between border-b border-border py-6"
    >
      <div className="flex items-baseline gap-6">
        <span className="micro-label text-muted-foreground">
          0{index + 1}
        </span>
        <h3 className="font-display text-[6vw] leading-none text-cream lg:text-[4.5vw]">
          {service.title}
        </h3>
      </div>
      <AnimatePresence>
        {active === index && (
          <motion.p
            initial={reduce ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="max-w-xs font-serif text-xl italic text-cream/70"
          >
            {service.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
