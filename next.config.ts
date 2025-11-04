import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for faster development
  reactStrictMode: true,
  // Faster refresh
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;
