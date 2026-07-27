import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Categories } from '@/components/categories'
import { About } from '@/components/about'
import { Products } from '@/components/products'
import { Process } from '@/components/process'
import { Blog } from '@/components/blog'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="w-full bg-white overflow-hidden">
      <Navbar />
      <Hero />
      <Categories />
      <About />
      <Products />
      <Process />
      <Blog />
      <Footer />
    </main>
  )
}
