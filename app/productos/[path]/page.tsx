import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getHistoryPricies, getLinkedProducts, getProduct, getProductTitle } from '@/lib/api'
import { getCookie } from '@/lib/cookies'
import { createBreadcrumbLinks } from '@/helpers/path'
import { Breadcrumb } from '@/components/breadcrumb'
import { FeatureList, HistoryPricies, LinkedProductList, WebsiteList } from '@/components/product'

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
  const [product, linkedProducts, historyPricies] = await Promise.all([
    getProduct(params.path, (prefWebs === null) ? [] : prefWebs.split(',')),
    getLinkedProducts(params.path, (prefWebs === null) ? [] : prefWebs.split(',')),
    getHistoryPricies(params.path, (prefWebs === null) ? [] : prefWebs.split(','))
  ])
  if (product == null) return notFound()

  return (
    <>
      <Breadcrumb links={createBreadcrumbLinks(['Home', product.category, product.title])} />
      <header className='mt-6'>
        <h1 className='text-2xl xs:text-3xl font-medium text-primary'>{product.title}</h1>
      </header>

      <section className='mt-6 block lg:flex justify-between gap-6'>
        <div className='flex flex-col items-center lg:items-start gap-6 w-full lg:min-w-[600px]'>
          <Image src={product.image} alt={product.title} width={600} height={600} className='aspect-square object-cover rounded-lg' priority />
          <LinkedProductList linkedProducts={linkedProducts} />
        </div>
        <div className='hidden lg:flex justify-end lx:justify-between gap-4 w-full max-w-[650px]'>
          <FeatureList {...product} className='hidden lx:block max-w-[250px]' />
          <WebsiteList websites={product.websites} />
        </div>
      </section>

      <section className='flex flex-col-reverse xm:flex-row lx:hidden mt-6 gap-x-4 gap-y-6 justify-between'>
        <FeatureList {...product} className='max-w-[510px]' />
        <WebsiteList websites={product.websites} className='lg:hidden' />
      </section>

      {historyPricies.filter(h => h.records.length > 0).length > 0 && <HistoryPricies historyPricies={historyPricies.filter(h => h.records.length > 0)} />}
    </>
  )
}
