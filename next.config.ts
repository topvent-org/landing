import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  // Monorepo has a lockfile per app plus one at the repo root; without this,
  // Next.js infers the repo root as the project root and Turbopack ends up
  // watching every app's node_modules (backend/frontend/mobile too), which
  // spikes CPU/RAM and can make dev never finish compiling.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
