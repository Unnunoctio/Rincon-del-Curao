import { FilterOptions } from '@/types/types'

export const getFilterOptions = (searchParams: { [key: string]: string | string[] | undefined }): FilterOptions => {
  const options: FilterOptions = {}

  if (searchParams.brand !== undefined) {
    Array.isArray(searchParams.brand) ? (options.brand = searchParams.brand) : (options.brand = [searchParams.brand])
  }

  return options
}
