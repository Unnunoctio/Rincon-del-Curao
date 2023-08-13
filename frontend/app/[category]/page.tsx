import { BreadcrumbV2, OrderBySelect, Paginator, ProductsCount, ProductsList } from '@/components/products'
import { getNavigateLink } from '@/helpers/pathsHelper'
import { PathLink } from '@/helpers/types'

export default function ProductsPage ({ params }: { params: { category: string } }): React.ReactNode {
  const { category } = params
  const titleLink = getNavigateLink(`/${category}`)

  return (
    <>
      <BreadcrumbV2 links={[{ name: 'Home', route: '/' }, titleLink as PathLink]} />
      {/* Title & OrderBy */}
      <header className='flex justify-between py-4'>
        <div className='flex items-baseline gap-1.5'>
          <h2 className='text-3xl font-medium text-primary'>
            {titleLink?.name}
          </h2>
          <ProductsCount className='inline-block xl:hidden text-active' />
        </div>

        <OrderBySelect />
      </header>

      {/* Filter & Products */}
      <section className='flex gap-4 mt-6'>
        <div className='hidden xl:block w-56 bg-red-500'>Filtro</div>
        <div className='flex flex-1 flex-col'>
          <div className='grid grid-cols-product-list justify-items-center gap-4'>
            <ProductsList />
          </div>
          <Paginator />
        </div>
      </section>
    </>
  )
}
