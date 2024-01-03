import { TotalOptions } from '@/types/api'
import { FilterOptions } from '@/types/types'
import { Suspense } from 'react'
import { ProductCount } from '.'
import { getCookie } from '@/lib/cookies'
import { MultiSelect } from '../filter'

interface Props {
  category: string
  filterOptions: FilterOptions
  totalOptions: TotalOptions
}

export const ProductListFilter: React.FC<Props> = ({ category, filterOptions, totalOptions }) => {
  const prefWebs = getCookie('prefWebs')

  return (
    <section className='flex flex-col w-full h-full'>
      <header className='flex items-baseline justify-between pb-2 border-b divider-primary'>
        <Suspense key={prefWebs} fallback={<span className='inline-block text-active'>Cargando...</span>}>
          <ProductCount category={category} filterOptions={filterOptions} className='inline-block text-active' />
        </Suspense>
      </header>
      <div className='flex flex-col gap-2 py-3'>
        <article>
          <span className='text-primary font-medium'>Marca</span>
          <MultiSelect name='brand' options={totalOptions.brand} />
        </article>
      </div>
    </section>
  )
}
