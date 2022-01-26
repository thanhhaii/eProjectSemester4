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
