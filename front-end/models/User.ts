import { isBefore, parseISO } from "date-fns"

export interface User {
  readonly id: string
  username: string
  email: string
  profile: UserProfile,
  isActive: boolean
  roles: string[]
}

export interface UserProfile {
  firstName: string
  lastName: string
  phone: number
  address: string
}

export interface TokenStringInfo {
  token: string
  expireAt: Date
  notBefore: Date
}

export interface TokenInfo {
  accessToken: TokenStringInfo
  refreshToken: TokenStringInfo
}

export function isAccessTokenExpire(tokenInfo: TokenInfo): boolean {
  return isBefore(tokenInfo.accessToken.expireAt, new Date())
}

export function isRefreshTokenExpire(tokenInfo: TokenInfo): boolean {
  return isBefore(tokenInfo.refreshToken.expireAt, new Date())
}

export function parseTokeInfo(json?: string | null): TokenInfo | null {
  if (!json || json.length === 0) {
    return null
  }

  return JSON.parse(json, (key, value) => {
    switch (key) {
      case "expireAt":
      case "notBefore":
        return parseISO(value)
      default:
        return value
    }
  })
}
