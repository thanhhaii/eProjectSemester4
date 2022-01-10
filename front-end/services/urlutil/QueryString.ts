export interface Param {
  [key: string]: string | number | boolean | undefined
}

/**
 * Parse query string to Param map
 * @param queryStr query string to parse.
 */
export function parseQueryString(queryStr?: string): Param {
  if (typeof queryStr !== "string" || queryStr.length === 0) {
    return {}
  }
  if (queryStr[0] === "?") {
    queryStr = queryStr.substring(1)
  }

  return queryStr.split("&").reduce<Param>((query, pair) => {
    const keyValue = pair.split("=")
    if (keyValue.length > 0) {
      query[keyValue[0]] = decodeURIComponent(keyValue[1])
    }

    return query
  }, {})
}

/**
 * build new query string based on the current query string
 * @param queryParams new query parameters
 * @param currentQueryString current query string
 */
export function buildQueryString(
  queryParams: Param,
  currentQueryString?: string,
): string {
  const finalQuery = Object.assign(
    {},
    parseQueryString(currentQueryString),
    queryParams,
  )
  return Object.keys(finalQuery)
    .filter(key => finalQuery[key] !== undefined && finalQuery[key] !== null)
    .map(
      key => `${key}=${encodeURIComponent(finalQuery[key]?.toString() ?? "")}`,
    )
    .join("&")
}
