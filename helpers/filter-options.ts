import { FilterOptions } from '@/types/types'

export const getFilterOptions = (searchParams: { [key: string]: string | string[] | undefined }): FilterOptions => {
  const options: FilterOptions = {}

  if (searchParams.category !== undefined) {
    Array.isArray(searchParams.category) ? (options.subCategory = searchParams.category) : (options.subCategory = [searchParams.category])
  }
  if (searchParams.brand !== undefined) {
    Array.isArray(searchParams.brand) ? (options.brand = searchParams.brand) : (options.brand = [searchParams.brand])
  }
  if (searchParams.content !== undefined) {
    Array.isArray(searchParams.content) ? (options.content = searchParams.content) : (options.content = [searchParams.content])
  }
  if (searchParams.quantity !== undefined) {
    Array.isArray(searchParams.quantity) ? (options.quantity = searchParams.quantity) : (options.quantity = [searchParams.quantity])
  }
  if (searchParams.package !== undefined) {
    Array.isArray(searchParams.package) ? (options.package = searchParams.package) : (options.package = [searchParams.package])
  }

  return options
}
