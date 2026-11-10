import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
  // Jonli kurs sahifasi olib tashlandi (2026-11-09). Eski havolalar kurslar sahifasiga olib boradi.
  // permanent: false -- keyingi guruh ochilsa, sahifa shu manzilda qaytadi.
  async redirects() {
    return [
      { source: "/:locale(uz|ru|en)/solidworks-jonli-kurs", destination: "/:locale/courses", permanent: false },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
