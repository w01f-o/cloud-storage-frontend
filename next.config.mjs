/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
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
