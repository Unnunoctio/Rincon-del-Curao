'use client'

import Link from 'next/link'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Product } from '@/helpers/types'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { getDefaultOrderBy } from '@/helpers/orderByHelper'
import { getNavigateLink } from '@/helpers/pathsHelper'
import Image from 'next/image'

const GET_PRODUCTS_QUERY = gql`
  query GetProducts($orderBy: OrderByEnum!, $page: Int!, $filters: FilterInput!) {
    products(orderBy: $orderBy, page: $page, filters: $filters) {
      path
      title
      brand
      alcoholicGrade
      content
      bestPrice
      imageUrl
    }
  }
`

const fetchProducts = (category: string, searchParams: ReadonlyURLSearchParams): Product[] => {
  // console.log('entre')
  // console.log(searchParams)

  const variables = {
    orderBy: getDefaultOrderBy(searchParams.get('order_by')).value,
    page: 1,
    filters: {
      category: getNavigateLink(`/${category}`)?.name
    }
  }

  const { data }: { data: { products: Product[] } } = useSuspenseQuery(GET_PRODUCTS_QUERY, { variables, context: { fetchOptions: { cache: 'force-cache' } } })
  return data.products
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function ProductsList ({ category }: { category: string }) {
  const searchParams = useSearchParams()
  const products = fetchProducts(category, searchParams)

  return products.map((product, index) => (
    <Link key={index} href={`${category}/${product.path}`}>
      <div className='p-2 w-[250px] bg-primary rounded-md border divider-primary transition-transform hover:scale-105'>
        <Image src={product.imageUrl} alt={product.title} width={234} height={234} className='aspect-[234/200] object-cover rounded-sm' />
        <div className='flex flex-col justify-between pt-2'>
          <header>
            <span className='text-secondary'>{product.brand}</span>
            <h3 className='font-medium text-[18px] text-primary min-h-[54px]'>{product.title}</h3>
          </header>
          <div className='flex items-end justify-between'>
            <div className='text-secondary text-[14px]'>
              <span className='block'>Graduación: {product.alcoholicGrade}°</span>
              <span className='block'>Contenido: {product.content}cc</span>
            </div>
            <span className='font-medium text-[20px] text-primary'>${product.bestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
          </div>
        </div>
      </div>
    </Link>
  ))
}
