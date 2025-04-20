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

/** @type {import('next').NextConfig} */
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
    ];
  },
};

export default withPWA({
  ...baseConfig,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',

    runtimeCaching: [
      // ✅ تخزين دائم لصور الـ tiles
      {
        urlPattern: /^\/tiles\/.*\.(jpg|jpeg|png|webp|gif|svg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'tile-images',
          expiration: {
            maxEntries: 1000,
            maxAgeSeconds: 60 * 60 * 24 * 365, // سنة
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },

      // ✅ تخزين صور من simsaarerp.net
      {
        urlPattern: /^https:\/\/simsaarerp\.net\/tiles\/.*\.(jpg|jpeg|png|webp|gif|svg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'remote-tile-images',
          expiration: {
            maxEntries: 1000,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },

      // ✅ باقي الملفات العامة مثل manifest والـ fonts
      ...runtimeCaching,
    ],
  },
});
