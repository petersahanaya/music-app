/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
    remotePatterns : [
      {
        hostname : "**",
        protocol : "https"
      }
    ]
  }
}

module.exports = nextConfig
