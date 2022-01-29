import { ImageItem } from "models/Imagem"
import { Modal } from "react-bootstrap"
import styles from "./HomePage.module.scss"
import Image from "next/image"
import classNames from "classnames"
import NoUserImage from "public/images/noUser.png"
import { useCallback, useEffect, useState } from "react"
import { IconCalendarTime } from "@tabler/icons"
import fileDownload from "js-file-download"
import { Format } from "services/timeutil"
import Masonry from "react-masonry-css"
import ImageRenderItem from "./ImageRenderItem"

export interface ModalShowImageProps {
  show: boolean
  onHide: () => void
  imageItem?: ImageItem
  onGetImageRelated: (category: string) => Promise<ImageItem[]>
}

const ModalShowImage = (props: ModalShowImageProps) => {
  const { show, onHide, imageItem, onGetImageRelated } = props
  const [imageRelated, setImageRelated] = useState<ImageItem[]>([])

  useEffect(() => {
    if (!imageItem || imageItem.categories.length === 0) {
      return
    }

    ;(async () => {
      setImageRelated(await onGetImageRelated(imageItem.categories[0]))
    })()
  }, [imageItem, onGetImageRelated])

  const handleDownloadImage = useCallback(() => {
    if (!imageItem) {
      return
    }

    fileDownload(imageItem.imageUrl, "image")
  }, [imageItem])

  if (!imageItem) {
    return <></>
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName={styles.modalShowImageDetail}
      size="xl">
      <Modal.Body className={classNames(styles.modalBody, "p-3")}>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <Image
              src={NoUserImage}
              width={30}
              height={30}
              className="rounded-circle"
              objectFit={"cover"}
              alt="avatar no user"
            />
            <p className="mb-0 ms-2">{imageItem.username}</p>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-light btn-sm border"
              onClick={handleDownloadImage}>
              Download
            </button>
          </div>
        </div>
        <div className={styles.imageItem}>
          <div className={styles.boxImageModal}>
            <Image
              alt="image upload"
              src={imageItem.imageUrl}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="my-3">
          <div className="mb-2">
            <p className="small mb-0">Category</p>
            {imageItem.categories.map(category => {
              return (
                <span key={category} className="small fw-bold">
                  {category}
                </span>
              )
            })}
          </div>
          <ul className={styles.listInfo}>
            <li>
              <IconCalendarTime size="16" stroke={1} />
              <p className="mb-0 small ms-2">
                Publish on{" "}
                {Format(new Date(imageItem.createdAt), "LLL dd, yyyy")}
              </p>
            </li>
            <li></li>
          </ul>
        </div>
        <div className={styles.boxImageRelated}>
          {imageRelated.length > 0 && (
            <h4 className="fw-bold">Image related</h4>
          )}
          <Masonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {imageRelated.map(item => {
              return (
                <ImageRenderItem
                  imageItem={item}
                  key={item.id}
                  onSelectShowImage={() => {}}
                />
              )
            })}
          </Masonry>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default ModalShowImage
