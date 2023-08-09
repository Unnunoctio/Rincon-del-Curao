import { OrderByEnum } from './enum'
import { OrderByItem } from './types'

export const orderByItems: OrderByItem[] = [
  { value: OrderByEnum.SCORE_DESC, label: 'Recomendados' },
  { value: OrderByEnum.PRICE_DESC, label: 'Mayor Precio' },
  { value: OrderByEnum.PRICE_ASC, label: 'Menor Precio' },
  { value: OrderByEnum.NAME_ASC, label: 'A - Z' },
  { value: OrderByEnum.NAME_DESC, label: 'Z - A' }
]

export const getDefaultOrderBy = (value: string | null): OrderByItem => {
  return orderByItems.find(i => i.value === value) ?? orderByItems[0]
}

export const getOrderBy = (value: string | null): OrderByItem | undefined => {
  return orderByItems.find(i => i.value === value)
}
