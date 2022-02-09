import { useCallback, useEffect, useRef } from "react"

export default function useDebounceCallbackFn(wait: number) {
  const timeout = useRef<ReturnType<typeof setTimeout>>()

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
  }

  // make sure our timeout gets cleared if
  // our consuming component gets unmounted
  useEffect(() => cleanup, [])

  const cb = useCallback(
    (fn: () => void) => {
      // clear debounce timer
      cleanup()

      // start waiting again
      timeout.current = setTimeout(() => {
        fn()
      }, wait)
    },
    [wait],
  )

  return cb
}
