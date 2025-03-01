import { ProductList } from "@/components/product-list";
import { getProducts } from "@/graphql/requests";
import { ProductsProvider } from "@/providers/products-provider";
import { Metadata } from "next";

interface Props {
  searchParams: {
    q: string
  }
}

export const dynamicParams = false

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = searchParams

  return {
    title: `${q} • Búsqueda`
  }
}

export default async function Search({ searchParams }: Props) {
  const { q } = searchParams
  const products = await getProducts(null)

  return (
    <div className="flex flex-col gap-6 w-full max-w-page-width">
      <ProductsProvider products={products}>
        <h1 className="text-3xl">Búsqueda: {q}</h1>
        <ProductList />
      </ProductsProvider>
    </div>
  )
}
