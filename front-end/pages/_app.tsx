import "styles/globals.scss"
import type { AppProps } from "next/app"
import { NextComponentType } from "next"
import { ReactNode } from "react"
import AppLayout from "container/AppLayout"
import { SSRProvider } from "react-bootstrap"
import { Provider } from "react-redux"
import getStore from "state/store"
import Bootstrap from "./_bootstrap"

type GetLayoutComponent = NextComponentType & {
  getLayout?: (page: ReactNode) => ReactNode
}

interface MyAppProps extends AppProps {
  Component: GetLayoutComponent
  pageProps: any
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const store = getStore()

  const getLayout =
    Component.getLayout || (page => <AppLayout>{page}</AppLayout>)

  return (
    <Provider store={store}>
      <SSRProvider>
        <Bootstrap>{getLayout(<Component {...pageProps} />)}</Bootstrap>
      </SSRProvider>
    </Provider>
  )
}

export default MyApp
