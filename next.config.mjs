// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["localhost","simsaarerp.net"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "simsaarerp.net",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://simsaarerp.net/api/:path*', // Frappe API endpoint
//       },
//       {
//         source: '/files/:path*',
//         destination: 'https://simsaarerp.net/files/:path*', // Frappe files endpoint
//       },
//     ];
//   },
// };

// export default nextConfig;
// next.config.js















import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';

const baseConfig = {
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
      {
        source: '/tiles/:path*',
        destination: 'https://simsaar.co/tiles/:path*',
      },
    ];
  },
};

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^\/tiles\/.*\.(jpg|jpeg|png|webp|gif|svg)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'tiles-via-rewrite',
        expiration: {
          maxEntries: 500,
          maxAgeSeconds: 60 * 60 * 24 * 365,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /^https:\/\/simsaar\.co\/tiles\/.*\.(jpg|jpeg|png|webp|gif|svg)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'external-tile-images',
        expiration: {
          maxEntries: 500,
          maxAgeSeconds: 60 * 60 * 24 * 365,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    ...runtimeCaching,
  ],
};

export default withPWA(pwaConfig)(baseConfig);
