import { ImageRef } from "models/Imagem"
import { useEffect, useState } from "react"
import styles from "./ModalUploadImage.module.scss"
import Image from "next/image"

export interface ImageUploadItemProps {
  file?: File
  onUploadImage: (file: File) => Promise<ImageRef>
  onUploaded: (imageResponse: ImageRef) => void
}

const ImageUploadItem = (props: ImageUploadItemProps) => {
  const { file, onUploadImage, onUploaded } = props
  const [isLoading, setLoading] = useState<boolean>(false)
  const [blogUrl, setBlogUrl] = useState<string>()

  useEffect(() => {
    if (!file) {
      return
    }
    const url = URL.createObjectURL(file)
    setBlogUrl(url)
    const uploadImage = async () => {
      setLoading(true)
      const imageResponse = await onUploadImage(file)
      onUploaded(imageResponse)
      setLoading(false)
    }
    uploadImage()
    return () => {
      URL.revokeObjectURL(url)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.boxImageUploadItem}>
      <div className={styles.unsetImage}>
        {blogUrl && (
          <Image
            alt="image upload"
            src={blogUrl}
            layout="fill"
            objectFit="contain"
            className={styles.customImage}
          />
        )}
      </div>
      {isLoading && (
        <div className={styles.boxLoading}>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  )
}
export default ImageUploadItem
