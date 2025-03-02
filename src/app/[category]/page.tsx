import { ProductList } from "@/components/product-list"
import { ROUTES } from "@/config/router-paths"
import { Metadata } from "next"

interface Props {
  params: {
    category: string
  }
}

export const dynamicParams = false

export async function generateStaticParams() {
  return ROUTES.map((route) => ({
    category: route.route
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = params

  const route = ROUTES.find((route) => route.route === category)
  return {
    title: route?.name
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = params
  const route = ROUTES.find((route) => route.route === category)

  return (
    <div className="flex flex-col gap-6 w-full max-w-page-width">
      <h1 className="text-3xl">CATEGORIA {route?.name}</h1>
      <ProductList />
    </div>
  )
}
