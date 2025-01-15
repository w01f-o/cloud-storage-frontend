/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_API_BASE_HOSTNAME,
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
