import { ImageInfo } from "./Imagem"

export interface LoginFormProps {
  username: string
  password: string
}

export interface RegisterFormProps {
  username: string
  password: string
  email: string
}

export interface ForgotPasswordFormProps {
  email: string
}

export interface ResetPasswordFormProps {
  newPassword: string
  confirmPassword: string
}

export interface UploadImageFormProps {
  images: ImageCategoryInfo[]
}

export interface ImageCategoryInfo extends ImageInfo {
  categories?: number[]
  file?: File
  url?: string
  fileID?: string
}
