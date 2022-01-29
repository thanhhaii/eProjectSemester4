import "styles/globals.scss"
import type { AppProps } from "next/app"
import { NextComponentType } from "next"
import { ReactNode, useState } from "react"
import AppLayout from "container/AppLayout"
import { SSRProvider } from "react-bootstrap"
import { Provider } from "react-redux"
import getStore from "state/store"
import Bootstrap from "./_bootstrap"
import { QueryClient, QueryClientProvider } from "react-query"

type GetLayoutComponent = NextComponentType & {
  getLayout?: (page: ReactNode) => ReactNode
}

interface MyAppProps extends AppProps {
  Component: GetLayoutComponent
  pageProps: any
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const store = getStore()
  const [queryClient] = useState(() => new QueryClient())

  const getLayout =
    Component.getLayout || (page => <AppLayout>{page}</AppLayout>)

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SSRProvider>
          <Bootstrap>{getLayout(<Component {...pageProps} />)}</Bootstrap>
        </SSRProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
