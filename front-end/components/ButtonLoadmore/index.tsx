import ButtonLoading from "components/ButtonLoading"
import useDebounceCallbackFn from "hooks/useDebounceCallback"
import React, { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

export interface LoadMoreButtonProps {
  isLoading: boolean
  hasMore: boolean
  loadMore: () => void
}

export default function LoadMoreButton(props: LoadMoreButtonProps) {
  const { isLoading, hasMore, loadMore } = props
  const { ref, inView } = useInView({
    delay: 300,
    threshold: 1,
  })
  const [isHideInView, setHideInview] = useState<boolean>(false)

  const debounce = useDebounceCallbackFn(300)

  const debouncedLoadMore = useCallback(() => {
    debounce(() => {
      loadMore()
    })
  }, [loadMore, debounce])

  useEffect(() => {
    if (!isLoading) {
      setHideInview(false)
    }
  }, [isLoading])

  useEffect(() => {
    if (inView) {
      debouncedLoadMore()
      setHideInview(true)
    }
  }, [inView, debouncedLoadMore])

  if (!!!hasMore) {
    return <></>
  }

  return (
    <>
      <ButtonLoading
        isLoading={!!isLoading}
        disabled={!hasMore}
        className="btn btn-soft-primary w-auto m-auto my-3"
        id="item"
        onClick={debouncedLoadMore}
        forwardRef={node => {
          !isHideInView ? ref(node) : {}
        }}>
        {isLoading ? "Đang tải..." : "Tải thêm"}
      </ButtonLoading>
    </>
  )
}
