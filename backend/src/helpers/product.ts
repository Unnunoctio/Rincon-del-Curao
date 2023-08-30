import { Types } from 'mongoose'
import { MultiDynamicObject, Product, Website } from '../types'

export const generatePath = (id: string, pid: string, title: string): string => {
  const idPath = id.substring(id.length - 3) + pid.substring(pid.length - 3)
  const titlePath: string = title.toLowerCase().replaceAll('.', '').replaceAll('°', '').replaceAll(' ', '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return `${idPath}-${titlePath}`
}

export const getProductAverage = (websites: Types.DocumentArray<Website>): number => {
  let count = 0
  let sumAverage = 0

  for (const website of websites) {
    if (website.average !== null) {
      count++
      sumAverage += website.average
    }
  }

  return count > 0 ? sumAverage / count : 0
}

export const getOptionsByKey = (products: Product[], filterKey: string, tier: number): MultiDynamicObject => {
  const reduce: MultiDynamicObject = products.reduce((acc, product) => {
    if (tier === 1) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands, @typescript-eslint/strict-boolean-expressions
      acc[product[filterKey]] = (acc[product[filterKey]] || 0) + 1
    } else if (tier === 2) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands, @typescript-eslint/strict-boolean-expressions
      acc[product.product[filterKey]] = (acc[product.product[filterKey]] || 0) + 1
    }
    return acc
  }, {})

  return reduce
}
