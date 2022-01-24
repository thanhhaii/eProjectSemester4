/** @type {import('next').NextConfig} */

const getEnvCode = () => {
  if (process.env.NODE_ENV) {
    return process.env.NODE_ENV
  }

  return "development"
}

const getImageDomains = () => {
  let domains = []
  if (process.env.STATIC_IMAGES_DOMAIN) {
    domains = process.env.STATIC_IMAGES_DOMAIN.split(";")
      .map(t => t.trim())
      .filter(t => !!t)
  }

  return domains.concat(["localhost", "images.unsplash.com"])
}

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    envCode: getEnvCode(),
    serverApi: {
      url: process.env.SERVER_API,
    },
  },
  images: {
    domains: getImageDomains(),
  },
}
