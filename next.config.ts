import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['page.tsx', 'route.ts'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
}

export default nextConfig
