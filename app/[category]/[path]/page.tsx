'use client'

import Image from 'next/image'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { getNavigateLink } from '@/helpers/pathsHelper'
import { PathLink } from '@/helpers/types'
import { BreadcrumbV2 } from '@/components/BreadcrumbV2'
import { FeatureList, WebsiteList } from '@/components/productDetailPage'

const GET_PRODUCT = gql`
  query GetProduct($path: ID!) {
    product(path: $path) {
      title
      quantity
      imageUrl
      product {
        name
        brand
        alcoholicGrade
        content
        package
        category
        subCategory
        variety
        bitterness
        strain
        vineyard
        madeIn
      }
      websites {
        name
        logo
        url
        price
        bestPrice
        average
      }
    }
  }
`

const fetchProduct = (path: string): any => {
  const variables = {
    path
  }

  const { data }: { data: any } = useSuspenseQuery(GET_PRODUCT, { variables })
  return data.product
}

export default function ProductDetailPage ({ params }: { params: { category: string, path: string } }): React.ReactNode {
  const { category, path } = params
  const product = fetchProduct(path)

  return (
    <>
      <BreadcrumbV2 links={[{ name: 'Home', route: '/' }, getNavigateLink(`/${category}`) as PathLink, { name: product.title, route: `/${category}/${path}` }]} />
      <div className='flex flex-col lg:flex-row gap-x-6 py-4'>
        <section className='max-w-[38rem] w-full'>
          <h2 className='text-2xl xs:text-3xl font-medium text-primary'>{product.title}</h2>
          <div className='hidden lg:block'>
            <FeatureList {...product.product} {...product} />
            <WebsiteList websites={product.websites} />
          </div>
        </section>
        <section className='flex justify-center items-center pt-4 lg:pt-0 lg:justify-end w-full'>
          <Image src={product.imageUrl} width={600} height={600} alt={product.title} priority className='rounded-lg' />
        </section>
        <div className='block lg:hidden'>
          <WebsiteList websites={product.websites} />
          <FeatureList {...product.product} {...product} />
        </div>
      </div>
    </>
  )
}
