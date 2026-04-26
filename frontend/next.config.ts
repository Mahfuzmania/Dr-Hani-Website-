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
  images: {
    remotePatterns: buildRemotePatterns(),
  },
}

export default nextConfig
