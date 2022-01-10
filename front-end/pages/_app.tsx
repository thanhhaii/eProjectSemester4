import "styles/globals.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import type { AppProps } from "next/app"
import { NextComponentType } from "next"
import { ReactNode } from "react"

type GetLayoutComponent = NextComponentType & {
  getLayout?: (page: ReactNode) => ReactNode
}

interface MyAppProps extends AppProps {
  Component: GetLayoutComponent
  pageProps: any
}

function MyApp({ Component, pageProps }: MyAppProps) {

  const getLayout = Component.getLayout || (page => <>{page}</>)

  return <>{getLayout(<Component {...pageProps} />)}</>
}

export default MyApp
