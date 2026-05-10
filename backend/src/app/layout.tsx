import type { Metadata } from 'next'
import { Cormorant_Garamond, Instrument_Sans } from 'next/font/google'
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
  title: 'Dr Umma Hani Backend',
  description: 'Payload CMS and public API backend for the Dr Umma Hani website.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  )
}
