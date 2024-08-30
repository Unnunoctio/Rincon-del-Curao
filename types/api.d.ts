
export interface ProductPreview {
  path: string
  title: string
  price: number
  bestPrice: number
  discount: number
  average: number
  image: string
}

export interface OptionType {
  label: string
  count: number
  value: string
}

export interface TotalOptions {
  subCategory: OptionType[]
  brand: OptionType[]
  content: OptionType[]
  quantity: OptionType[]
  package: OptionType[]
  priceMin: number
  priceMax: number
  gradeMin: number
  gradeMax: number
}

export interface IsProduct {
  isExist: boolean
  title: string | null
}

export interface Web {
  code: string
  name: string
  logo: string
}

export interface ProductLinked {
  path: string
  title: string
  price: number
  bestPrice: number
}

export interface Product {
  title: string
  brand: string
  quantity: number
  abv: number
  volume: number
  packaging: string
  category: string
  subCategory: string
  origin: string
  variety: string | null
  ibu: number | null
  servingTemp: string | null
  strain: string | null
  vineyard: string | null
  image: string
}

export interface Website {
  name: string
  logo: string
  url: string
  price: number
  bestPrice: number
  average: number
}

export interface PriceHistory {
  website: string
  priceLogs: PriceLog[]
}

export interface PriceLog {
  price: number
  date: string
}
