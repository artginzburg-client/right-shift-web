const withLinaria = require('next-with-linaria')

/** @type {import('next-with-linaria').LinariaConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/right-shift-web',
  images: { unoptimized: true },
  experimental: {
    webpackBuildWorker: true,
    // typedRoutes is off: the API routes were moved to private folders for the
    // static snapshot, so generated route types no longer cover the form calls.
    typedRoutes: false
  }
}

module.exports = withLinaria(nextConfig)
