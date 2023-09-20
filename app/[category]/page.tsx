import { Breadcrumb } from '@/components/breadcrumb'
import { ProductsCount } from '@/components/products-count'
import { getNavigateLink } from '@/helpers/pathHelper'
import { PathLink } from '@/types/path'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: { category: string }
}

export async function generateMetadata ({ params }: Props): Promise<Metadata> {
  const category = params.category
  const link = getNavigateLink(`/${category}`)
  if (link === undefined) return {}
  return {
    title: `${link.name} | Rincón del Curao`
  }
}

export default function ProductsPage ({ params }: Props): JSX.Element {
  const link = getNavigateLink(`/${params.category}`)
  if (link === undefined) return notFound()
  const breadcrumbLinks = [{ name: 'Home', route: '/' }, link] as PathLink[]

  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      {/* Title & OrderBy */}
      <header className='flex flex-col xl:flex-row gap-3 justify-between py-4'>
        <div className='flex items-baseline gap-1.5'>
          <h2 className='text-3xl font-medium text-primary'>
            {link.name}
          </h2>
          <ProductsCount className='inline-block xl:hidden text-active' />
        </div>

        <div className='flex justify-between'>
          <div className='block xl:hidden'>Filter</div>
          {/* <OrderBySelect /> */}
        </div>
      </header>

      {/* Filter & Products */}
    </>
  )
}
