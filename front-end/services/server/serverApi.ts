import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { isServer } from "services/ssrutils"
import nprogress from "nprogress"
import { LoginRequest, RegisterRequest } from "./requestModels"
import { parseTokeInfo, TokenInfo, User } from "../../models/User"
import tokenManager from "services/token-manager"

export class ServerApi {
  constructor(private _axios: AxiosInstance) {
    this._axios.interceptors.request.use(
      async (cfg): Promise<AxiosRequestConfig> => {
        if (tokenManager.getToken()) {
          cfg.headers = {
            "Authorization": `Bearer ${tokenManager.getToken()}`,
            ...cfg.headers,
          }
        }
        return {
          ...cfg,
          withCredentials: true,
          headers: {
            ...cfg.headers,
          },
        }
      },
    )

    if (!isServer()) {
      this._axios.interceptors.request.use(cfg => {
        nprogress.start()
        return cfg
      })

      this._axios.interceptors.response.use(
        resp => {
          nprogress.done()
          return resp
        },
        err => {
          nprogress.done()
          return Promise.reject(err)
        },
      )
    }
  }

  public async refreshToken(): Promise<TokenInfo> {
    const resp = await this._axios.post<TokenInfo>("/auth/refresh-token", null, {
      transformResponse: (data: string) => parseTokeInfo(data),
    })

    return resp.data
  }

  public async login(loginRequest: LoginRequest): Promise<TokenInfo | null | undefined> {
    const resp = await this._axios.post<TokenInfo>("/auth/login", null, {
      headers: {
        username: loginRequest.username,
        password: loginRequest.password,
      },
      validateStatus: (status: number) => status === 200 || status === 401,
      transformResponse: (data: string) => parseTokeInfo(data),
    })
    console.log(resp.data)
    if (resp.status === 401 || !resp.data) {
      return null
    }

    return resp.data
  }

  public async register(registerRequest: RegisterRequest): Promise<AxiosResponse> {
    return await this._axios.post<AxiosResponse>("/users/register", registerRequest, {
      validateStatus: (status: number) => status === 201,
    })
  }

  public async getMe(): Promise<User | null> {
    const resp = await this._axios.get<User>("/users/me", {
      validateStatus: (status: number) => status === 200 || status === 401,
    })

    if (resp.status === 401) {
      return null
    }

    return resp.data
  }

  public async forgotPassword(email: string): Promise<AxiosResponse> {
    return await this._axios.post("/users/reset-password",
      { email, }, {
      validateStatus: (status: number) => status === 200,
    })
  }

}
