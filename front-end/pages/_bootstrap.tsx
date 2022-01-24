import { ReactNode, useEffect, useState } from "react"
import serverApi from "services/server"
import { isServer } from "services/ssrutils"
import tokenManager from "services/token-manager"
import { useAppDispatch } from "state/hooks"
import { userIdentified } from "state/userSlice"

export interface AppInitProps {
  children: ReactNode
}

export default function Bootstrap({ children }: AppInitProps) {
  const dispatch = useAppDispatch()
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    if (initialized) {
      return
    }

    async function getUser() {
      if (!!tokenManager.getToken()) {
        const user = await serverApi.getMe()
        dispatch(userIdentified(user))
      } else {
        dispatch(userIdentified(null))
      }
    }

    getUser()
    setInitialized(true)
  }, [dispatch, initialized])

  if (!isServer() && !initialized) {
    return <></>
  }

  return <>{children}</>
}
