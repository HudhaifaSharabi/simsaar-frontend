/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "simsaar-backend.vercel.app","65.20.79.47"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "86",
        pathname: "/files/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:86/api/:path*', // Frappe API endpoint
      },
      {
        source: '/files/:path*',
        destination: 'http://localhost:86/files/:path*', // Frappe files endpoint
      },
    ];
  },
};

export default nextConfig;
