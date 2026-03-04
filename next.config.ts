import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/vize",
  assetPrefix: "/vize",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // Vypnuto kvůli chybě Turbopack: "Cell ... DiskFileSystem ... no longer exists"
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
