import type { Metadata } from 'next'
import { Cormorant_Garamond, Instrument_Sans } from 'next/font/google'

import { getSiteUrl } from '@/src/lib/metadata'
import './globals.css'

const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Dr Umma Hani',
    template: '%s | Dr Umma Hani',
  },
  description:
    "Dr Umma Hani is a Bangladeshi medical doctor connecting clinical service, women's health, and community leadership.",
  icons: {
    icon: '/media/about-doctor-portrait.jpg',
    apple: '/media/about-doctor-portrait.jpg',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}>
        {children}
      </body>
    </html>
  )
}
