'use client'

import { BreadcrumbV2 } from '@/components/BreadcrumbV2'
import { ProductsCount } from '@/components/productsPage'
// import { FilterProducts } from '@/components/productsPage/filterProducts'
import { getNavigateLink } from '@/helpers/pathsHelper'
import { PathLink } from '@/helpers/types'
import { useParams, useSearchParams } from 'next/navigation'

export default function ProductsPage (): React.ReactNode {
  const { category } = useParams()
  const searchParams = useSearchParams()
  const titleLink = getNavigateLink(`/${category as string}`)

  return (
    <>
      <BreadcrumbV2 links={[{ name: 'Home', route: '/' }, titleLink as PathLink]} />
      {/* Title & OrderBy */}
      <header className='flex flex-col xl:flex-row gap-3 justify-between py-4'>
        <div className='flex items-baseline gap-1.5'>
          <h2 className='text-3xl font-medium text-primary'>
            {titleLink?.name}
          </h2>
          <ProductsCount className='inline-block xl:hidden text-active' category={category as string} searchParams={searchParams} />
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
