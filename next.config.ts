import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd1dqghctggt69w.cloudfront.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
