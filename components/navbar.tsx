'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'HOME', id: 'home' },
  { name: 'SHOP', id: 'shop' },
  { name: 'ABOUT', id: 'about' },
  { name: 'PRODUCTS', id: 'elements' },
  { name: 'PROCESS', id: 'buy' },
  { name: 'BLOG', id: 'blog' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Important: server and first client render both start at 0
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Navbar background
      setIsScrolled(window.scrollY > 20)

      // Scroll progress
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight

      const progress =
        scrollHeight > 0
          ? (window.scrollY / scrollHeight) * 100
          : 0

      setScrollProgress(Math.min(100, Math.max(0, progress)))

      // Active navigation section
      for (const item of navItems) {
        const section = document.getElementById(item.id)

        if (!section) continue

        const rect = section.getBoundingClientRect()

        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(item.id)
          break
        }
      }
    }

    // Run after hydration.
    // This also handles opening directly at /#buy, /#shop, etc.
    const frame = requestAnimationFrame(handleScroll)

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    window.addEventListener('resize', handleScroll)

    return () => {
      cancelAnimationFrame(frame)

      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5">
          <div
            className={`relative flex items-center justify-between rounded-2xl border transition-all duration-500 ${
              isScrolled
                ? 'bg-white/70 backdrop-blur-2xl shadow-2xl border-white/40'
                : 'bg-white/45 backdrop-blur-xl border-white/30'
            } px-8 py-4`}
          >
            {/* Decorative Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-200/20 via-white/10 to-sky-200/20 blur-2xl -z-10" />

            {/* Logo */}
            <a
              href="#home"
              onClick={() => {
                setActiveSection('home')
                setIsOpen(false)
              }}
              className="flex items-center gap-3 group"
            >
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 border border-white/70 flex items-center justify-center text-2xl shadow-xl shadow-purple-300/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                🧁
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-wide text-slate-800">
                  Woodmart
                </h2>

                <p className="text-xs tracking-[0.35em] uppercase text-slate-400">
                  Bakery
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => {
                    setActiveSection(item.id)
                  }}
                  className={`group relative text-sm font-semibold tracking-wide transition duration-300 ${
                    activeSection === item.id
                      ? 'text-pink-500'
                      : 'text-slate-700 hover:text-pink-500'
                  }`}
                >
                  {item.name}

                  <span
                    className={`absolute left-0 -bottom-2 h-[2px] rounded-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-500 ${
                      activeSection === item.id
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              ))}
            </div>

            {/* Mobile Button */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="lg:hidden rounded-xl p-2 hover:bg-white/60 transition"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="text-slate-800" size={26} />
              ) : (
                <Menu className="text-slate-800" size={26} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 top-24 transition-all duration-500 ${
            isOpen
              ? 'opacity-100 visible'
              : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <div className="mx-5 rounded-3xl bg-white/80 backdrop-blur-3xl shadow-2xl border border-white/40 p-8">
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => {
                    setActiveSection(item.id)
                    setIsOpen(false)
                  }}
                  className={`rounded-xl px-5 py-4 text-lg font-semibold transition-all ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg'
                      : 'hover:bg-pink-50 text-slate-700'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll Progress Line */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-pink-500 via-rose-400 to-sky-400 z-[60]"
        style={{
          width: `${scrollProgress}%`,
        }}
      />
    </>
  )
}