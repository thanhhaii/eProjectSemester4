export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
  email: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
}

export interface AddImageToCategoryRequest {
  imageID: string
  categoryIDs: number[]
}

export interface GetImagesRequest {
  start?: number
  limit?: number
  keyword?: string
  filterType?: "category" | ""
  filterValue?: string
}

export interface UpdateImageInfo {
  categoryIDs: number[]
  title: string
  description: string
}
