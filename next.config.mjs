/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost","simsaarerp.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "simsaarerp.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://simsaarerp.net/api/:path*', // Frappe API endpoint
      },
      {
        source: '/files/:path*',
        destination: 'https://simsaarerp.net/files/:path*', // Frappe files endpoint
      },
    ];
  },
};

export default nextConfig;
