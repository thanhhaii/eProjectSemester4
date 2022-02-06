import { ImageInfo } from "./Imagem"
import { UserAbout, UserProfile } from "./Userm"

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

export interface UpdateUserProfile extends UserProfile, UserAbout {}

export interface ChangePassword {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
