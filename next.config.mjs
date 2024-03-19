/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/abc",
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export default nextConfig;
