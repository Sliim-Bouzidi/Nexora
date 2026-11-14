import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits .next/standalone: a minimal server.js plus only the node_modules it
  // needs, used by the Dockerfile's runtime stage.
  output: "standalone",
};

export default nextConfig;
