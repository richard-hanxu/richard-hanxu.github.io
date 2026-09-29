import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // GitHub Pages serves static files and cannot run Next.js image optimization.
  images: { unoptimized: true },
};

export default nextConfig;
