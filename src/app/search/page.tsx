import { Pagination } from "@/components/pagination";
import { ProductList } from "@/components/product-list";
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
    <div className="flex flex-col gap-6 w-full max-w-page-width">
      <h1 className="text-3xl">Búsqueda: {q}</h1>
      <section className="flex-grow">
        <ProductList />
      </section>
      <Pagination />
    </div>
  )
}
