import { getTotalProducts } from '@/_mock/products'
import { OrderBySelect } from '@/components/products'
import { ProductsList } from '@/components/products/ProductsList'
import { getNavigateLink } from '@/helpers/pathsHelper'

export default function ProductsPage ({ params }: { params: { category: string } }): React.ReactNode {
  const { category } = params
  const titleLink = getNavigateLink(`/${category}`)
  const totalProducts = getTotalProducts()

  return (
    <>
      {/* Title & OrderBy */}
      <header className='flex justify-between py-4'>
        <div className='flex items-baseline gap-1.5'>
          <h2 className='text-3xl font-medium text-primary'>
            {titleLink?.name}
          </h2>
          <p className='inline-block xl:hidden text-active'>
            {totalProducts} productos
          </p>
        </div>

        <OrderBySelect />
      </header>

      {/* Filter & Products */}
      <section className='flex gap-4 mt-6'>
        <div className='hidden xl:block w-56'>Filtro</div>
        <div className='flex flex-1 flex-wrap justify-around gap-4'>
          <ProductsList category={category} />

          <div className='w-full bg-red-500'>
            Pagination
          </div>
        </div>
      </section>
    </>
  )
}
