/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "simsaar-backend.vercel.app","simsaarerp.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "simsaarerp.net",
        port: "80",
        pathname: "/files/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://simsaarerp.net//api/:path*', // Frappe API endpoint
      },
      {
        source: '/files/:path*',
        destination: 'https://simsaarerp.net//files/:path*', // Frappe files endpoint
      },
    ];
  },
};

export default nextConfig;
