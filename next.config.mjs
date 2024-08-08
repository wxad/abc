/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/abc",
  reactStrictMode: false,
  swcMinify: false,
  experimental: {
    forceSwcTransforms: true,
    largePageDataBytes: 128 * 100000,
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
}

export default nextConfig
