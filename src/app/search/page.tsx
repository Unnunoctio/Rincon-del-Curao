import { Breadcrumb } from "@/components/breadcrumb";
import { OrderBy } from "@/components/order-by";
import { Pagination } from "@/components/pagination";
import { ProductList } from "@/components/product-list";
import { createBreadcrumb } from "@/config/router-paths";
import { ProductsFilterProvider } from "@/providers/products-filter-provider";
import { Metadata } from "next";

interface Props {
  searchParams: {
    q: string
  }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = searchParams

  return {
    title: `${q} • Búsqueda`
  }
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = searchParams

  return (
    <ProductsFilterProvider>
      <div className="flex flex-col gap-6 w-full max-w-page-width">
        <Breadcrumb links={createBreadcrumb(['Home', 'Búsqueda'])} />
        <section className="flex justify-between">
          <div className="flex flex-col">
            <h1 className="font-medium text-3xl">Búsqueda</h1>
            <span className="text-c-silver-gray">Palabras clave: {q}</span>
          </div>
          <OrderBy />
        </section>
        <section className="flex-grow">
          <ProductList />
        </section>
        <Pagination />
      </div>
    </ProductsFilterProvider>
  )
}
