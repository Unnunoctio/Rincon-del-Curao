'use client'

import { ProductsCount } from '../ProductsCount'
import { MultiSelectV2 } from './MultiSelectV2'
import { DeleteFilters } from './DeleteFilters'

export const FilterProducts = (): React.ReactNode => {
  return (
    <section className='flex flex-col w-full h-full'>
      <header className='flex items-baseline justify-between pb-2 border-b divider-primary'>
        <ProductsCount className='text-active' />
        <DeleteFilters />
      </header>
      <div className='flex flex-col gap-2 py-3'>
        <MultiSelectV2 />
      </div>
    </section>
  )
}
