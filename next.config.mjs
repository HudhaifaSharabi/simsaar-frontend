/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "simsaar-backend.vercel.app","localhost:86"],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:86/api/:path*', // رابط Frappe API
      },
    ];
  },
};

export default nextConfig;
