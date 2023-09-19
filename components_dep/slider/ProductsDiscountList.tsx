'use client'

import { getNavigateLinkByName } from '@/helpers/pathsHelper'
import { ProductDiscount } from '@/helpers/types'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import Image from 'next/image'
import Link from 'next/link'

const GET_PRODUCTS_DISCOUNT_QUERY = gql`
  query BestDiscountProducts {
    bestDiscountProducts {
      path
      title
      brand
      category
      discount
      bestPrice
      imageUrl
    }
  }
`

const fetchProducts = (): ProductDiscount[] => {
  const { data }: { data: { bestDiscountProducts: ProductDiscount[] } } = useSuspenseQuery(GET_PRODUCTS_DISCOUNT_QUERY)
  return data.bestDiscountProducts
}

export const ProductsDiscountList = (): React.ReactNode => {
  const products = fetchProducts()

  return products.map((product, index) => (
    <Link key={index} href={`${getNavigateLinkByName(product.category)?.route as string}/${product.path}`} className='min-w-[250px] snap-center snap-always'>
      <div className='p-2 bg-primary rounded-md border divider-primary transition-transform hover:scale-105'>
        <Image src={product.imageUrl} alt={product.title} width={234} height={234} className='aspect-[234/200] object-cover rounded-sm' />
        <div className='flex flex-col justify-between pt-2'>
          <header>
            <span className='px-2 py-[3px] text-primary text-[14px] font-medium rounded-full bg-active/60'>{product.discount}% desc</span>
            <h3 className='font-medium text-[18px] text-primary min-h-[54px]'>{product.title}</h3>
          </header>
          <div className='flex items-end justify-between'>
            <span className='text-secondary'>{product.brand}</span>
            <span className='font-medium text-[20px] text-primary'>${product.bestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
          </div>
        </div>
      </div>
    </Link>
  ))
}
