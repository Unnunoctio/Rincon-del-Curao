import { Breadcrumb } from "@/components/breadcrumb"
import { Pagination } from "@/components/pagination"
import { ProductCount } from "@/components/product-count"
import { ProductList } from "@/components/product-list"
import { createBreadcrumb, ROUTES } from "@/config/router-paths"
import { ProductsFilterProvider } from "@/providers/products-filter-provider"
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
    <ProductsFilterProvider>
      <div className="flex flex-col gap-6 w-full max-w-page-width">
        <Breadcrumb links={createBreadcrumb(['Home', route?.name as string])} />
        <section className="flex flex-col">
          <h1 className="font-medium text-3xl">{route?.name}</h1>
          <ProductCount />
        </section>
        <section className="flex-grow">
          <ProductList />
        </section>
        <Pagination />
      </div>
    </ProductsFilterProvider>
  )
}
