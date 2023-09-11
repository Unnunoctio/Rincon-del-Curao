'use client'

import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import Link from 'next/link'
import Image from 'next/image'
import { ProductDiscount } from '@/helpers/types'
import { getNavigateLinkByName } from '@/helpers/pathsHelper'

const query = gql`
  query Query {
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
interface Response {
  bestDiscountProducts: ProductDiscount[]
}

export const ProductsDiscountList = (): React.ReactNode => {
  const { data } = useSuspenseQuery<Response>(query)

  return data.bestDiscountProducts.map((product, index) => (
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
