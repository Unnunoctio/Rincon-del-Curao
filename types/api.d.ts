
export interface ProductPreview {
  path: string
  title: string
  brand: string
  price: number
  bestPrice: number
  discount: number
  average: number
  preview: string
}

export interface IsProduct {
  isExist: boolean
  title: string | null
}

export interface Web {
  code: string
  name: string
  url: string
  logo: string
}

export interface Product {
  title: string
  brand: string
  quantity: number
  alcoholicGrade: number
  content: number
  package: string
  category: string
  subCategory: string
  madeIn: string
  variety: string | null
  bitterness: number | null
  temperature: string | null
  strain: string | null
  vineyard: string | null
  image: string
  websites: Website[]
}

export interface Website {
  name: string
  logo: string
  url: string
  price: number
  bestPrice: number
  average: number
  records: Record[]
}

export interface Record {
  price: number
  date: string
}
