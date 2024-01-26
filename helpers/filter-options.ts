import { FilterOptions } from '@/types/types'

export const getFilterOptions = (searchParams: { [key: string]: string | string[] | undefined }): [FilterOptions, string] => {
  const options: FilterOptions = {}
  let optionsText = ''

  if (searchParams.sub_category !== undefined) {
    Array.isArray(searchParams.sub_category) ? (options.subCategory = searchParams.sub_category) : (options.subCategory = [searchParams.sub_category])
    optionsText += `sub_category=${searchParams.sub_category.toString()}`
  }
  if (searchParams.brand !== undefined) {
    Array.isArray(searchParams.brand) ? (options.brand = searchParams.brand) : (options.brand = [searchParams.brand])
    optionsText += `&brand=${searchParams.brand.toString()}`
  }
  if (searchParams.content !== undefined) {
    Array.isArray(searchParams.content) ? (options.content = searchParams.content) : (options.content = [searchParams.content])
    optionsText += `&content=${searchParams.content.toString()}`
  }
  if (searchParams.quantity !== undefined) {
    Array.isArray(searchParams.quantity) ? (options.quantity = searchParams.quantity) : (options.quantity = [searchParams.quantity])
    optionsText += `&quantity=${searchParams.quantity.toString()}`
  }
  if (searchParams.package !== undefined) {
    Array.isArray(searchParams.package) ? (options.package = searchParams.package) : (options.package = [searchParams.package])
    optionsText += `&package=${searchParams.package.toString()}`
  }

  return [options, optionsText]
}
