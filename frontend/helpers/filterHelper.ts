import { ReadonlyURLSearchParams } from 'next/navigation'
import { getNavigateLink } from './pathsHelper'
import { Filter } from './types'

export const getVariablesFilter = (category: string, searchParams: ReadonlyURLSearchParams): Filter => {
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

  return filters
}
