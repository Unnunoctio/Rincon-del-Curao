export interface WebInfo {
  code: string;
  name: string;
}

interface WebPreview {
  code: string;
  price: number;
  bestPrice: number;
  discount: number;
  average: number;
}

export interface ProductPreview {
  slug: string;
  title: string;
  image: string;
  websites: WebPreview[];
}
