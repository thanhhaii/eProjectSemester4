import { ImageItem } from "models/Imagem"
import styles from "./HomePage.module.scss"
import Image from "next/image"
import NoUserImage from "public/images/noUser.png"
import classNames from "classnames"

export interface ImageRenderItemProps {
  imageItem: ImageItem
  onSelectShowImage: () => void
}

const ImageRenderItem = (props: ImageRenderItemProps) => {
  const { imageItem, onSelectShowImage } = props

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
            src={NoUserImage}
            width={40}
            height={40}
            className="rounded-circle"
            objectFit={"cover"}
            alt="avatar no user"
          />
          <p className="mb-0 fw-bold text-light ms-2">{imageItem.username}</p>
        </div>
      </div>
    </div>
  )
}
export default ImageRenderItem
