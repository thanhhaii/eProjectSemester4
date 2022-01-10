import { buildQueryString, Param } from "./QueryString"

export interface BuilderOption {
  path?: string
  pathParams?: Param
  queryParams?: Param
  baseUrl?: string
}
type UrlBuilderOptionConfigure = (option: BuilderOption) => void

function ExpandPath(path?: string, pathParams?: Param): string | undefined {
  if (!path) {
    return undefined
  }
  if (pathParams === undefined) {
    return path
  }

  return path.replace(/\{[a-z0-9A-Z_]+\}/g, param => {
    const key = param.substring(1, param.length - 1)
    if (typeof pathParams[key] === "string") {
      return pathParams[key] as string
    }

    return param
  })
}

function ExpandQueryString(queryParams?: Param): string | undefined {
  if (!queryParams) {
    return undefined
  }

  return buildQueryString(queryParams)
}

export function AppendPrefix(
  prefix: string,
  path?: string,
): string | undefined {
  if (typeof path === "string" && path.length > 0) {
    return prefix + path
  }
  return undefined
}

export function WithBaseURl(baseUrl: string): UrlBuilderOptionConfigure {
  return (option: BuilderOption) => {
    option.baseUrl = baseUrl
  }
}

export function WithPath(
  path: string,
  params?: Param,
): UrlBuilderOptionConfigure {
  return (option: BuilderOption) => {
    option.path = path
    option.pathParams = params
  }
}

export function WithQueryParams(params?: Param): UrlBuilderOptionConfigure {
  return (option: BuilderOption) => {
    option.queryParams = params
  }
}

export function BuildUrl(...configures: UrlBuilderOptionConfigure[]): string {
  const option: BuilderOption = {}
  for (const configure of configures) {
    configure(option)
  }

  return BuildUrlWithOptions(option)
}

export function BuildUrlWithOptions({
  baseUrl,
  path,
  pathParams,
  queryParams,
}: BuilderOption): string {
  return [
    baseUrl,
    ExpandPath(path, pathParams),
    AppendPrefix("?", ExpandQueryString(queryParams)),
  ]
    .filter(Boolean)
    .join("")
}
