import { BreadcrumbV2 } from '@/components/BreadcrumbV2'
import { OrderBySelect, Paginator, ProductsCount, ProductsList } from '@/components/productsPage'
import { FilterProducts } from '@/components/productsPage/filterProducts'
import { getNavigateLink } from '@/helpers/pathsHelper'
import { PathLink } from '@/helpers/types'

export default function ProductsPage ({ params }: { params: { category: string } }): React.ReactNode {
  const { category } = params
  const titleLink = getNavigateLink(`/${category}`)

  return (
    <>
      <BreadcrumbV2 links={[{ name: 'Home', route: '/' }, titleLink as PathLink]} />
      {/* Title & OrderBy */}
      <header className='flex flex-col xl:flex-row gap-3 justify-between py-4'>
        <div className='flex items-baseline gap-1.5'>
          <h2 className='text-3xl font-medium text-primary'>
            {titleLink?.name}
          </h2>
          <ProductsCount className='inline-block xl:hidden text-active' />
        </div>

        <div className='flex justify-between'>
          <div className='block xl:hidden'>Filter</div>
          <OrderBySelect />
        </div>
      </header>

      {/* Filter & Products */}
      <section className='flex gap-4 mt-6'>
        <div className='hidden xl:block w-[274px]'>
          <FilterProducts />
        </div>
        <div className='flex flex-1 flex-col'>
          <ProductsList />
          <Paginator />
        </div>
      </section>
    </>
  )
}
