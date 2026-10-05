import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['192.168.2.31'],  // allow external devices access
};

export default nextConfig;
