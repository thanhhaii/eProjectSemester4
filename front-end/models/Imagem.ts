export interface ImageInfo {
  width?: number
  height?: number
  description?: string
  title?: string
  fileType?: string
}

export interface ImageRef {
  url: string
  height: number
  width: number
  fileType: string
  fileID: string
}

export interface ImageItem {
  id: string
  imageInfo: ImageInfo | null
  imageUrl: string
  userID: string
  username: string
  userInfo: string
  updatedAt: string
  createdAt: string
  premium: boolean
}
