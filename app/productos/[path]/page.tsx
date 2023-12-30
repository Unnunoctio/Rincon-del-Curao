import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProduct, getProductTitle } from '@/lib/api'
import { getCookie } from '@/lib/cookies'
import { createBreadcrumbLinks } from '@/helpers/path'
import { Breadcrumb } from '@/components/breadcrumb'
import { FeatureList, WebsiteList } from '@/components/product'

interface Props {
  params: { path: string }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const isProduct = await getProductTitle(params.path)
  if (!isProduct.isExist) return notFound()

  return {
    title: isProduct.title
  }
}

export default async function ProductPage ({ params }: Props): Promise<JSX.Element> {
  const prefWebs = getCookie('prefWebs')
  const product = await getProduct(params.path, (prefWebs === null) ? [] : prefWebs.split(','))

  return (
    <>
      <Breadcrumb links={createBreadcrumbLinks(['Home', product.category, product.title])} />
      <h1 className='my-4 text-2xl xs:text-3xl font-medium text-primary'>{product.title}</h1>
      <div className='flex flex-col lg:flex-row justify-between gap-4'>
        <section className='flex justify-center items-start'>
          <Image src={product.image} alt={product.title} width={600} height={600} className='aspect-square object-cover rounded-lg' priority />
        </section>
        <section className='flex flex-1 flex-col-reverse xm:flex-row justify-evenly gap-4'>
          <FeatureList {...product} />
          <WebsiteList websites={product.websites} />
        </section>
      </div>
    </>
  )
}
