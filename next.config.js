/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  env : {
    PORT: '3000'
  },
  images: {
    domains: ['msft-treasury.azurewebsites.net']
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/landing",
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
