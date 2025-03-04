
export interface ProductView {
  slug: string;
  title: string;
  image: string;
  price: number;
  bestPrice: number;
  discount: number;
  average: number;
}

export interface BreadcrumbLink {
  name: string;
  href: string;
}
