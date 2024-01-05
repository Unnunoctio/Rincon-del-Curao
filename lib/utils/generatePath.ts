import { DrinkDB } from '@/types/models.js'
import { generateTitle } from '.'

export const generatePath = (drink: DrinkDB, quantity: number, sku: number): string => {
  const title = generateTitle(drink.name, drink.package, drink.content, quantity, drink.alcoholic_grade, true)
  const pathTitle = title.toLowerCase().replaceAll('.', '').replaceAll('°', '').replaceAll(' ', '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return `${sku}-${pathTitle}`
}
