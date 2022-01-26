import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { isServer } from "services/ssrutils"
import nprogress from "nprogress"
import {
  AddImageToCategoryRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from "./requestModels"
import { parseTokeInfo, TokenInfo, User } from "models/Userm"
import tokenManager from "services/token-manager"
import { ImageInfo, ImageRef } from "models/Imagem"
import { Category, CategoryTypeAhead } from "models/Categorym"

export class ServerApi {
  constructor(private _axios: AxiosInstance) {
    this._axios.interceptors.request.use(
      async (cfg): Promise<AxiosRequestConfig> => {
        const token = await tokenManager.getToken()
        if (token) {
          cfg.headers = {
            Authorization: `Bearer ${token?.accessToken.token}`,
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
    const resp = await this._axios.post<TokenInfo>(
      "/auth/refresh-token",
      null,
      {
        transformResponse: (data: string) => parseTokeInfo(data),
      },
    )

    return resp.data
  }

  public async login(
    loginRequest: LoginRequest,
  ): Promise<TokenInfo | null | undefined> {
    const resp = await this._axios.post<TokenInfo>("/auth/login", null, {
      headers: {
        username: loginRequest.username,
        password: loginRequest.password,
      },
      validateStatus: (status: number) => status === 200 || status === 401,
      transformResponse: (data: string) => parseTokeInfo(data),
    })

    if (resp.status === 401 || !resp.data) {
      return null
    }

    return resp.data
  }

  public async register(
    registerRequest: RegisterRequest,
  ): Promise<AxiosResponse> {
    return await this._axios.post<AxiosResponse>(
      "/users/register",
      registerRequest,
      {
        validateStatus: (status: number) => status === 201,
      },
    )
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
    return await this._axios.post(
      "/users/reset-password",
      { email },
      {
        validateStatus: (status: number) => status === 200,
      },
    )
  }

  public async resetPassword(
    resetPasswordRequest: ResetPasswordRequest,
  ): Promise<AxiosResponse> {
    return await this._axios.put(
      "/users/reset-password",
      resetPasswordRequest,
      {
        validateStatus: (status: number) => status === 200,
      },
    )
  }

  public async uploadImage(file: File): Promise<ImageRef> {
    const data = new FormData()
    data.append("file", file)
    const resp = await this._axios.post<ImageRef>("/images/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      validateStatus: (status: number) => status === 201,
    })
    return resp.data
  }

  public async typeaheadCategory(
    keyword: string,
  ): Promise<CategoryTypeAhead[]> {
    const resp = await this._axios.get<CategoryTypeAhead[]>(
      "/categories/typeahead",
      {
        params: {
          keyword,
        },
        validateStatus: (status: number) => status === 200,
      },
    )
    return resp.data
  }

  public async getAllCategory(): Promise<Category[]> {
    const resp = await this._axios.get<Category[]>("/categories", {
      validateStatus: (status: number) => status === 200,
    })
    return resp.data
  }

  public async addImageToCategory(
    addImageToCategoryRequest: AddImageToCategoryRequest,
  ): Promise<AxiosResponse> {
    return await this._axios.post(
      "/categories/add-category-image",
      addImageToCategoryRequest,
      {
        validateStatus: (status: number) => status === 200,
      },
    )
  }

  public async updateImageInfo(
    imageInfo: ImageInfo,
    fileID: string,
  ): Promise<AxiosResponse> {
    return await this._axios.put(`/images/update-info/${fileID}`, imageInfo, {
      validateStatus: (status: number) => status === 200,
    })
  }
}
