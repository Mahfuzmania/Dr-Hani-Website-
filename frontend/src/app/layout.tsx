import type { Metadata } from 'next'
import { Cormorant_Garamond, Instrument_Sans, Noto_Serif_Bengali } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import { getSiteUrl, isReviewDeployment } from '@/src/lib/metadata'
import './globals.css'
import './editorial.css'
import './photographic.css'

const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const bengali = Noto_Serif_Bengali({ subsets: ['bengali'], variable: '--font-bengali', weight: ['400', '500', '600'], display: 'swap' })

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  robots: isReviewDeployment() ? { index: false, follow: false } : undefined,
  title: {
    default: 'Dr Umma Hani',
    template: '%s | Dr Umma Hani',
  },
  description:
    'Dr Umma Hani is a Bangladeshi physician and columnist connecting medical service, published writing, and community leadership.',
  icons: {
    icon: '/media/about-doctor-portrait.jpg',
    apple: '/media/about-doctor-portrait.jpg',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable} ${bengali.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
