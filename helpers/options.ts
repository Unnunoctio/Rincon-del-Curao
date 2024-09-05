import { Filter, SearchParams } from '@/types/types'

export const getOptions = (searchParams: SearchParams): Filter => {
  const options: Filter = {}

  if (searchParams.search !== undefined) {
    options.search = searchParams.search.toString()
  }
  if (!isNaN(Number(searchParams.price_min))) {
    options.priceMin = Number(searchParams.price_min)
  }
  if (!isNaN(Number(searchParams.price_max))) {
    options.priceMax = Number(searchParams.price_max)
  }
  if (!isNaN(Number(searchParams.abv_min))) {
    options.abvMin = Number(searchParams.abv_min)
  }
  if (!isNaN(Number(searchParams.abv_max))) {
    options.abvMax = Number(searchParams.abv_max)
  }
  if (searchParams.sub_category !== undefined) {
    Array.isArray(searchParams.sub_category) ? (options.subCategory = searchParams.sub_category) : (options.subCategory = [searchParams.sub_category])
  }
  if (searchParams.brand !== undefined) {
    Array.isArray(searchParams.brand) ? (options.brand = searchParams.brand) : (options.brand = [searchParams.brand])
  }
  if (searchParams.volume !== undefined) {
    Array.isArray(searchParams.volume) ? (options.volume = searchParams.volume) : (options.volume = [searchParams.volume])
  }
  if (searchParams.quantity !== undefined) {
    Array.isArray(searchParams.quantity) ? (options.quantity = searchParams.quantity) : (options.quantity = [searchParams.quantity])
  }
  if (searchParams.packaging !== undefined) {
    Array.isArray(searchParams.packaging) ? (options.packaging = searchParams.packaging) : (options.packaging = [searchParams.packaging])
  }

  return options
}
