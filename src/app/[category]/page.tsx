import { ProductList } from "@/components/product-list"
import { ROUTES } from "@/config/router-paths"
import { getProducts } from "@/graphql/requests"
import { ProductsProvider } from "@/providers/products-provider"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const dynamicParams = false

export async function generateStaticParams() {
  return ROUTES.map((route) => ({
    category: route.route
  }))
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const { category } = params

  const route = ROUTES.find((route) => route.route === category)
  if (!route) return notFound()

  return {
    title: route?.name
  }
}

export default async function Category({ params }: { params: { category: string } }) {
  const { category } = params

  const route = ROUTES.find((route) => route.route === category)
  const products = await getProducts(route?.name ?? null)

  return (
    <div className="flex flex-col gap-6 w-full max-w-page-width">
      <ProductsProvider products={products}>
        <h1 className="text-3xl">CATEGORIA {route?.name}</h1>
        <ProductList />
      </ProductsProvider>
    </div>
  )
}
