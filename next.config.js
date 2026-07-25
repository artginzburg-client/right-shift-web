const withLinaria = require('next-with-linaria')

/** @type {import('next-with-linaria').LinariaConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/right-shift-web',
  images: { unoptimized: true },
  experimental: {
    webpackBuildWorker: true,
    typedRoutes: true
  }
}

module.exports = withLinaria(nextConfig)
