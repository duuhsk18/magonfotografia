'use client'

import { useState, useEffect } from 'react'

const SLIDES = [
  '/media/hero-slide-1.jpg',
  '/media/hero-slide-2.jpg',
  '/media/hero-slide-3.jpg',
  '/media/hero-slide-4.jpg',
]

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      {SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover object-[center_30%] transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
          draggable={false}
        />
      ))}
      {/* Left-to-right gradient: opaque left (text) → transparent right (photo shows) */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal from-30% via-charcoal/80 via-50% to-transparent" />
      {/* Mobile: slightly darker overall for readability */}
      <div className="absolute inset-0 bg-charcoal/40 lg:bg-transparent" />
      {/* Top/bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-transparent to-charcoal/70" />
    </div>
  )
}
