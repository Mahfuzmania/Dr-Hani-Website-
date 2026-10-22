import type { NextConfig } from 'next'

function buildRemotePatterns() {
  const candidates = [
    process.env.NEXT_PUBLIC_BACKEND_URL,
    process.env.BACKEND_PUBLIC_URL,
  ].filter(Boolean)

  return candidates.flatMap((value) => {
    try {
      const url = new URL(value as string)

      return [
        {
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
          hostname: url.hostname,
          port: url.port,
          pathname: '/media/**',
        },
      ]
    } catch {
      return []
    }
  })
}

const nextConfig: NextConfig = {
  async headers() {
    const review =
      process.env.VERCEL_ENV === 'preview' ||
      process.env.SITE_NOINDEX === 'true'
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          ...(review
            ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }]
            : []),
        ],
      },
    ]
  },
  images: {
    remotePatterns: buildRemotePatterns(),
  },
}

export default nextConfig
