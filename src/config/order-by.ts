import { OrderBy } from "@/types";

export enum OrderByEnum {
  SCORE_DESC = 'Score_Desc',
  PRICE_DESC = 'Price_Desc',
  PRICE_ASC = 'Price_Asc',
  NAME_ASC = 'Name_Asc',
  NAME_DESC = 'Name_Desc'
}

export const orderByItems: OrderBy[] = [
  { value: OrderByEnum.SCORE_DESC, label: 'Recomendados' },
  { value: OrderByEnum.PRICE_DESC, label: 'Mayor Precio' },
  { value: OrderByEnum.PRICE_ASC, label: 'Menor Precio' },
  { value: OrderByEnum.NAME_ASC, label: 'A - Z' },
  { value: OrderByEnum.NAME_DESC, label: 'Z - A' },
]

export const findOrderBy = (value: OrderByEnum): OrderBy => {
  const option = orderByItems.find(o => o.value === value)
  if (option === undefined) return orderByItems[0]
  return option
}
