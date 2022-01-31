import { Category } from "models/Categorym"
import { ImageItem } from "models/Imagem"
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef, useState } from "react"
import Masonry from "react-masonry-css"
import { QueryFunctionContext, useInfiniteQuery } from "react-query"
import pageUrls from "services/pageUrls"
import serverApi from "services/server"
import { useCategory } from "state/hooks"
import ImageRenderItem from "components/ImageItemRender"
import dynamic from "next/dynamic"

const ModalShowImage = dynamic(() => import("components/ModalShowImage"), {
  ssr: false,
})

export interface ListImageCategoryContainerProps {}

const PAGE_SIZE = 20

type QueryKey = [
  string,
  {
    keyword?: string
    categoryName?: string
  },
]

const fetchImages = async (params: QueryFunctionContext<QueryKey, number>) => {
  const { queryKey, pageParam } = params
  const [, { keyword, categoryName }] = queryKey
  const resp = await serverApi.getImages({
    keyword: keyword || "",
    start: pageParam || 0,
    filterType: "category",
    filterValue: categoryName,
  })
  return resp
}

const ListImageCategoryContainer = (props: ListImageCategoryContainerProps) => {
  const router = useRouter()
  const categories = useCategory()
  const { keyword } = router.query
  const currentPage = useRef(0)
  const categoryName = router.query.categoryName?.toString() || ""
  const [category, setCategory] = useState<Category>()
  const [images, setImages] = useState<ImageItem[]>([])
  const [isShowImage, setShowImage] = useState<boolean>(false)
  const [imageTarget, setImageTarget] = useState<ImageItem | undefined>()

  const {
    data,
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
        categoryName: categoryName,
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

  useEffect(() => {
    if (
      categoryName === "" ||
      !categories.some(category => category.categoryName === categoryName)
    ) {
      router.replace(pageUrls.notFound)
      return
    }
    categories.forEach(category => {
      if (category.categoryName === categoryName) {
        setCategory(category)
      }
    })
  })

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

  return (
    <div className="container pt-5">
      <div className="row ">
        <div className="col-6">
          <h1>{category?.categoryName}</h1>
          <p>{category?.description}</p>
        </div>
        <div className="col-12 mt-4">
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
      </div>
      <ModalShowImage
        show={isShowImage}
        onHide={() => setShowImage(false)}
        imageItem={imageTarget}
        onGetImageRelated={handleGetImageRelated}
      />
    </div>
  )
}
export default ListImageCategoryContainer
