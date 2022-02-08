import styles from "./HomePage.module.scss"
import Image from "next/image"
import ImageBackground from "public/images/bghomepage.jpg"
import { useInfiniteQuery, QueryFunctionContext } from "react-query"
import { useRouter } from "next/router"
import serverApi from "services/server"
import { useCallback, useEffect, useRef, useState } from "react"
import Masonry from "react-masonry-css"
import { ImageItem } from "models/Imagem"
import ImageRenderItem from "components/ImageItemRender"
import classNames from "classnames"
import dynamic from "next/dynamic"
import { useUser } from "state/hooks"
import { UpdateImageInfo } from "models/FormValuem"

const ModalShowImage = dynamic(() => import("components/ModalShowImage"), {
  ssr: false,
})

export interface HomePageContainerProps {}

const PAGE_SIZE = 20

type QueryKey = [
  string,
  {
    keyword?: string
  },
]

const fetchImages = async (params: QueryFunctionContext<QueryKey, number>) => {
  const { queryKey, pageParam } = params
  const [, { keyword }] = queryKey
  const resp = await serverApi.getImages({
    keyword: keyword || "",
    start: pageParam || 0,
  })
  return resp
}

const HomePageContainer = (props: HomePageContainerProps) => {
  const router = useRouter()
  const user = useUser()
  const { keyword } = router.query
  const currentPage = useRef(0)
  const [isShowImage, setShowImage] = useState<boolean>(false)
  const [imageTarget, setImageTarget] = useState<ImageItem | undefined>()
  const [images, setImages] = useState<ImageItem[]>([])
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    [
      "images",
      {
        keyword: keyword?.toString(),
      },
    ],
    fetchImages,
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage || lastPage.length < PAGE_SIZE) {
          return undefined
        }

        return serverApi.pageToStartOffset(currentPage.current + 1, PAGE_SIZE)
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
    },
  )

  useEffect(() => {
    setImages(
      data?.pages?.reduce((result, page) => {
        page?.forEach(item => result.push(item))
        return result
      }, []) || [],
    )
  }, [data])

  const handleSelectShowImage = useCallback((imageItem: ImageItem) => {
    setImageTarget(imageItem)
    setShowImage(true)
  }, [])

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
      refetch()
    },
    [refetch],
  )

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
    <>
      <div className={styles.backgroundPage}>
        <Image
          alt="background"
          src={ImageBackground}
          objectFit="cover"
          layout="fill"
          objectPosition="top"
          priority
        />
      </div>
      <div className={classNames("mt-5 container", styles.boxRenderImage)}>
        <Masonry
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {images.map(item => {
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
      <ModalShowImage
        onCheckExistInCollection={handleCheckExistCollection}
        onAddImageToCollection={handleAddImageToCollection}
        onRemoveImageFromCollection={handleRemoveImageFromCollection}
        handleUpdateImage={handleUpdateImage}
        user={user}
        show={isShowImage}
        onHide={() => setShowImage(false)}
        imageItem={imageTarget}
        onGetImageRelated={handleGetImageRelated}
      />
    </>
  )
}
export default HomePageContainer
