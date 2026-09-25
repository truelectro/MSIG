import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/girls-space",
        destination: "/girl-safe-space",
        permanent: true,
      },
      {
        source: "/girls-space/admin",
        destination: "/girl-safe-space/admin",
        permanent: true,
      },
      {
        source: "/girls-space/register",
        destination: "/girl-safe-space/register",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
