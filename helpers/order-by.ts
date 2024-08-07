import { OrderByEnum } from '@/types/enums'
import { OrderBy } from '@/types/types'

export const orderByItems: OrderBy[] = [
  { value: OrderByEnum.SCORE_DESC, label: 'Recomendados' },
  { value: OrderByEnum.PRICE_DESC, label: 'Mayor Precio' },
  { value: OrderByEnum.PRICE_ASC, label: 'Menor Precio' },
  { value: OrderByEnum.NAME_ASC, label: 'A - Z' },
  { value: OrderByEnum.NAME_DESC, label: 'Z - A' }
]

export const orderByFind = (value: OrderByEnum): OrderBy => {
  const option = orderByItems.find(item => item.value === value)
  if (option === undefined) return orderByItems[0]
  return option
}
