"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface MediaFrameProps {
  poster: string;
  videoSrc?: string;
  alt: string;
  placeholder?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
}

/**
 * Renders the primary media for a section. When a real video file is supplied
 * it autoplays/pauses based on viewport visibility. When only a poster image is
 * available it renders the image and — if `placeholder` is set — marks the frame
 * as temporary media so real footage can be dropped in later.
 */
export function MediaFrame({
  poster,
  videoSrc,
  alt,
  placeholder = false,
  priority = false,
  className = "",
  sizes = "100vw",
  objectFit = "cover",
  objectPosition = "center center",
}: MediaFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-charcoal-soft ${className}`}>
      {videoSrc ? (
        <video
          ref={videoRef}
          className={`h-full w-full ${objectFit === "contain" ? "object-contain" : "object-cover"}`}
          style={{ objectPosition }}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={poster || "/placeholder.svg"}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={objectFit === "contain" ? "object-contain" : "object-cover"}
          style={{ objectPosition }}
        />
      )}

      {placeholder && !videoSrc ? (
        <span className="micro-label absolute bottom-4 left-4 z-10 border border-cream/30 bg-charcoal/60 px-2.5 py-1.5 text-cream/70 backdrop-blur-sm">
          Mídia temporária · substituir por vídeo
        </span>
      ) : null}
    </div>
  );
}
