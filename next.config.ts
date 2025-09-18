import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/mapping-resource-tool',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
