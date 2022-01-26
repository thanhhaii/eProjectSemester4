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
