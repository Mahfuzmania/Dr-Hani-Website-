import type { NextConfig } from 'next'

function buildRemotePatterns() {
  const candidates = [process.env.NEXT_PUBLIC_BACKEND_URL, process.env.BACKEND_PUBLIC_URL].filter(Boolean)

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
    return process.env.VERCEL_ENV === 'preview' || process.env.SITE_NOINDEX === 'true' ? [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }] }] : []
  },
  images: {
    remotePatterns: buildRemotePatterns(),
  },
}

export default nextConfig
