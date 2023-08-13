'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ReadonlyURLSearchParams, useParams, useSearchParams } from 'next/navigation'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Product } from '@/helpers/types'
import { getVariablesFilter } from '@/helpers/filterHelper'
import { getDefaultOrderBy } from '@/helpers/orderByHelper'
import { getDefaultPage } from '@/helpers/paginatorHelper'
import { ExclamationIcon } from '@/icons'

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
  const variables = {
    orderBy: getDefaultOrderBy(searchParams.get('order_by')).value,
    page: getDefaultPage(searchParams.get('page')),
    filters: getVariablesFilter(category, searchParams)
  }

  const { data }: { data: { products: Product[] } } = useSuspenseQuery(GET_PRODUCTS_QUERY, { variables, context: { fetchOptions: { cache: 'force-cache' } } })
  return data.products
}

export function ProductsList (): React.ReactNode {
  const { category } = useParams()
  const searchParams = useSearchParams()
  const products = fetchProducts(category as string, searchParams)

  if (products.length === 0) {
    return (
      <div className='flex justify-center items-center min-h-product-list'>
        <div className='flex flex-col lg:flex-row justify-center items-center gap-4'>
          <ExclamationIcon className='w-[100px] h-[100px] icon-secondary' />
          <div className='flex flex-col text-secondary text-2xl gap-2'>
            <span className='text-center lg:text-start'>Lo sentimos, no hay productos que coincidan con su búsqueda.</span>
            <span className='text-center lg:text-start hidden md:block'>Estamos trabajando para tener productos prontamente.</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-product-list justify-items-center gap-4 min-h-product-list'>
      {products.map((product, index) => (
        <Link key={index} href={`${category as string}/${product.path}`} className='w-[250px]'>
          <div className='p-2 bg-primary rounded-md border divider-primary transition-transform hover:scale-105'>
            <Image src={product.imageUrl} alt={product.title} width={234} height={234} className='aspect-[234/200] object-cover rounded-sm' />
            <div className='flex flex-col justify-between pt-2'>
              <header>
                <span className='text-secondary'>{product.brand}</span>
                <h3 className='font-medium text-[18px] text-primary min-h-[54px]'>{product.title}</h3>
              </header>
              <div className='flex items-end justify-between'>
                <div className='text-secondary text-[14px]'>
                  <span className='block'>Graduación: {product.alcoholicGrade}°</span>
                  <span className='block'>Contenido: {(product.content > 1000) ? `${product.content / 1000} L` : `${product.content} cc`}</span>
                </div>
                <span className='font-medium text-[20px] text-primary'>${product.bestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
