'use client'

import Image from 'next/image'
import {
  useRef,
  type MouseEvent,
} from 'react'
import { useInView } from '@/hooks/useInView'

export function Process() {
  const { ref, isInView } = useInView()

  const imageRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      number: '1',
      title: 'Ingredients',
      description:
        'We source the finest ingredients from trusted suppliers.',
      image: '/i1.png',
    },
    {
      number: '2',
      title: 'Stuffing',
      description:
        'Each item is carefully stuffed with premium fillings.',
      image: '/i2.png',
    },
    {
      number: '3',
      title: 'Cooking',
      description:
        'Perfect temperature and timing ensures ideal texture.',
      image: '/i3.png',
    },
    {
      number: '4',
      title: 'Dish Ready',
      description:
        'Final touches and quality checks guarantee excellence.',
      image: '/i4.png',
    },
  ]

  /* =========================================
     CENTER IMAGE 3D MOUSE EFFECT
  ========================================= */

  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement>
  ) => {
    const element = imageRef.current

    if (!element) return

    const rect = element.getBoundingClientRect()

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Convert mouse position to -1 → 1
    const percentX = (mouseX - centerX) / centerX
    const percentY = (mouseY - centerY) / centerY

    const maxRotate = 12

    const rotateY = percentX * maxRotate
    const rotateX = percentY * -maxRotate

    element.style.transform = `
      perspective(1000px)
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
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `
  }

  return (
    <section
      ref={ref}
      id="buy"
      className="relative overflow-hidden bg-white px-4 py-12 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* =====================================
            HEADER
        ====================================== */}

        <div
          className={`
            mb-12
            transform
            text-center
            transition-all
            duration-1000
            sm:mb-16

            ${
              isInView
                ? 'opacity-100 scale-100 animate-bounce-in-scale'
                : 'opacity-0 scale-95'
            }
          `}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#FF69B4] animate-shine sm:text-sm">
            See How It&apos;s Done
          </p>

          <h2 className="mb-3 cursor-pointer text-2xl font-bold text-[#2B3E50] hover:animate-wiggle sm:mb-4 sm:text-3xl md:text-4xl">
            How We Made Donuts
          </h2>

          <p className="mx-auto max-w-2xl text-sm text-[#7A8A99] sm:text-base md:text-lg">
            A step-by-step look at our artisan donut-making
            process
          </p>
        </div>

        {/* =====================================
            DESKTOP PROCESS GRID
        ====================================== */}

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4">

          {/* =====================================
              LEFT STEPS
          ====================================== */}

          <div className="hidden flex-col space-y-6 md:flex">
            {steps.slice(0, 2).map((step, idx) => (
              <div
                key={step.number}
                className={`
                  group
                  cursor-pointer
                  transform
                  rounded-2xl
                  border
                  border-[#E8F4FF]
                  bg-gradient-to-br
                  from-white
                  to-[#F5F7FA]
                  p-4
                  text-center
                  transition-all
                  sm:p-5

                  hover:-translate-y-2
                  hover:border-[#FF69B4]
                  hover:shadow-2xl

                  hover-lift
                  hover-glow
                  animate-tilt-left

                  ${
                    isInView
                      ? 'translate-x-0 opacity-100 animate-bounce-in-scale'
                      : '-translate-x-10 opacity-0'
                  }
                `}
                style={{
                  transitionDelay: isInView
                    ? `${idx * 150}ms`
                    : '0ms',
                }}
              >
                {/* Step Image */}

                <div className="relative mx-auto mb-4 h-16 w-16 sm:h-20 sm:w-20">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="
                      object-contain
                      transition-all
                      duration-500
                      group-hover:scale-110
                      group-hover:rotate-6
                    "
                  />
                </div>

                {/* Number */}

                <p className="mb-2 text-2xl font-bold text-[#FF69B4] sm:text-3xl">
                  {step.number}
                </p>

                {/* Title */}

                <h3 className="mb-2 text-sm font-bold text-[#2B3E50] sm:text-base">
                  {step.title}
                </h3>

                {/* Description */}

                <p className="text-xs text-[#7A8A99] sm:text-sm">
                  {step.description}
                </p>

                {/* Button */}

                <button
                  type="button"
                  className="
                    mt-3
                    text-xs
                    font-semibold
                    text-[#FF69B4]
                    transition-all
                    group-hover:translate-x-1
                    hover:underline
                    sm:text-sm
                  "
                >
                  Read More →
                </button>
              </div>
            ))}
          </div>

          {/* =====================================
              CENTER DONUT IMAGE
          ====================================== */}

          <div
            className={`
              my-6
              flex
              transform
              items-center
              justify-center
              transition-all
              duration-1000

              md:col-span-2
              md:my-0

              ${
                isInView
                  ? 'opacity-100 scale-100 animate-pop-in'
                  : 'opacity-0 scale-90'
              }
            `}
            style={{
              transitionDelay: isInView
                ? '300ms'
                : '0ms',
            }}
          >

            {/* Perspective wrapper */}

            <div
              className="relative w-full max-w-xs md:max-w-md"
              style={{
                perspective: '1000px',
              }}
            >

              {/* Mouse-controlled image */}

              <div
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="
                  group
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

                {/* Donut Image */}

                <Image
                  src="/decorations/pd1.png"
                  alt="How We Made Donuts - Process"
                  width={300}
                  height={300}
                  draggable={false}
                  className="
                    pointer-events-none
                    h-auto
                    w-full
                    select-none
                    rounded-lg
                    drop-shadow-2xl
                  "
                />

                {/* Glow Behind Image */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-10
                    -z-10
                    rounded-full
                    bg-pink-300/30
                    opacity-0
                    blur-3xl
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:opacity-100
                  "
                />
              </div>
            </div>
          </div>

          {/* =====================================
              RIGHT STEPS
          ====================================== */}

          <div className="hidden flex-col space-y-6 md:flex">
            {steps.slice(2).map((step, idx) => (
              <div
                key={step.number}
                className={`
                  group
                  cursor-pointer
                  transform
                  rounded-2xl
                  border
                  border-[#E8F4FF]
                  bg-gradient-to-br
                  from-white
                  to-[#F5F7FA]
                  p-4
                  text-center
                  transition-all
                  sm:p-5

                  hover:-translate-y-2
                  hover:border-[#FF69B4]
                  hover:shadow-2xl

                  hover-lift
                  hover-glow
                  animate-tilt-right

                  ${
                    isInView
                      ? 'translate-x-0 opacity-100 animate-bounce-in-scale'
                      : 'translate-x-10 opacity-0'
                  }
                `}
                style={{
                  transitionDelay: isInView
                    ? `${(idx + 2) * 150}ms`
                    : '0ms',
                }}
              >

                {/* Step Image */}

                <div className="relative mx-auto mb-4 h-16 w-16 sm:h-20 sm:w-20">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="
                      object-contain
                      transition-all
                      duration-500
                      group-hover:scale-110
                      group-hover:-rotate-6
                    "
                  />
                </div>

                {/* Number */}

                <p className="mb-2 text-2xl font-bold text-[#FF69B4] sm:text-3xl">
                  {step.number}
                </p>

                {/* Title */}

                <h3 className="mb-2 text-sm font-bold text-[#2B3E50] sm:text-base">
                  {step.title}
                </h3>

                {/* Description */}

                <p className="text-xs text-[#7A8A99] sm:text-sm">
                  {step.description}
                </p>

                {/* Button */}

                <button
                  type="button"
                  className="
                    mt-3
                    text-xs
                    font-semibold
                    text-[#FF69B4]
                    transition-all
                    group-hover:-translate-x-1
                    hover:underline
                    sm:text-sm
                  "
                >
                  Read More →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================
            MOBILE STEPS
        ====================================== */}

        <div className="mt-8 grid grid-cols-2 gap-4 md:hidden">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="
                animate-fade-in-up
                rounded-lg
                border
                border-[#E8F4FF]
                bg-gradient-to-br
                from-white
                to-[#F5F7FA]
                p-4
                text-center
                transition-all
                hover:-translate-y-1
                hover:border-[#FF69B4]
                hover:shadow-lg
              "
              style={{
                animationDelay: `${idx * 0.1}s`,
              }}
            >

              {/* Image */}

              <div className="relative mx-auto mb-3 h-14 w-14">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Number */}

              <p className="mb-1 text-2xl font-bold text-[#FF69B4]">
                {step.number}
              </p>

              {/* Title */}

              <h3 className="mb-1 text-xs font-bold text-[#2B3E50]">
                {step.title}
              </h3>

              {/* Description */}

              <p className="text-xs text-[#7A8A99]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}