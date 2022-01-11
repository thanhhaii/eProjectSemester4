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
