import { ImageItem } from "models/Imagem"
import { Modal } from "react-bootstrap"
import styles from "./ModalShowImage.module.scss"
import Image from "next/image"
import classNames from "classnames"
import NoUserImage from "public/images/noUser.png"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  IconCalendarTime,
  IconInfoSquare,
  IconAlignJustified,
  IconHeart,
} from "@tabler/icons"
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
  onCheckExistInCollection?: (imageID: string) => Promise<boolean>
  onAddImageToCollection: (imageID: string) => Promise<void>
  onRemoveImageFromCollection: (imageID: string) => Promise<void>
}

const ModalShowImage = (props: ModalShowImageProps) => {
  const {
    show,
    onHide,
    imageItem,
    onGetImageRelated,
    user,
    handleUpdateImage,
    onCheckExistInCollection,
    onAddImageToCollection,
    onRemoveImageFromCollection,
  } = props
  const [imageItemTarget, setImageItemTarget] = useState<ImageItem>()
  const [imageRelated, setImageRelated] = useState<ImageItem[]>([])
  const [isEditMenu, setEditMenu] = useState<boolean>(false)
  const [isExistCollection, setExistCollection] = useState<boolean>(false)
  const categories = useCategory()

  useEffect(() => {
    setImageItemTarget(imageItem)
  }, [imageItem])

  useEffect(() => {
    if (!imageItemTarget || imageItemTarget.categories.length === 0) {
      return
    }

    ;(async () => {
      const resp = await onGetImageRelated(imageItemTarget.categories[0])
      setImageRelated(resp.filter(image => image.id !== imageItemTarget.id))
    })()
  }, [imageItemTarget, onGetImageRelated])

  useEffect(() => {
    if (!imageItemTarget) {
      return
    }
    console.log("a")
    ;(async () => {
      if (user && onCheckExistInCollection) {
        setExistCollection(await onCheckExistInCollection(imageItemTarget.id))
      }
    })()
  }, [onCheckExistInCollection, imageItemTarget, user])

  const handleDownloadImage = useCallback(() => {
    if (!imageItemTarget) {
      return
    }

    fileDownload(imageItemTarget.imageUrl, "image")
  }, [imageItemTarget])

  const nameOwner = useMemo(() => {
    if (
      imageItemTarget?.userInfo.firstName ||
      imageItemTarget?.userInfo.lastName
    ) {
      return `${imageItemTarget?.userInfo.firstName} ${imageItemTarget?.userInfo.lastName}`
    }
    return imageItemTarget?.username
  }, [imageItemTarget])

  const handleToggleImageCollection = useCallback(async () => {
    if (!imageItemTarget) {
      return
    }
    console.log(imageItemTarget.id)
    if (isExistCollection) {
      await onRemoveImageFromCollection(imageItemTarget.id)
    } else {
      await onAddImageToCollection(imageItemTarget.id)
    }
    setExistCollection(state => !state)
  }, [
    imageItemTarget,
    isExistCollection,
    onAddImageToCollection,
    onRemoveImageFromCollection,
  ])

  const handleSelectImageRelated = useCallback((item: ImageItem) => {
    setImageItemTarget(item)
    document.getElementsByClassName("fade modal show")[0].scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [])

  if (!imageItemTarget) {
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
                src={imageItemTarget.userInfo.avatar || NoUserImage}
                width={30}
                height={30}
                className="rounded-circle"
                objectFit={"cover"}
                alt="avatar no user"
              />
              <p className="mb-0 ms-2">{nameOwner}</p>
            </div>
            <div>
              {user && (
                <button
                  type="button"
                  onClick={handleToggleImageCollection}
                  className="btn btn-light btn-sm border me-2">
                  {isExistCollection ? (
                    <IconHeart size="16" stroke="0" fill="red" />
                  ) : (
                    <IconHeart size="16" stroke="1.5" />
                  )}
                </button>
              )}
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
                src={imageItemTarget.imageUrl}
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
                  {imageItemTarget.categories.map(category => {
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
                      {Format(
                        new Date(imageItemTarget.createdAt),
                        "LLL dd, yyyy",
                      )}
                    </p>
                  </li>
                  {imageItemTarget.imageInfo?.title && (
                    <li className="mt-1">
                      <IconInfoSquare size="16" stroke={1} />
                      <p className="small mb-0 ms-2">
                        Title: {imageItemTarget.imageInfo?.title}
                      </p>
                    </li>
                  )}
                  {imageItemTarget.imageInfo?.description && (
                    <li className="mt-1">
                      <IconAlignJustified size="16" stroke={1} />
                      <p className="small mb-0 ms-2">
                        Description: {imageItemTarget.imageInfo?.description}
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-4">
              <div className="text-end mt-3">
                {user && user.id === imageItemTarget.userID && (
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
                    onSelectShowImage={() => handleSelectImageRelated(item)}
                  />
                )
              })}
            </Masonry>
          </div>
        </Modal.Body>
      </Modal>
      {user && user.id === imageItemTarget.userID && (
        <ModalUpdateImage
          show={isEditMenu}
          onHide={() => setEditMenu(false)}
          imageItem={imageItemTarget}
          categories={categories}
          onUpdateImage={handleUpdateImage}
        />
      )}
    </>
  )
}
export default ModalShowImage
