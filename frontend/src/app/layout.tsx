import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.FRONTEND_URL || 'http://localhost:3000'),
  title: {
    default: 'Dr Umma Hani',
    template: '%s | Dr Umma Hani',
  },
  description:
    'Dr Umma Hani is a Bangladeshi medical doctor and public-facing community leader connecting clinical service, women-focused care, and civic engagement.',
  icons: {
    icon: '/media/about-doctor-portrait.jpg',
    apple: '/media/about-doctor-portrait.jpg',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased">{children}</body>
    </html>
  )
}
