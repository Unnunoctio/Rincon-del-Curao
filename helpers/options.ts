import { FilterOptions, SearchParams } from '@/types/types'

export const getOptions = (searchParams: SearchParams): FilterOptions => {
  const options: FilterOptions = {}

  if (searchParams.search !== undefined) {
    options.search = searchParams.search.toString()
  }
  if (!isNaN(Number(searchParams.price_min))) {
    options.priceMin = Number(searchParams.price_min)
  }
  if (!isNaN(Number(searchParams.price_max))) {
    options.priceMax = Number(searchParams.price_max)
  }
  if (!isNaN(Number(searchParams.grade_min))) {
    options.gradeMin = Number(searchParams.grade_min)
  }
  if (!isNaN(Number(searchParams.grade_max))) {
    options.gradeMax = Number(searchParams.grade_max)
  }
  if (searchParams.sub_category !== undefined) {
    Array.isArray(searchParams.sub_category) ? (options.subCategory = searchParams.sub_category) : (options.subCategory = [searchParams.sub_category])
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
