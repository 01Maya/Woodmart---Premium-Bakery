'use client'

import Image from 'next/image'
import { useInView } from '@/hooks/useInView'
import { useRef, type MouseEvent } from 'react'

export function Hero() {
  const { ref, isInView } = useInView()

  const muffinRef = useRef<HTMLDivElement>(null)

const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
  const element = muffinRef.current
  if (!element) return

  const rect = element.getBoundingClientRect()

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const percentX = (x - centerX) / centerX
  const percentY = (y - centerY) / centerY

  const rotateY = percentX * 16
  const rotateX = percentY * -16

  element.style.transform = `
    perspective(1200px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateZ(14px)
    scale(1.05)
  `
}

const handleMouseLeave = () => {
  const element = muffinRef.current

  if (!element) return

  element.style.transform = `
    perspective(1200px)
    rotateX(0deg)
    rotateY(0deg)
    translateZ(0)
    scale(1)
  `
}
  // Floating dessert items positioned around the hero
  const floatingItems = [
    { emoji: '🍑', top: '15%', left: '12%', delay: '0s', duration: '6s', size: 'text-3xl sm:text-4xl' },
    { emoji: '🧁', top: '20%', right: '8%', delay: '1s', duration: '7s', size: 'text-2xl sm:text-3xl' },
    { emoji: '🥐', top: '35%', left: '5%', delay: '0.5s', duration: '8s', size: 'text-xl sm:text-2xl' },
    { emoji: '🍓', top: '55%', right: '10%', delay: '1.5s', duration: '6.5s', size: 'text-lg sm:text-xl' },
    { emoji: '🍰', top: '25%', left: '25%', delay: '2s', duration: '7.5s', size: 'text-2xl sm:text-3xl' },
    { emoji: '🧁', top: '60%', left: '15%', delay: '0.8s', duration: '6.8s', size: 'text-2xl sm:text-2xl' },
    { emoji: '🥐', top: '40%', right: '20%', delay: '1.2s', duration: '7.2s', size: 'text-lg sm:text-xl' },
    { emoji: '🍓', top: '10%', left: '60%', delay: '0.3s', duration: '6.3s', size: 'text-lg' },
  ]

  return (
    <section
      ref={ref}
      id="home"
      className="relative w-full py-20 sm:py-32 md:py-40 overflow-hidden"
      style={{ backgroundColor: '#DCEFFF' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/d hero.png"
          alt="Hero background"
          fill
          className="object-cover opacity-80"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#DCEFFF]/50 to-[#DCEFFF]/80" />
      </div>

      {/* Floating dessert items background with fun animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
        {floatingItems.map((item, idx) => (
          <div
            key={idx}
            className={`absolute ${item.size} animate-float opacity-60 sm:opacity-70 transition-all duration-300 hover-scale-up`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              animationDuration: item.duration,
              animationDelay: item.delay,
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Content - Centered on top of floating items */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
        {/* Main Heading - Bounce in scale animation */}
<div
  className={`relative flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 mb-6 transition-all duration-1200 ${
    isInView
      ? 'opacity-100 scale-100 translate-y-0 animate-bounce-in-scale'
      : 'opacity-0 scale-75 translate-y-10'
  }`}
>
  <h1 className="text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight text-white drop-shadow-lg whitespace-nowrap">
    ALMOND
  </h1>

  {/* Floating Muffin */}
<div
  style={{ perspective: '1200px' }}
  className="relative -mx-10 lg:-mx-16 z-20"
>
  <div
    ref={muffinRef}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    className="
      relative
      w-40 h-40
      sm:w-56 sm:h-56
      md:w-72 md:h-72
      lg:w-[22rem] lg:h-[22rem]
      xl:w-[26rem] xl:h-[26rem]
      cursor-pointer
      will-change-transform
      transition-transform
      duration-200
      ease-out
    "
    style={{
      transformStyle: 'preserve-3d',
    }}
  >
    <Image
      src="/m.png"
      alt="Macaron"
      fill
      priority
      draggable={false}
      className="
        object-contain
        pointer-events-none
        select-none
        drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]
      "
    />

    {/* Glow */}
    <div
      className="
        absolute
        inset-10
        -z-10
        rounded-full
        bg-pink-300/30
        blur-3xl
        opacity-0
        transition-all
        duration-500
        group-hover:opacity-100
      "
    />
  </div>
</div>

  <h1 className="text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight text-white drop-shadow-lg whitespace-nowrap">
    MUFFINS
  </h1>
</div>
        
        {/* Subtitle - Shine animation with delay */}
        <p className={`text-sm sm:text-base md:text-lg text-white drop-shadow-md max-w-2xl transition-all duration-1200 transform ${
          isInView ? 'opacity-100 translate-y-0 animate-shine' : 'opacity-0 translate-y-5'
        }`} style={{ transitionDelay: isInView ? '300ms' : '0ms' }}>
          Premium Bakery & Pastries
        </p>
        
        {/* Decorative animated arrow */}
<div
  className={`mt-8 sm:mt-12 transition-all duration-1000 transform ${
    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
  }`}
  style={{ transitionDelay: isInView ? '600ms' : '0ms' }}
>
  <a
    href="#shop"
    className="animate-bounce-up text-2xl cursor-pointer inline-block"
  >
    ↓
  </a>
</div>
      </div>

      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path d="M0,40 Q360,0 720,40 T1440,40 L1440,120 L0,120 Z" fill="white" />
          <path d="M0,60 Q360,20 720,60 T1440,60 L1440,120 L0,120 Z" fill="white" opacity="0.5" />
        </svg>
      </div>
    </section>
  )
}
