/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { SearchParams } from '@/types/types'
import { createBreadcrumbLinks, getNavigateLink } from '@/helpers/path'
import { Breadcrumb } from '@/components/breadcrumb'
import { OrderByEnum } from '@/types/enums'
import { ProductList, ProductListLoader } from '@/components/product-list'
import { OrderBySelect } from '@/components/order-by-select'
import { Pagination } from '@/components/pagination'
import { generateHash } from '@/helpers/hash'
import { ProductCount } from '@/components/product-count'
import { Filter, FilterMobile } from '@/components/filter'

interface Props {
  params: { category: string }
  searchParams: SearchParams
}

export async function generateMetadata ({ params }: Props): Promise<Metadata> {
  const { category } = params
  const link = getNavigateLink(`/${category}`)
  if (link === undefined) return notFound()
  return {
    title: link.name
  }
}

export default function CategoryPage ({ params, searchParams }: Props): JSX.Element {
  const link = getNavigateLink(`/${params.category}`)

  const page = Number(searchParams.page) || 1
  const orderBy = searchParams.order_by ?? OrderByEnum.SCORE_DESC

  const hash = generateHash(link?.name as string, searchParams)

  return (
    <>
      <Breadcrumb links={createBreadcrumbLinks(['Home', link?.name as string])} />
      <header className='product-list-header'>
        <div className='product-list-title-container'>
          <h1 className='product-list-title'>{link?.name}</h1>
          <ProductCount category={link?.name as string} searchParams={searchParams} hash={hash} className='xl:hidden' />
        </div>
        <div className='product-list-header-buttons'>
          <FilterMobile>
            <Filter category={link?.name as string} searchParams={searchParams} hash={hash} />
          </FilterMobile>
          <OrderBySelect orderBy={orderBy as OrderByEnum} />
        </div>
      </header>
      <section className='product-list-section'>
        <div className='product-list-filter-container'>
          <Filter category={link?.name as string} searchParams={searchParams} hash={hash} />
        </div>
        <div className='product-list-container'>
          <Suspense key={new Date().getTime()} fallback={<ProductListLoader />}>
            <ProductList page={page} orderBy={orderBy as string} category={link?.name as string} searchParams={searchParams} />
          </Suspense>
          <Pagination currentPage={page} category={link?.name as string} searchParams={searchParams} hash={hash} />
        </div>
      </section>
    </>
  )
}
