/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/abc",
  reactStrictMode: false,
  reactCompiler: true,
  // swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}

export default nextConfig
