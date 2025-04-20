// next.config.js
import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'simsaarerp.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'simsaarerp.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://simsaarerp.net/api/:path*',
      },
      {
        source: '/files/:path*',
        destination: 'https://simsaarerp.net/files/:path*',
      },
    ];
  },
  // ✅ PWA settings
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching: [
      {
        urlPattern: /^\/tiles\/.*\.(jpg|jpeg|png|webp|gif|svg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'tile-images',
          expiration: {
            maxEntries: 500,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 يوم
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      ...runtimeCaching, // 👈 يشمل باقي العناصر العامة مثل الخطوط وأيقونات PWA
    ],
  },
};

export default withPWA(nextConfig);
