import { Breadcrumb } from '@/components/breadcrumb'
import { FeatureList } from '@/components/features'
import { HistoryLoader } from '@/components/history/history-loader'
import { ProductHistory } from '@/components/history/product-history'
import { WebsiteContainer } from '@/components/websites'
import { generateWebsHash } from '@/helpers/hash'
import { createBreadcrumbLinks } from '@/helpers/path'
import { getIsPath, getProduct } from '@/lib/api/product'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

interface Props {
  params: { path: string }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const isPath = await getIsPath(params.path)
  if (!isPath.isExist) return notFound()

  return {
    title: isPath.title
  }
}

export default async function ProductPage ({ params }: Props): Promise<JSX.Element> {
  const product = await getProduct(params.path)
  const hash = generateWebsHash()

  return (
    <>
      <Breadcrumb links={createBreadcrumbLinks(['Home', product.category, product.title])} />
      <header className='product-header'>
        <h1 className='product-title'>{product.title}</h1>
      </header>

      <section className='product-desktop-container'>
        <div className='product-img-container'>
          <img src={product.image} alt={product.title} loading='lazy' width={600} height={600} className='product-img' fetchPriority='high' />
        </div>
        <div className='product-desktop-list-container'>
          <FeatureList {...product} className='feature-list-desktop' />
          <WebsiteContainer path={params.path} hash={hash} />
        </div>
      </section>

      <section className='product-mobile-container'>
        <FeatureList {...product} className='feature-list-mobile' />
        <WebsiteContainer path={params.path} hash={hash} className='website-list-mobile' />
      </section>

      <section className='history-container'>
        <h2 className='history-title'>Historial de Precios</h2>
        <Suspense key={hash} fallback={<HistoryLoader />}>
          <ProductHistory path={params.path} />
        </Suspense>
      </section>
    </>
  )
}
