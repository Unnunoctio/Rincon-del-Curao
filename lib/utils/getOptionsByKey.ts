/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { OptionType } from '@/types/api'
import { FilterOptions } from '@/types/types'

export const getOptionsByKey = (products: any, options: FilterOptions, filterKey: string, inDrink: boolean): OptionType[] => {
  const grouped = products.reduce((acc: any, product: any) => {
    if (inDrink) {
      if (!acc[product.drink[filterKey]]) acc[product.drink[filterKey]] = []
      acc[product.drink[filterKey]].push(product)
      return acc
    } else {
      if (!acc[product[filterKey]]) acc[product[filterKey]] = []
      acc[product[filterKey]].push(product)
      return acc
    }
  }, {})

  const values = Object.keys(grouped).map(key => {
    let products = grouped[key]
    // Filtra por Sub Category
    if (options.subCategory !== undefined && filterKey !== 'sub_category') {
      products = products.filter((p: any) => options.subCategory?.includes(p.drink.sub_category))
    }
    // Filtra por Brand
    if (options.brand !== undefined && filterKey !== 'brand') {
      products = products.filter((p: any) => options.brand?.includes(p.drink.brand))
    }
    // Filtra por Content
    if (options.content !== undefined && filterKey !== 'content') {
      products = products.filter((p: any) => options.content?.includes(`${p.drink.content as number}`))
    }
    // Filtra por Quantity
    if (options.quantity !== undefined && filterKey !== 'quantity') {
      products = products.filter((p: any) => options.quantity?.includes(`${p.quantity as number}`))
    }
    // Filtra por Package
    if (options.package !== undefined && filterKey !== 'package') {
      products = products.filter((p: any) => options.package?.includes(p.drink.package))
    }

    return {
      label: generateLabel(filterKey, products.length, key),
      count: products.length,
      value: key
    }
  })

  if (filterKey === 'quantity' || filterKey === 'content') {
    return values.sort((a, b) => parseInt(a.value) - parseInt(b.value))
  }
  return values.sort((a, b) => a.value.localeCompare(b.value))
}

const generateLabel = (filterKey: string, count: number, value: string): string => {
  if (filterKey === 'quantity') {
    return parseInt(value) === 1 ? `${value} Unidad (${count})` : `${value} Unidades (${count})`
  }
  if (filterKey === 'content') {
    return parseInt(value) >= 1000 ? `${(parseInt(value) / 1000).toFixed(1)}L (${count})` : `${parseInt(value)}cc (${count})`
  }

  return `${value} (${count})`
}
