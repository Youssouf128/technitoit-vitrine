import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serveur autonome minimal (.next/standalone) utilisé par l'image Docker
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
