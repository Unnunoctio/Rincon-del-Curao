import { BreadcrumbV2 } from '@/components/BreadcrumbV2'
import { ProductsCount } from '@/components/productsPage'
// import { FilterProducts } from '@/components/productsPage/filterProducts'
import { parseSearchParams } from '@/helpers/filterHelper'
import { getNavigateLink } from '@/helpers/pathsHelper'
import { PathLink } from '@/helpers/types'
import { Suspense } from 'react'

interface Props {
  params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function ProductsPage (props: Props): React.ReactNode {
  const { category } = props.params
  const queryString = parseSearchParams(props.searchParams)

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
          <Suspense fallback={<p className='inline-block xl:hidden text-active'>Cargando ...</p>}>
            <ProductsCount className='inline-block xl:hidden text-active' category={category} queryString={queryString} />
          </Suspense>
        </div>

        <div className='flex justify-between'>
          <div className='block xl:hidden'>Filter</div>
          {/* <OrderBySelect /> */}
        </div>
      </header>

      {/* Filter & Products */}
      <section className='flex gap-4 mt-6'>
        <div className='hidden xl:block w-[274px]'>
          {/* <FilterProducts /> */}
        </div>
        <div className='flex flex-1 flex-col'>
          {/* <ProductsList />
          <Paginator /> */}
        </div>
      </section>
    </>
  )
}
