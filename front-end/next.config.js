/** @type {import('next').NextConfig} */

const getEnvCode = () => {
  if (process.env.NODE_ENV) {
    return process.env.NODE_ENV
  }

  return "development"
}

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    envCode: getEnvCode(),
    serverApi: {
      url: process.env.SERVER_API,
    },
  },
}
