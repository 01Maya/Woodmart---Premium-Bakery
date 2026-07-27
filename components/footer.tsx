'use client'

import { MapPin, ArrowUp } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

export function Footer() {
  const { ref, isInView } = useInView()

  return (
    <footer ref={ref} className="bg-white text-[#2B3E50] border-t border-[#E8F4FF]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column - Slide from left */}
          <div className={`transition-all duration-1000 transform ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              <span className="text-[#FF69B4] mr-2">🧁</span>woodmart
            </h3>
            <p className="text-[#7A8A99] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Premium artisan bakery crafting handmade pastries, cakes, and confections with the finest ingredients.
            </p>
            <div className="flex gap-2 sm:gap-3">
              {['f', 'i', 't'].map((icon, idx) => (
                <button
                  key={idx}
                  className="p-2 rounded-full bg-[#F5F7FA] hover:bg-[#FF69B4] hover:text-white transition-all transform hover:scale-125 hover:rotate-12 text-xs sm:text-sm font-bold hover-flip hover-glow animate-bounce-up"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Posts - Staggered */}
          <div className={`transition-all duration-1000 transform ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`} style={{ transitionDelay: isInView ? '100ms' : '0ms' }}>
            <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-[#2B3E50]">Recent Posts</h4>
            <div className="space-y-2 sm:space-y-3">
              {['Pastry Making 101', 'Chocolate Masterclass', 'Summer Flavors'].map((post, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="block text-[#7A8A99] hover:text-[#FF69B4] hover:translate-x-1 transition-all text-xs sm:text-sm group hover-scale-up"
                >
                  <span className="group-hover:animate-heartbeat">•</span> {post}
                </a>
              ))}
            </div>
          </div>

          {/* Store Locations - Staggered */}
          <div className={`transition-all duration-1000 transform ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`} style={{ transitionDelay: isInView ? '200ms' : '0ms' }}>
            <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-[#2B3E50]">Store Locations</h4>
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              {[
                { city: 'New York', addr: '123 Baker St' },
                { city: 'Los Angeles', addr: '456 Sweet Ave' },
                { city: 'Chicago', addr: '789 Pastry Ln' },
              ].map((loc, idx) => (
                <div key={idx} className="flex gap-2 text-[#7A8A99] hover:text-[#FF69B4] transition-colors cursor-pointer group hover-lift hover-glow">
                  <MapPin size={14} className="flex-shrink-0 mt-0.5 sm:mt-1 group-hover:animate-spin-rotate" />
                  <div>
                    <p className="font-semibold text-[#2B3E50]">{loc.city}</p>
                    <p>{loc.addr}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links - Staggered */}
          <div className={`transition-all duration-1000 transform ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`} style={{ transitionDelay: isInView ? '300ms' : '0ms' }}>
            <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-[#2B3E50]">Quick Links</h4>
            <div className="space-y-2 sm:space-y-3">
              {['About Us', 'Contact', 'Privacy Policy', 'Terms & Conditions', 'Shipping'].map((link, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="block text-[#7A8A99] hover:text-[#FF69B4] hover:translate-x-1 transition-all text-xs sm:text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#E8F4FF]" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <p className="text-[#7A8A99] text-center sm:text-left">
            © 2024 Woodmart Bakery. All rights reserved.
          </p>

          {/* Payment Icons */}
          <div className="flex gap-2 sm:gap-3 items-center">
            <span className="text-[#7A8A99] hidden sm:inline">Payment Methods:</span>
            {['💳', '🏦', '📱', '💰'].map((icon, idx) => (
              <span key={idx} className="text-base sm:text-lg hover:scale-110 transition-transform cursor-pointer">
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
<button
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  className="fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center bg-[#FF69B4] text-white rounded-full shadow-xl hover:bg-[#E056A1] hover:scale-110 transition-all duration-300"
  aria-label="Back to top"
>
  <ArrowUp size={22} />
</button>
    </footer>
  )
}
