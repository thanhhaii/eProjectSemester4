import { FunctionComponent, ReactNode } from "react"

export function withEmptyLayout<T>(Component: FunctionComponent<T>){

  function EmptyLayout(props: T){
    return <Component {...props} />
  }

  EmptyLayout.getLayout = (page: ReactNode) => <>{page}</>
  return EmptyLayout
}
