import { ImageItem } from "models/Imagem"
import styles from "./ImageItemRender.module.scss"
import Image from "next/image"
import NoUserImage from "public/images/noUser.png"
import classNames from "classnames"
import { useMemo } from "react"

export interface ImageItemRenderProps {
  imageItem: ImageItem
  onSelectShowImage: () => void
}

const ImageItemRender = (props: ImageItemRenderProps) => {
  const { imageItem, onSelectShowImage } = props

  const nameOwner = useMemo(() => {
    if (imageItem?.userInfo.firstName || imageItem?.userInfo.lastName) {
      return `${imageItem?.userInfo.firstName} ${imageItem?.userInfo.lastName}`
    }
    return imageItem?.username
  }, [imageItem])

  return (
    <div className={styles.boxImageUploadItem} onClick={onSelectShowImage}>
      <div className={styles.unsetImage}>
        <Image
          alt="image upload"
          src={imageItem.imageUrl}
          layout="fill"
          objectFit="contain"
          className={styles.customImage}
        />
      </div>
      <div className={classNames(styles.boxUser)}>
        <div className="d-flex align-items-center">
          <Image
            src={imageItem.userInfo.avatar || NoUserImage}
            width={40}
            height={40}
            className="rounded-circle"
            objectFit={"cover"}
            alt="avatar no user"
          />
          <p className="mb-0 fw-bold text-light ms-2">{nameOwner}</p>
        </div>
      </div>
    </div>
  )
}
export default ImageItemRender
