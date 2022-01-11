import "styles/globals.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import type { AppProps } from "next/app"
import { NextComponentType } from "next"
import { ReactNode } from "react"
import AppLayout from "../container/AppLayout"
import { SSRProvider } from "react-bootstrap"

type GetLayoutComponent = NextComponentType & {
  getLayout?: (page: ReactNode) => ReactNode
}

interface MyAppProps extends AppProps {
  Component: GetLayoutComponent
  pageProps: any
}

function MyApp({ Component, pageProps }: MyAppProps) {

  const getLayout = Component.getLayout || (page => <AppLayout>{page}</AppLayout>)

  return <SSRProvider>{getLayout(<Component {...pageProps} />)}</SSRProvider>
}

export default MyApp
