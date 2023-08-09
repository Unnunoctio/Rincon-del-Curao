import { OrderBySelect } from '@/components/products'

const categoryLinks = [
  { name: 'Cervezas', route: '/cervezas' },
  { name: 'Vinos', route: '/vinos' },
  { name: 'Destilados', route: '/destilados' }
]

export default function ProductsPage ({ params }: { params: { category: string } }): React.ReactNode {
  const { category } = params
  return (
    <>
      {/* Title & OrderBy */}
      <header className='flex justify-between py-4'>
        <div className='flex items-baseline gap-1.5'>
          <h2 className='text-3xl font-medium text-primary'>
            {categoryLinks.find(link => link.route === `/${category}`)?.name}
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
