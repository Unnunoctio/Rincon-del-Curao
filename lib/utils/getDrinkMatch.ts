import { FilterOptions } from '@/types/types'

export const getDrinkMatch = (category: string, options: FilterOptions): any => {
  const match: any = {
    category
  }
  if (options.subCategory !== undefined) match.sub_category = { $in: options.subCategory }
  if (options.brand !== undefined) match.brand = { $in: options.brand }
  if (options.content !== undefined) match.content = { $in: options.content }
  if (options.package !== undefined) match.package = { $in: options.package }

  return match
}
