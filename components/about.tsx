'use client'

import Image from 'next/image'
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react'
import { useInView } from '@/hooks/useInView'

/* =========================================
   COUNT UP ANIMATION
========================================= */

function CountUp({
  end,
  suffix = '',
  duration = 1800,
  start = false,
}: {
  end: number
  suffix?: string
  duration?: number
  start?: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) {
      setCount(0)
      return
    }

    let animationFrame: number

    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime

      const progress = Math.min(elapsed / duration, 1)

      // Smooth ease-out
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      setCount(Math.floor(end * easedProgress))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [end, duration, start])

  return (
    <>
      {count}
      {suffix}
    </>
  )
}

/* =========================================
   ABOUT SECTION
========================================= */

export function About() {
  const { ref, isInView } = useInView()

  const imageRef = useRef<HTMLDivElement>(null)

  const stats = [
    {
      number: 200,
      suffix: '',
      label: 'Daily Customers',
    },
    {
      number: 60,
      suffix: '+',
      label: 'Flavors',
    },
    {
      number: 7,
      suffix: '+',
      label: 'Experience',
    },
    {
      number: 100,
      suffix: '',
      label: 'Reviews',
    },
  ]

  /* =========================================
     IMAGE MOUSE 3D TILT
  ========================================= */

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const element = imageRef.current

    if (!element) return

    const rect = element.getBoundingClientRect()

    // Mouse position inside image
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Image center
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Mouse position from -1 to 1
    const percentX = (mouseX - centerX) / centerX
    const percentY = (mouseY - centerY) / centerY

    // Tilt strength
    const maxRotate = 12

    const rotateY = percentX * maxRotate
    const rotateX = percentY * -maxRotate

    element.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.06)
    `
  }

  /* =========================================
     RESET IMAGE
  ========================================= */

  const handleMouseLeave = () => {
    const element = imageRef.current

    if (!element) return

    element.style.transform = `
      perspective(900px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `
  }

  return (
    <section
      ref={ref}
      id="about"
      className="bg-white px-4 py-12 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">

          {/* =====================================
              LEFT SIDE - IMAGE
          ====================================== */}

          <div
            className={`
              relative flex justify-center
              transform transition-all duration-1000
              ${
                isInView
                  ? 'opacity-100 scale-100 animate-pop-in'
                  : 'opacity-0 scale-90'
              }
            `}
          >
            {/* Perspective Container */}
            <div
              className="relative w-full max-w-xs"
              style={{
                perspective: '900px',
              }}
            >
              {/* Mouse Tilt Container */}
              <div
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="
                  relative
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
<div className="w-full flex justify-center overflow-visible">
  <Image
    src="/ad.png"
    alt="Handmade Cakes with Premium Ingredients"
    width={1200}
    height={1200}
    draggable={false}
    className="
      pointer-events-none
      w-[120%]
      lg:w-[135%]
      h-auto
      max-w-none
      select-none
      drop-shadow-2xl
    "
  />
</div>

                {/* Subtle Hover Glow */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-8
                    -z-10
                    rounded-full
                    bg-pink-300/20
                    opacity-0
                    blur-3xl
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />
              </div>
            </div>
          </div>

          {/* =====================================
              RIGHT SIDE
          ====================================== */}

          <div
            className={`
              transform transition-all duration-1000
              ${
                isInView
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-10 opacity-0'
              }
            `}
            style={{
              transitionDelay: isInView ? '200ms' : '0ms',
            }}
          >

            {/* Small Heading */}

            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#FF69B4] sm:text-sm">
              Best in Our Name
            </p>

            {/* Main Heading */}

            <h2 className="mb-4 text-2xl font-bold text-[#2B3E50] sm:text-3xl md:mb-6 md:text-4xl">
              Handmade Cakes For Your Every Taste
            </h2>

            {/* Description */}

            <p className="mb-8 text-sm leading-relaxed text-[#7A8A99] sm:text-base md:mb-12 md:text-lg">
              Each cake is crafted with love and the finest ingredients.
              Perfect for celebrations, special moments, or just treating
              yourself to something extraordinary.
            </p>

            {/* =====================================
                STATISTICS
            ====================================== */}

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`
                    transform
                    rounded-xl
                    border
                    border-[#E8F4FF]
                    bg-gradient-to-br
                    from-white
                    to-[#F5F7FA]
                    p-3
                    text-center
                    transition-all
                    sm:rounded-2xl
                    sm:p-5
                    md:p-6

                    hover:-translate-y-2
                    hover:border-[#FF69B4]
                    hover:shadow-2xl

                    hover-lift
                    hover-glow
                    hover-scale-up

                    ${
                      isInView
                        ? 'opacity-100 scale-100 animate-bounce-in-scale'
                        : 'opacity-0 scale-95'
                    }
                  `}
                  style={{
                    transitionDelay: isInView
                      ? `${(idx + 2) * 150}ms`
                      : '0ms',
                  }}
                >

                  {/* Number */}

                  <p className="text-xl font-bold text-[#FF69B4] sm:text-2xl md:text-3xl">
                    <CountUp
                      end={stat.number}
                      suffix={stat.suffix}
                      start={isInView}
                      duration={1800}
                    />
                  </p>

                  {/* Label */}

                  <p className="mt-1 text-xs text-[#7A8A99] sm:mt-2 sm:text-sm">
                    {stat.label}
                  </p>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}