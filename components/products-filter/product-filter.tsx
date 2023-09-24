import { ProductCount } from '../products-count'
import { DeleteFiltersButton } from './delete-filters-button'

export const ProductFilter: React.FC = () => {
  return (
    <section className='flex flex-col w-full h-full'>
      <header className='flex items-baseline justify-between pb-2 border-b divider-primary'>
        <ProductCount className='inline-block xl:inline-block text-active' />
        <DeleteFiltersButton />
      </header>
    </section>
  )
}
