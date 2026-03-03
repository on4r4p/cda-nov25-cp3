import type { NextConfig } from "next";

const graphqlProxyTarget = process.env.GRAPHQL_PROXY_TARGET || "http://127.0.0.1:4000";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  allowedDevOrigins: ["http://localhost:3000", "http://127.0.0.1:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: graphqlProxyTarget,
      },
    ];
  },
};

export default nextConfig;
