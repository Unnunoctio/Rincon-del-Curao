export type Route = `/${string}`

export interface PathLink {
  name: string
  route: Route
}

interface CategoryQuery {
  name: string
  query: string
}

export interface PathLinkAll extends PathLink {
  categories: CategoryQuery[]
}
