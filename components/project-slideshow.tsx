"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import type { MediaSlide } from "@/lib/projects";

interface ProjectSlideshowProps {
  slides: MediaSlide[];
  alt: string;
  interval?: number;
  className?: string;
}

export function ProjectSlideshow({
  slides,
  alt,
  interval = 4200,
  className = "",
}: ProjectSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const reduce = useReducedMotion();
  const slide = slides[current];
  const isVideo = typeof slide !== "string" && slide?.type === "video";
  const imageSrc = typeof slide === "string" ? slide : slide?.poster ?? "";
  const isPortrait = imageSrc.includes("/retratos-");

  useEffect(() => {
    if (reduce || slides.length <= 1) return;
    const duration = isVideo ? 8000 : interval;
    const id = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, duration);
    return () => window.clearInterval(id);
  }, [reduce, slides.length, isVideo, interval]);

  if (isVideo && typeof slide !== "string") {
    return (
      <div className={`relative h-full w-full overflow-hidden bg-charcoal-soft ${className}`}>
        <video
          key={slide.src}
          src={slide.src}
          poster={slide.poster}
          autoPlay
          muted
          playsInline
          loop
          className="h-full w-full object-cover"
          aria-label={slide.alt}
        />
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden bg-charcoal-soft ${className}`}>
      <Image
        key={imageSrc}
        src={imageSrc}
        alt={alt}
        fill
        sizes="100vw"
        className={`${isPortrait ? "object-contain" : "object-cover"} transition-opacity duration-1000`}
        style={{ objectPosition: isPortrait ? "center 20%" : "center 38%" }}
      />
    </div>
  );
}
