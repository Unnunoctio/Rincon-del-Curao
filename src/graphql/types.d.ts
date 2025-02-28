export interface WebInfo {
  code: string;
  name: string;
}

interface WebPreview {
  code: string;
  price: number;
  bestPrice: number;
  discount: number;
}

export interface ProductPreview {
  slug: string;
  title: string;
  brand: string;
  category: string;
  subCategory: string;
  quantity: number;
  abv: number;
  volume: number;
  packaging: string;
  average: number;
  image: string;
  websites: WebPreview[];
}
