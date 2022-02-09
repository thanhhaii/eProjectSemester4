import { ImageItem } from "models/Imagem"
import { useCallback, useEffect, useState } from "react"
import Masonry from "react-masonry-css"
import serverApi from "services/server"
import ImageRenderItem from "components/ImageItemRender"
import ModalShowImage from "components/ModalShowImage"
import { UpdateImageInfo } from "models/FormValuem"
import { useUser } from "state/hooks"
import { useQuery } from "react-query"

export interface CollectionContainerProps {}

const CollectionContainer = (props: CollectionContainerProps) => {
  const [imageCollection, setImageCollection] = useState<ImageItem[]>([])
  const [isShowImage, setShowImage] = useState<boolean>(false)
  const [imageTarget, setImageTarget] = useState<ImageItem | undefined>()
  const user = useUser()

  const { data, refetch } = useQuery("collection", async () => {
    return await serverApi.getImageCollection()
  })

  useEffect(() => {
    if (!data) {
      return
    }
    setImageCollection(data)
  }, [data])

  const handleSelectShowImage = useCallback((imageItem: ImageItem) => {
    setImageTarget(imageItem)
    setShowImage(true)
  }, [])

  const handleGetImageRelated = useCallback(
    async (category: string): Promise<ImageItem[]> => {
      const resp = await serverApi.getImages({
        filterType: "category",
        filterValue: category,
      })
      return resp || []
    },
    [],
  )

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

  const handleCheckExistCollection = useCallback(
    async (imageID: string): Promise<boolean> => {
      return await serverApi.checkImageExistCollection(imageID)
    },
    [],
  )

  const handleAddImageToCollection = useCallback(
    async (imageID: string) => {
      await serverApi.addImageToCollection(imageID)
      refetch()
    },
    [refetch],
  )

  const handleRemoveImageFromCollection = useCallback(
    async (imageID: string) => {
      await serverApi.removeImageFromCollection(imageID)
      refetch()
    },
    [refetch],
  )

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-6">
          <h1>Favorite</h1>
          <p>The images that you have liked will be displayed here</p>
        </div>
        <div className="col-12 mt-4">
          <Masonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {imageCollection.map(item => {
              return (
                <ImageRenderItem
                  imageItem={item}
                  key={item.id}
                  onSelectShowImage={() => handleSelectShowImage(item)}
                />
              )
            })}
          </Masonry>
        </div>
      </div>
      <ModalShowImage
        onAddImageToCollection={handleAddImageToCollection}
        onRemoveImageFromCollection={handleRemoveImageFromCollection}
        handleUpdateImage={handleUpdateImage}
        onCheckExistInCollection={handleCheckExistCollection}
        user={user}
        show={isShowImage}
        onHide={() => setShowImage(false)}
        imageItem={imageTarget}
        onGetImageRelated={handleGetImageRelated}
      />
    </div>
  )
}
export default CollectionContainer
