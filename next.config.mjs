/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "simsaar-backend.vercel.app","65.20.79.47"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "65.20.79.47",
        port: "86",
        pathname: "/files/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://65.20.79.47//api/:path*', // Frappe API endpoint
      },
      {
        source: '/files/:path*',
        destination: 'http://65.20.79.47//files/:path*', // Frappe files endpoint
      },
    ];
  },
};

export default nextConfig;
