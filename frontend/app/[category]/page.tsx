import { OrderBySelect } from '@/components/products'
import { getNavigateLink } from '@/helpers/pathsHelper'

export default function ProductsPage ({ params }: { params: { category: string } }): React.ReactNode {
  const { category } = params
  const titleLink = getNavigateLink(`/${category}`)

  return (
    <>
      {/* Title & OrderBy */}
      <header className='flex justify-between py-4'>
        <div className='flex items-baseline gap-1.5'>
          <h2 className='text-3xl font-medium text-primary'>
            {titleLink?.name}
          </h2>
          <p className='inline-block xl:hidden text-active'>
            16 productos
          </p>
        </div>

        <OrderBySelect />
      </header>
    </>
  )
}
