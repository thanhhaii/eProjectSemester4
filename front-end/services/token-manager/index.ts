import serverApi from "services/server"
import { TokenInfo, parseTokeInfo, isRefreshTokenExpire } from "models/User"

interface Storage {
  setToken(tokenInfo: TokenInfo | null): Promise<void>
  getToken(): Promise<TokenInfo | null>
}

class LocalStorage implements Storage {
  private _key = "app.photo.share"

  setToken(tokenInfo: TokenInfo | null): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!tokenInfo) {
          window.localStorage.removeItem(this._key)
          resolve()
          return
        }

        try {
          const json = JSON.stringify(tokenInfo)
          window.localStorage.setItem(this._key, json)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  getToken(): Promise<TokenInfo | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const jsonStr = window.localStorage.getItem(this._key)
          const tokenInfo = parseTokeInfo(jsonStr)
          resolve(tokenInfo)
        } catch (err) {
          reject(err)
        }
      })
    })
  }
}

class MemoryStorage implements Storage {
  private _tokenInfo: TokenInfo | null = null
  setToken(tokenInfo: TokenInfo): Promise<void> {
    this._tokenInfo = tokenInfo
    return Promise.resolve()
  }
  getToken(): Promise<TokenInfo | null> {
    return Promise.resolve(this._tokenInfo)
  }
}

class StorageFactory {
  static create(): Storage {
    if (typeof window !== "undefined") {
      return new LocalStorage()
    }

    return new MemoryStorage()
  }
}

class TokenManager {
  private _tokenInfo: TokenInfo | null = null
  private readonly _bufferMS = 120000
  private _timeoutId?: NodeJS.Timeout
  private _onTokenExpired: ((tokenInfo: TokenInfo) => void) | null = null

  constructor(private _storage: Storage) {}

  async init(onTokenExpired: (tokenInfo: TokenInfo) => void) {
    if (!this._tokenInfo) {
      this._tokenInfo = await this._storage.getToken()
    }

    this._onTokenExpired = onTokenExpired

    this.startAutoRefreshToken()
  }

  async logout() {
    this.stopAutoRefreshToken()
    await this.setToken(null)
  }

  async setToken(tokenInfo: TokenInfo | null): Promise<void> {
    this._tokenInfo = tokenInfo
    await this._storage.setToken(tokenInfo)
  }

  getToken(): string | undefined{
    return this._tokenInfo?.accessToken.token
  }

  dispose() {
    this._onTokenExpired = null
    this._tokenInfo = null
    this.stopAutoRefreshToken()
  }

  startAutoRefreshToken() {
    if (
      !window ||
      !this._tokenInfo ||
      !this._tokenInfo.accessToken ||
      !this._tokenInfo.accessToken.expireAt
    ) {
      return
    }

    if (!this._timeoutId) {
      window.clearTimeout(this._timeoutId)
    }

    const duration =
      this._tokenInfo.accessToken.expireAt.getTime() - new Date().getTime()

    this._timeoutId = setTimeout(async () => {
      if (!this._tokenInfo) {
        return
      }

      if (isRefreshTokenExpire(this._tokenInfo)) {
        if (this._onTokenExpired) {
          this._onTokenExpired(this._tokenInfo)
        }

        return
      }

      await this._refreshTokenAndTokenInfo()

      this._timeoutId = undefined
      // register another refresh token process
      this.startAutoRefreshToken()
    }, Math.max(duration - this._bufferMS, 300))
  }

  stopAutoRefreshToken() {
    if (window && this._timeoutId) {
      window.clearTimeout(this._timeoutId)
    }
  }

  private async _refreshTokenAndTokenInfo(): Promise<TokenInfo | null> {
    try {
      await this.setToken(await serverApi.refreshToken())
    } catch (error) {
      await this.setToken(null)
    }

    return this._tokenInfo
  }
}

export default new TokenManager(StorageFactory.create())
