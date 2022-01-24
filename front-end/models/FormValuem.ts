import { ImageUpload } from "./Imagem"

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
  images: ImageUpload[]
}
