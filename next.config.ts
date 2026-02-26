import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // Optional: you can restrict it to specific paths for extra security
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
