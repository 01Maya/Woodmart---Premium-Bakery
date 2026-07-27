'use client'

import Image from 'next/image'
import { useInView } from '@/hooks/useInView'

export function Products() {
  const { ref, isInView } = useInView()

  const products = [
    { id: 1, name: 'White Cake', price: 119, oldPrice: 189, image: '/p1.png', badge: true },
    { id: 2, name: 'Raspberry Pie', price: 189, oldPrice: 249, image: '/p2.png', badge: false },
    { id: 3, name: 'Chocolate Cake', price: 249, oldPrice: 329, image: '/p3.png', badge: false },
    { id: 4, name: 'Honey Waffles', price: 199, oldPrice: 279, image: '/p4.png', badge: false },
    { id: 5, name: 'Blue Bliss Cake', price: 168, oldPrice: 228, image: '/p5.png', badge: false },
    { id: 6, name: 'French Croissant', price: 134, oldPrice: 189, image: '/p6.png', badge: false },
  ]

  return (
<section
  ref={ref}
  id="elements"
  className="relative py-12 sm:py-20 px-4 overflow-hidden bg-[#F5F7FA]"
>
  <div
    className="absolute inset-0 z-0 bg-repeat opacity-60"
    style={{
      backgroundImage: "url('/DP.png')",
      backgroundSize: "350px 350px",
    }}
  />

  <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header - Pop in with shine animation */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 transform ${
          isInView ? 'opacity-100 scale-100 animate-bounce-in-scale' : 'opacity-0 scale-95'
        }`}>
          <p className="text-[#FF69B4] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2 animate-shine">Featured Collection</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B3E50] mb-3 sm:mb-4 hover:animate-shine cursor-pointer">Featured Products</h2>
          <p className="text-[#7A8A99] text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of premium bakery items baked fresh daily
          </p>
        </div>

        {/* Product Grid - Staggered animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, idx) => (
            <div
              key={product.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group transform hover-lift hover-glow hover-scale-up ${
                isInView ? 'opacity-100 translate-y-0 animate-bounce-in-scale' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: isInView ? `${idx * 120}ms` : '0ms' }}
            >
              {/* Image Container */}
              <div className="relative bg-white h-64 sm:h-80 flex items-center justify-center overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />

                {/* Sale Badge */}
                {product.badge && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-[#FF69B4] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold animate-bounce-up hover-glow animate-shine">
                    Sale
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-6">
                <p className="text-[#FF69B4] text-xs sm:text-sm font-semibold mb-1 sm:mb-2 uppercase tracking-wide">Product</p>
                <h3 className="text-lg sm:text-xl font-bold text-[#2B3E50] mb-3 sm:mb-4">{product.name}</h3>

                {/* Price */}
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <span className="text-xl sm:text-2xl font-bold text-[#FF69B4]">${product.price}.00</span>
                  <span className="text-base sm:text-lg text-[#999999] line-through">${product.oldPrice}.00</span>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-gradient-to-r from-[#FF69B4] to-[#FFB3D9] text-white font-semibold py-2.5 sm:py-3 rounded-full hover:shadow-lg hover:-translate-y-1 transition-all text-sm sm:text-base active:scale-95 hover-lift hover-glow hover-wiggle group-hover:animate-wiggle">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
