
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

export interface FilterOptions {
  category?: OptionType[]
  subCategory: OptionType[]
  brand: OptionType[]
  volume: OptionType[]
  quantity: OptionType[]
  packaging: OptionType[]
  priceMin: number
  priceMax: number
  abvMin: number
  abvMax: number
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
  url: string
  price: number
  bestPrice: number
  discount: number
  average: number
  logo: string
}

export interface PriceHistory {
  website: string
  priceLogs: PriceLog[]
}

export interface PriceLog {
  price: number
  date: string
}

export interface ProductsProps {
  totalCount: number
  totalPages: number
  filterOptions: FilterOptions
}
