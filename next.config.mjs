/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_API_BASE_HOSTNAME,
        port: "5000",
      },
    ],
  },
  reactStrictMode: false,
  webpack(config) {
    return config;
  },
};

export default nextConfig;
