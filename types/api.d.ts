
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
