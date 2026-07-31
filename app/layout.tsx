import { Analytics } from '@vercel/analytics/next'
import MouseTrail from '@/components/MouseTrail'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Woodmart - Premium Bakery',
  description: 'Handcrafted artisan bakery with premium pastries, cakes, and confections✨ ',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#DCEFFF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-white text-[#1a1f36]">
        <MouseTrail />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
