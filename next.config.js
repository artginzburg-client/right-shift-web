const withLinaria = require('next-with-linaria')

/** @type {import('next-with-linaria').LinariaConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  }
}

module.exports = withLinaria(nextConfig)
