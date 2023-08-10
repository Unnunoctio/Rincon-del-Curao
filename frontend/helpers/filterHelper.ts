import { ReadonlyURLSearchParams } from 'next/navigation'
import { getNavigateLink } from './pathsHelper'

export const getVariablesFilter = (category: string, searchParams: ReadonlyURLSearchParams): any => {
  const filters = {
    category: getNavigateLink(`/${category}`)?.name
  }

  return filters
}
