/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home-assistant-zigbee2mqtt-setup-with-raspbee-ii-on-raspberrypi',
        destination: '/posts/home-assistant-zigbee2mqtt-setup-with-raspbee-ii-on-raspberrypi',
        permanent: true,
      },
      {
        source: '/advanced-typescript-patterns-part-2',
        destination: '/posts/advanced-typescript-patterns-part-2',
        permanent: true,
      },
      {
        source: '/advanced-typescript-patterns-part-1',
        destination: '/posts/advanced-typescript-patterns-part-1',
        permanent: true,
      },
      {
        source: '/toggle-dark-mode',
        destination: '/posts/toggle-dark-mode',
        permanent: true,
      },
      {
        source: '/blog-init',
        destination: '/posts/blog-init',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
