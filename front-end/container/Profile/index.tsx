import { useRouter } from "next/router"
import { useIsomorphicLayoutEffect } from "react-use"
import pageUrls from "services/pageUrls"
import { useUser } from "state/hooks"
import NoUserImage from "public/images/noUser.png"
import Image from "next/image"
import { IconEdit } from "@tabler/icons"
import Link from "components/Link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ImageItem } from "models/Imagem"
import serverApi from "services/server"
import Masonry from "react-masonry-css"
import ImageRenderItem from "components/ImageItemRender"
import ModalShowImage from "components/ModalShowImage"
import { UpdateImageInfo } from "models/FormValuem"

export interface ProfileContainerProps {}

const ProfileContainer = (props: ProfileContainerProps) => {
  const user = useUser()
  const router = useRouter()
  const [myImage, setMyImage] = useState<ImageItem[]>([])
  const [isShowImage, setShowImage] = useState<boolean>(false)
  const [imageTarget, setImageTarget] = useState<ImageItem | undefined>()

  useIsomorphicLayoutEffect(() => {
    if (user) {
      return
    }

    if (router.query?.returnUrl) {
      router.replace(router.query?.returnUrl.toString())
    } else {
      router.replace(pageUrls.home)
    }
  }, [router, user])

  useEffect(() => {
    ;(async () => {
      setMyImage(await serverApi.myImage())
    })()
  }, [])

  const nameOwner = useMemo(() => {
    if (!user?.profile) {
      return
    }
    if (user?.profile.firstName || user?.profile.lastName) {
      return `${user?.profile.firstName} ${user?.profile.lastName}`
    }
    return user?.username
  }, [user])

  const handleUpdateImage = useCallback(
    async (values: UpdateImageInfo, imageId: string) => {
      await serverApi.updateImageInfo(
        {
          title: values.title,
          description: values.description,
          categoryIDs: values.categoryIDs,
        },
        imageId,
      )
    },
    [],
  )

  const handleAddImageToCollection = useCallback(async (imageID: string) => {
    await serverApi.addImageToCollection(imageID)
  }, [])

  const handleRemoveImageFromCollection = useCallback(
    async (imageID: string) => {
      await serverApi.removeImageFromCollection(imageID)
    },
    [],
  )

  const handleCheckExistCollection = useCallback(
    async (imageID: string): Promise<boolean> => {
      return await serverApi.checkImageExistCollection(imageID)
    },
    [],
  )

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-5 my-5">
          <div className="row">
            <div className="col-auto">
              <div className="position-relative">
                <Image
                  src={user?.profile?.avatar || NoUserImage}
                  alt="avatar user"
                  width={150}
                  height={150}
                  className="rounded-circle"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="col">
              <div className="d-flex align-items-center">
                <h1 className="d-inline-block me-3">
                  {nameOwner || user?.username}
                </h1>
                <Link
                  href={pageUrls.account}
                  className="btn btn-light border btn-sm shadow-none"
                  type="button">
                  <IconEdit size="16" stroke="1" className="me-1" />
                  Edit Profile
                </Link>
              </div>
              <p>
                {user?.about?.bio ||
                  "Download free, beautiful high-quality photos curated"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-8">
          <h4 className="my-3 ms-2">My image</h4>
        </div>
        <hr />
        <div className="col-8">
          <Masonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {myImage.map(item => {
              return (
                <ImageRenderItem
                  imageItem={item}
                  key={item.id}
                  onSelectShowImage={() => {
                    setImageTarget(item)
                    setShowImage(true)
                  }}
                />
              )
            })}
          </Masonry>
        </div>
        <ModalShowImage
          onCheckExistInCollection={handleCheckExistCollection}
          onAddImageToCollection={handleAddImageToCollection}
          onRemoveImageFromCollection={handleRemoveImageFromCollection}
          handleUpdateImage={handleUpdateImage}
          user={user}
          show={isShowImage}
          onHide={() => setShowImage(false)}
          imageItem={imageTarget}
          onGetImageRelated={() => {
            return new Promise(resolve => {
              resolve(myImage)
            })
          }}
        />
      </div>
    </div>
  )
}
export default ProfileContainer
