
export interface WebInfo {
  code: string
  name: string
  logo: string
}

export interface ProductPreview {
  slug: string
  title: string
  price: number
  bestPrice: number
  discount: number
  average: number
  image: string
}

export interface IsSlugExist {
  isExist: boolean
  title: string
}

export interface ProductDetail {
  title: string
  brand: string
  quantity: number
  abv: number
  volume: number
  packaging: string
  category: string
  subCategory: string
  origin: string
  image: string
  variety: string | null
  ibu: number | null
  servingTemp: string | null
  strain: string | null
  vineyard: string | null
}
