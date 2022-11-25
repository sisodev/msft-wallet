/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  env : {
    PORT: '3000'
  }
}

module.exports = nextConfig
