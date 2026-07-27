'use client'

import Image from 'next/image'
import { useInView } from '@/hooks/useInView'

export function Categories() {
  const { ref, isInView } = useInView()

  const categories = [
    {
      name: 'Cupcakes',
      image: '/a1.png',
      desc: 'Freshly baked artisan cupcakes made daily.',
    },
    {
      name: 'Macaroons',
      image: '/a2.png',
      desc: 'Delicate French macarons with premium fillings.',
    },
    {
      name: 'Cakes',
      image: '/a3.png',
      desc: 'Beautiful handmade celebration cakes.',
    },
  ]

  return (
    <section
      ref={ref}
      id="shop"
      className="py-12 sm:py-20 px-4 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>
            <p
              className={`text-[#ff6b93] font-semibold text-sm uppercase tracking-[3px] mb-3 transition-all duration-1000 ${
                isInView
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              Our Collection
            </p>

            <h2
              className={`text-4xl lg:text-5xl font-bold text-[#23374d] leading-tight mb-6 transition-all duration-1000 delay-100 ${
                isInView
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              Our Fine
              <br />
              Home-Made
              <br />
              Chocolate
            </h2>

            <p
              className={`text-[#7d8b99] leading-8 mb-8 max-w-md transition-all duration-1000 delay-200 ${
                isInView
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              Handcrafted with premium ingredients, our collection
              features the finest artisan chocolates and pastries made
              fresh daily.
            </p>

            <button
              className={`px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-400 text-white font-semibold shadow-lg hover:shadow-pink-300 hover:-translate-y-1 transition-all duration-300 ${
                isInView
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              Read More
            </button>
          </div>

          {/* Right Side */}
          <div className="relative">

            {/* Dotted Wavy Line */}
            <svg
              className="absolute top-10 left-0 w-full h-12 hidden md:block"
              viewBox="0 0 900 80"
              preserveAspectRatio="none"
            >
              <path
                d="M0,40
                   C70,5 130,75 200,40
                   S330,5 400,40
                   S530,75 600,40
                   S730,5 800,40
                   S870,75 900,40"
                fill="none"
                stroke="#ff9ec1"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 relative z-10">
              {categories.map((cat, idx) => (
                <div
                  key={cat.name}
                  className={`text-center transition-all duration-1000 ${
                    isInView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: `${idx * 200}ms`,
                  }}
                >
                  {/* Circle Image */}
                  <div className="relative mx-auto w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-[#f5f8fc] to-[#eef7ff] shadow-lg overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(255,105,180,0.25)]">

                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain p-4 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6"
                    />

                    {/* Shine */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>

                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-[#23374d]">
                    {cat.name}
                  </h3>

                  <p className="mt-2 text-[#7d8b99] text-sm leading-7 px-2">
                    {cat.desc}
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