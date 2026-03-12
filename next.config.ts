import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    // Vypnuto kvůli chybě Turbopack: "Cell ... DiskFileSystem ... no longer exists"
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
