import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { isServer } from "services/ssrutils"
import nprogress from "nprogress"
import {
  AddImageToCategoryRequest,
  CategoryCreate,
  CategoryUpdate,
  GetImagesRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  UpdateImageInfo,
} from "./requestModels"
import {
  parseTokeInfo,
  TokenInfo,
  User,
  UserAbout,
  UserProfile,
} from "models/Userm"
import tokenManager from "services/token-manager"
import { ImageItem, ImageRef } from "models/Imagem"
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
      validateStatus: (status: number) => {
        if (status === 200) {
          return true
        }

        if (status === 401 && tokenManager.getToken()) {
          return false
        }

        return true
      },
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

  pageToStartOffset(pageNum: number, pageSize: number): number {
    return (pageNum - 1) * pageSize
  }

  public async getImages(request?: GetImagesRequest): Promise<ImageItem[]> {
    const params = {
      start: 0,
      limit: 20,
      keyword: "",
      filterType: "",
      filterValue: "",
      ...request,
    } as GetImagesRequest
    const resp = await this._axios.get("/images", {
      params: params,
      validateStatus: (status: number) => status === 200,
    })

    return resp.data
  }

  public async updateUserProfile(
    userProfile: UserProfile,
    userAbout: UserAbout,
  ): Promise<AxiosResponse> {
    const resp = await this._axios.put(
      "/users/update-profile",
      {
        userProfile,
        userAbout,
      },
      {
        validateStatus: (status: number) => status === 200,
      },
    )

    return resp
  }

  public async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<AxiosResponse> {
    const resp = await this._axios.put(
      "/users/change-password",
      {
        currentPassword,
        newPassword,
      },
      {
        validateStatus: (status: number) => status === 200,
      },
    )

    return resp
  }

  public async updateImageInfo(
    values: UpdateImageInfo,
    imageID: string,
  ): Promise<AxiosResponse> {
    return await this._axios.put(`/images/update-info/${imageID}`, values, {
      validateStatus: (status: number) => status === 200,
    })
  }

  public async createCategory(
    categoryCreate: CategoryCreate,
  ): Promise<AxiosResponse> {
    return await this._axios.post("/categories", categoryCreate, {
      validateStatus: (status: number) => status === 201,
    })
  }

  public async updateCategory(
    categoryUpdate: CategoryUpdate,
  ): Promise<AxiosResponse> {
    return await this._axios.put("/categories", categoryUpdate, {
      validateStatus: (status: number) => status === 200,
    })
  }

  public async getImageCollection(): Promise<ImageItem[]> {
    const response = await this._axios.get("/collections", {
      validateStatus: (status: number) => status === 200,
    })
    return response.data
  }

  public async checkImageExistCollection(imageID: string): Promise<boolean> {
    const resp = await this._axios.get(
      `/collections/is-exist-collection/${imageID}`,
      {
        validateStatus: (status: number) => status === 200,
      },
    )

    return resp.data
  }

  public async addImageToCollection(imageID: string): Promise<AxiosResponse> {
    console.log(imageID)
    const response = await this._axios.post(
      "/collections",
      {
        imageID,
      },
      {
        validateStatus: (status: number) => status === 200,
      },
    )
    return response
  }

  public async removeImageFromCollection(
    imageID: string,
  ): Promise<AxiosResponse> {
    const response = await this._axios.delete(`/collections/${imageID}`, {
      validateStatus: (status: number) => status === 200,
    })
    return response
  }

  public async myImage(): Promise<ImageItem[]> {
    const resp = await this._axios.get("/images/my-image", {
      validateStatus: (status: number) => status === 200,
    })
    return resp.data
  }
}
