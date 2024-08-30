import { Breadcrumb } from '@/components/breadcrumb'
import { FeatureList } from '@/components/features'
import { createBreadcrumbLinks } from '@/helpers/path'
import { getIsPath } from '@/lib/api/get-is-path'
import { getProduct } from '@/lib/api/get-product'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

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
  // const hash = generateWebsHash()

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
          {/* <WebsiteList websites={product.websites} /> */}
        </div>
      </section>

      <section className='product-mobile-container'>
        <FeatureList {...product} className='feature-list-mobile' />
        {/* <WebsiteList websites={product.websites} className='website-list-mobile' /> */}
      </section>

      {/* <section className='history-container'>
        <h2 className='history-title'>Historial de Precios</h2>
        <ProductHistory path={params.path} hash={hash} />
      </section> */}
    </>
  )
}
