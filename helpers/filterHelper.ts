// import { ReadonlyURLSearchParams } from 'next/navigation'
import { getNavigateLink } from './pathsHelper'
import { Filter } from './types'

export const parseSearchParams = (searchParams: any): string => {
  const queryString = Object.keys(searchParams).map(key => {
    if (Array.isArray(searchParams[key])) {
      // Si es un array, crea una cadena para cada elemento
      return searchParams[key].map((value: string) => `${key}=${encodeURIComponent(value)}`)
    } else {
      return `${key}=${encodeURIComponent(searchParams[key])}`
    }
  }).flat().join('&')

  return queryString
}

// export const getVariablesFilter = (category: string, searchParams: ReadonlyURLSearchParams): Filter => {
export const getVariablesFilter = (category: string, queryString: string): Filter => {
  const searchParams = new URLSearchParams(queryString)

  const filters: Filter = {
    category: getNavigateLink(`/${category}`)?.name ?? ''
  }
  // Obtener las otras variables
  if (searchParams.getAll('category').length > 0) {
    filters.sub_category = searchParams.getAll('category')
  }
  if (searchParams.getAll('brand').length > 0) {
    filters.brand = searchParams.getAll('brand')
  }
  if (searchParams.getAll('content').length > 0) {
    filters.content = searchParams.getAll('content').map((value) => parseInt(value))
  }
  if (searchParams.getAll('quantity').length > 0) {
    filters.quantity = searchParams.getAll('quantity').map((value) => parseInt(value))
  }
  if (searchParams.getAll('package').length > 0) {
    filters.package = searchParams.getAll('package')
  }

  return filters
}
