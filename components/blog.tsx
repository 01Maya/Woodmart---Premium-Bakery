'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MessageCircle, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

export function Blog() {
  const { ref, isInView } = useInView()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const articles = [
    {
      id: 1,
      title: 'Baking Tips for Perfect Pastries',
      date: 'July 15, 2024',
      author: 'Chef Marie',
      comments: 12,
      image: '/blog/b1.png',
    },
    {
      id: 2,
      title: 'Chocolate Secrets Revealed',
      date: 'July 12, 2024',
      author: 'Chef Thomas',
      comments: 8,
      image: '/blog/b2.png',
    },
    {
      id: 3,
      title: 'Summer Dessert Trends 2024',
      date: 'July 10, 2024',
      author: 'Chef Sara',
      comments: 15,
      image: '/blog/b3.png',
    },
    {
      id: 4,
      title: 'Mastering the Art of Croissants',
      date: 'July 8, 2024',
      author: 'Chef Pierre',
      comments: 20,
      image: '/blog/b4.png',
    },
    {
      id: 5,
      title: 'Organic Ingredients for Better Taste',
      date: 'July 5, 2024',
      author: 'Chef Emma',
      comments: 11,
      image: '/blog/b5.png',
    },
    {
      id: 6,
      title: 'Seasonal Flavors: Spring Edition',
      date: 'July 1, 2024',
      author: 'Chef James',
      comments: 18,
      image: '/blog/b6.png',
    },
  ]



const [itemsPerView, setItemsPerView] = useState(3)

useEffect(() => {
  const updateItemsPerView = () => {
    if (window.innerWidth < 640) {
      setItemsPerView(1) // Mobile
    } else if (window.innerWidth < 1024) {
      setItemsPerView(2) // Tablet
    } else {
      setItemsPerView(3) // Desktop
    }
  }

  updateItemsPerView()

  window.addEventListener('resize', updateItemsPerView)

  return () => window.removeEventListener('resize', updateItemsPerView)
}, [])

const totalSlides = Math.ceil(articles.length / itemsPerView)

const startIndex = currentSlide * itemsPerView

const visibleArticles = articles.slice(
  startIndex,
  startIndex + itemsPerView
)

  return (
    <section ref={ref} id="blog" className="py-12 sm:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header - Pop in with shine animation */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 transform ${
          isInView ? 'opacity-100 scale-100 animate-bounce-in-scale' : 'opacity-0 scale-95'
        }`}>
          <p className="text-[#FF69B4] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2 animate-shine">Fresh Stories</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B3E50] mb-3 sm:mb-4 hover:animate-wiggle cursor-pointer">Our New Articles</h2>
          <p className="text-[#7A8A99] text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Read the latest updates and insights from our bakery
          </p>
        </div>

        {/* Articles Carousel */}
        <div className="relative">
          {/* Carousel Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {visibleArticles.map((article, idx) => (
              <div
                key={article.id}
                className={`group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer transform hover-lift hover-glow hover-scale-up ${
                  isInView ? 'opacity-100 translate-y-0 scale-100 animate-bounce-in-scale' : 'opacity-0 translate-y-10 scale-95'
                }`}
                style={{ transitionDelay: isInView ? `${idx * 150}ms` : '0ms' }}
              >
              {/* Image - Real image with hover zoom */}
<div className="relative h-56 sm:h-56 md:h-64 bg-[#FFF8F2] overflow-hidden">
  <Image
    src={article.image}
    alt={article.title}
    fill
    sizes="(max-width:640px)100vw,33vw"
    className="object-contain sm:object-cover p-4 sm:p-0 group-hover:scale-105 transition-all duration-500"
  />
</div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#2B3E50] mb-3 sm:mb-4 group-hover:text-[#FF69B4] transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#7A8A99] mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-[#E8F4FF]">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="sm:w-4 sm:h-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={14} className="sm:w-4 sm:h-4" />
                    <span>{article.comments}</span>
                  </div>
                </div>

                {/* Author & CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-[#7A8A99] truncate">By {article.author}</span>
                  <button className="text-[#FF69B4] font-semibold text-xs sm:text-sm hover:underline whitespace-nowrap ml-2">
                    Read →
                  </button>
                </div>
              </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8 sm:mt-12">


            {/* Indicators */}
            <div className="flex gap-2 sm:gap-3">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 rounded-full transform hover:scale-125 ${
                    idx === currentSlide
                      ? 'bg-[#FF69B4] w-3 h-3 sm:w-4 sm:h-4'
                      : 'bg-[#E8F4FF] w-2 h-2 sm:w-3 sm:h-3 hover:bg-[#FFB3D9]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
