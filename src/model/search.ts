
interface Search {
  query: string
  filters: QueryFilter[]
}

interface QueryFilter {
  site: string
}

export { Search, QueryFilter }
