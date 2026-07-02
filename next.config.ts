import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ hostname: "assets.bayse.markets" }] },
};

export default nextConfig;
