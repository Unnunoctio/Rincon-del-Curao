/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getCookie } from '@/lib/cookies'
import { getTotalPages } from '@/lib/api'
import { createBreadcrumbLinks, getNavigateLink } from '@/helpers/path'
import { Breadcrumb } from '@/components/breadcrumb'
import { ProductCount, ProductList, ProductListLoader } from '@/components/products'
import { Pagination } from '@/components/pagination'

interface Props {
  params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata ({ params }: Props): Promise<Metadata> {
  const { category } = params
  const link = getNavigateLink(`/${category}`)
  if (link === undefined) return notFound()

  return {
    title: link.name
  }
}

export default async function ProductsPage ({ params, searchParams }: Props): Promise<JSX.Element> {
  const prefWebs = getCookie('prefWebs')
  const link = getNavigateLink(`/${params.category}`)
  const page = Number(searchParams.page) || 1
  const totalPages = await getTotalPages((prefWebs === null) ? [] : prefWebs.split(','), link?.name as string)

  return (
    <>
      <Breadcrumb links={createBreadcrumbLinks(['Home', link?.name as string])} />
      <div className='flex items-baseline gap-1.5'>
        <h1 className='my-4 text-3xl font-medium text-primary'>{link?.name}</h1>
        <Suspense key={prefWebs} fallback={<span className='inline-block text-active'>Cargando...</span>}>
          <ProductCount category={link?.name as string} className='inline-block text-active' />
        </Suspense>
      </div>
      {/* Filter & Product list */}
      <section className='flex gap-4 mt-6'>
        <div className='hidden xl:block w-[280px]' />
        <div className='flex flex-1 flex-col gap-y-8'>
          <Suspense key={`${prefWebs as string}${page}`} fallback={<ProductListLoader />}>
            <ProductList page={page} category={link?.name as string} />
          </Suspense>
          <Pagination totalPages={totalPages} />
        </div>
      </section>
    </>
  )
}
