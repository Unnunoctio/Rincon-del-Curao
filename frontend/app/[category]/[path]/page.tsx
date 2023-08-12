'use client'

import { FeatureList } from '@/components/productDetail/FeatureList'
import { BreadcrumbV2 } from '@/components/products'
import { getNavigateLink } from '@/helpers/pathsHelper'
import { PathLink } from '@/helpers/types'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import Image from 'next/image'

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

  const { data }: { data: any } = useSuspenseQuery(GET_PRODUCT, { variables, context: { fetchOptions: { cache: 'force-cache' } } })
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
          <h2 className='text-3xl font-medium text-primary'>{product.title}</h2>
          <FeatureList {...product.product} {...product} />
        </section>
        <section className='flex justify-center items-center py-4 lg:justify-end w-full'>
          <Image src={product.imageUrl} width={600} height={600} alt={product.title} priority className='rounded-lg' />
        </section>
      </div>
    </>
  )
}
