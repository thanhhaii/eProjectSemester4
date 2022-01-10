import NextLink from "next/link"
import { AnchorHTMLAttributes, PropsWithChildren } from "react"
import { BuildUrlWithOptions, BuilderOption } from "services/urlutil"
import classNames from "classnames"

type Url = string | BuilderOption

export interface LinkProps
  extends PropsWithChildren<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">> {
  href: Url
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
  passHref?: boolean
  prefetch?: boolean
  locale?: string | false
}

export default function Link(props: LinkProps) {
  const {
    href,
    replace,
    scroll,
    shallow,
    prefetch,
    locale,
    children,
    ...rest
  } = props
  let finalHref = ""
  if (typeof href === "string") {
    finalHref = href
  } else {
    finalHref = BuildUrlWithOptions(href)
  }

  return (
    <NextLink
      href={finalHref}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      locale={locale}>
      <a {...rest} className={classNames("text-decoration-none", rest.className)}>{children}</a>
    </NextLink>
  )
}
