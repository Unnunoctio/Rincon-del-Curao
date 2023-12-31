/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createBreadcrumbLinks, getNavigateLink } from '@/helpers/path'
import { Breadcrumb } from '@/components/breadcrumb'
import { ProductList } from '@/components/products'
import { Suspense } from 'react'
import { getCookie } from '@/lib/cookies'
import { ProductCount } from '@/components/products/product-count'

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
          <Suspense key={`${prefWebs as string}${page}`} fallback={<span>Cargando...</span>}>
            <ProductList page={page} category={link?.name as string} />
          </Suspense>
          {/* Pagination */}
        </div>
      </section>
    </>
  )
}
