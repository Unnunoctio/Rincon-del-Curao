import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductTitle } from '@/lib/api/get-product-title'
import { getProduct } from '@/lib/api/get-product'
import { PathLink } from '@/types/path'
import { Breadcrumb } from '@/components/breadcrumb'
import { getNavigateLinkByName } from '@/helpers/path-helper'
import Image from 'next/image'
import { WebsiteList } from '@/components/website'
import { FeatureList } from '@/components/feature'

interface Props {
  params: { path: string }
}

export async function generateMetadata ({ params }: Props): Promise<Metadata> {
  const path = params.path
  const title = await getProductTitle(path)
  if (title === null) return {}
  return {
    title: `${title} | Rincón del Curao`
  }
}

export default async function ProductPage ({ params }: Props): Promise<JSX.Element> {
  const product = await getProduct(params.path)
  if (product === null) return notFound()
  const breadcrumbLinks = [{ name: 'Home', route: '/' }, getNavigateLinkByName(product.product.category), { name: product.title, route: `productos/${params.path}` }] as PathLink[]

  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <div className='flex flex-col lg:flex-row gap-x-6 py-4'>
        <section className='max-w-[38rem] w-full'>
          <h2 className='text-2xl xs:text-3xl font-medium text-primary'>{product.title}</h2>
          <div className='hidden lg:block'>
            <FeatureList {...product.product} quantity={product.quantity} />
            <WebsiteList websites={product.websites} />
          </div>
        </section>
        <section className='flex justify-center items-center pt-4 lg:pt-0 lg:justify-end w-full'>
          <Image src={product.imageUrl} alt={product.title} width={700} height={700} className='rounded-lg' />
        </section>
        <div className='block lg:hidden'>
          <WebsiteList websites={product.websites} />
          <FeatureList {...product.product} quantity={product.quantity} />
        </div>
      </div>
    </>
  )
}
