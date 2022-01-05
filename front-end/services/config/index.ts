import getConfig from "next/config"

export interface ServerApiConfig {
  url: string
}

export interface PublicConfig {
  serverApi: ServerApiConfig
  envCode: "development" | "testing" | "production"
}

const { publicRuntimeConfig } = getConfig()

export function getPublic(): PublicConfig {
  return publicRuntimeConfig
}

export const config: PublicConfig = publicRuntimeConfig
