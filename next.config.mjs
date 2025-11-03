/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/abc",
  reactStrictMode: false,
  reactCompiler: true,
  forceSwcTransforms: true,
  largePageDataBytes: 128 * 100000,
  cacheComponents: true,
  // swcMinify: false,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}

export default nextConfig
