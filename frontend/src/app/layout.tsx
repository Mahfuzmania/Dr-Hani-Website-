import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.FRONTEND_URL || 'http://localhost:3000'),
  title: {
    default: 'Dr Umma Hani',
    template: '%s | Dr Umma Hani',
  },
  description:
    "Official profile website for Dr Umma Hani, presenting medical service, community leadership, women's health experience, and public engagement.",
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
