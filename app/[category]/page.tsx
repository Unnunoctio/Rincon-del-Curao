/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { SearchParams } from '@/types/types'
import { createBreadcrumbLinks, getNavigateLink } from '@/helpers/path'
import { Breadcrumb } from '@/components/breadcrumb'
import { OrderByEnum } from '@/types/enums'
import { generateHash } from '@/helpers/hash'
import { CategoryClientLayout } from '@/components/category-client-layout'
import { getOptions } from '@/helpers/options'
import { ProductList, ProductListLoader } from '@/components/product-list'

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

  const hashDate = new Date().getTime()

  const hash = generateHash(link?.name as string, searchParams)

  const filter = getOptions(searchParams)
  filter.category = link?.name

  return (
    <>
      <Breadcrumb links={createBreadcrumbLinks(['Home', link?.name as string])} />
      <CategoryClientLayout hash={hash} title={link?.name as string} page={page} orderBy={orderBy as OrderByEnum} filter={filter}>
        <Suspense key={hashDate} fallback={<ProductListLoader />}>
          <ProductList page={page} orderBy={orderBy as OrderByEnum} filter={filter} />
        </Suspense>
      </CategoryClientLayout>
    </>
  )
}
