import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable dynamic routes that can't be statically exported
  trailingSlash: true,
};

export default nextConfig;
