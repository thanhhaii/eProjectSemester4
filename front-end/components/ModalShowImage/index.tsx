import { ImageItem } from "models/Imagem"
import { Modal } from "react-bootstrap"
import styles from "./ModalShowImage.module.scss"
import Image from "next/image"
import classNames from "classnames"
import NoUserImage from "public/images/noUser.png"
import { useCallback, useEffect, useMemo, useState } from "react"
import { IconCalendarTime, IconInfoSquare, IconAlignJustified } from "@tabler/icons"
import fileDownload from "js-file-download"
import { Format } from "services/timeutil"
import Masonry from "react-masonry-css"
import ImageRenderItem from "../ImageItemRender"
import { User } from "models/Userm"
import ModalUpdateImage from "./ModalUpdateImage"
import { useCategory } from "state/hooks"
import { UpdateImageInfo } from "models/FormValuem"

export interface ModalShowImageProps {
  show: boolean
  onHide: () => void
  imageItem?: ImageItem
  onGetImageRelated: (category: string) => Promise<ImageItem[]>
  user: User | null
  handleUpdateImage: (values: UpdateImageInfo, imageId: string) => Promise<void>
}

const ModalShowImage = (props: ModalShowImageProps) => {
  const {
    show,
    onHide,
    imageItem,
    onGetImageRelated,
    user,
    handleUpdateImage,
  } = props
  const [imageRelated, setImageRelated] = useState<ImageItem[]>([])
  const [isEditMenu, setEditMenu] = useState<boolean>(false)
  const categories = useCategory()

  useEffect(() => {
    if (!imageItem || imageItem.categories.length === 0) {
      return
    }

    ;(async () => {
      const resp = await onGetImageRelated(imageItem.categories[0])
      setImageRelated(resp.filter(image => image.id !== imageItem.id))
    })()
  }, [imageItem, onGetImageRelated])

  const handleDownloadImage = useCallback(() => {
    if (!imageItem) {
      return
    }

    fileDownload(imageItem.imageUrl, "image")
  }, [imageItem])

  const nameOwner = useMemo(() => {
    if (imageItem?.userInfo.firstName || imageItem?.userInfo.lastName) {
      return `${imageItem?.userInfo.firstName} ${imageItem?.userInfo.lastName}`
    }
    return imageItem?.username
  }, [imageItem])

  if (!imageItem) {
    return <></>
  }

  return (
    <>
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
                src={imageItem.userInfo.avatar || NoUserImage}
                width={30}
                height={30}
                className="rounded-circle"
                objectFit={"cover"}
                alt="avatar no user"
              />
              <p className="mb-0 ms-2">{nameOwner}</p>
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
          <div className="row">
            <div className="col-8">
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
                  {imageItem.imageInfo?.title && (
                    <li className="mt-1">
                      <IconInfoSquare size="16" stroke={1} />
                      <p className="small mb-0 ms-2">
                        Title: {imageItem.imageInfo?.title}
                      </p>
                    </li>
                  )}
                  {imageItem.imageInfo?.description && (
                    <li className="mt-1">
                      <IconAlignJustified size="16" stroke={1} />
                      <p className="small mb-0 ms-2">
                        Description: {imageItem.imageInfo?.description}
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-4">
              <div className="text-end mt-3">
                {user && user.id === imageItem.userID && (
                  <button
                    className="btn btn-light btn-sm border"
                    type="button"
                    onClick={() => setEditMenu(true)}>
                    Edit
                  </button>
                )}
              </div>
            </div>
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
      {user && user.id === imageItem.userID && (
        <ModalUpdateImage
          show={isEditMenu}
          onHide={() => setEditMenu(false)}
          imageItem={imageItem}
          categories={categories}
          onUpdateImage={handleUpdateImage}
        />
      )}
    </>
  )
}
export default ModalShowImage
