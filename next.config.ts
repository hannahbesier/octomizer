import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(',') ?? [],  // allow external devices access
};

export default nextConfig;
