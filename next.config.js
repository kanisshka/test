/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ignoreDuringBuilds: true,
  swcMinify: true,
  images: {
    domains: ['img.freepik.com','fakestoreapi.com'],
  },
}

module.exports = nextConfig
