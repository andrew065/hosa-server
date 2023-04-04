/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react'],
    isrMemoryCacheSize: 50,
  },
}

module.exports = nextConfig
