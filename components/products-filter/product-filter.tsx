'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { ProductCount } from '../products-count'
import { DeleteFiltersButton } from './delete-filters-button'
import { getFilters } from '@/lib/api/get-filters'
import { MultiSelect } from './multi-select'
import { useEffect, useState } from 'react'
import { FilterOptions } from '@/types/api'

export const ProductFilter: React.FC = () => {
  const { category } = useParams()
  const searchParams = useSearchParams()
  const [options, setOptions] = useState<FilterOptions | null>(null)

  const fetchData = async (): Promise<void> => {
    setOptions(await getFilters(category as string, searchParams))
  }

  useEffect(() => {
    void fetchData()
  }, [searchParams])

  return (
    <section className='flex flex-col w-full h-full'>
      <header className='flex items-baseline justify-between pb-2 border-b divider-primary'>
        <ProductCount className='inline-block xl:inline-block text-active' />
        <DeleteFiltersButton />
      </header>
      <div className='flex flex-col gap-2 py-3'>
        <div className='flex flex-col'>
          <span className='text-primary text-[18px] font-medium'>Categoria</span>
          <MultiSelect queryName='category' options={options === null ? [] : options.subCategory} />
        </div>
        <div className='flex flex-col'>
          <span className='text-primary text-[18px] font-medium'>Marca</span>
          <MultiSelect queryName='brand' options={options === null ? [] : options.brand} />
        </div>
        <div className='flex flex-col'>
          <span className='text-primary text-[18px] font-medium'>Contenido</span>
          <MultiSelect queryName='content' options={options === null ? [] : options.content} />
        </div>
        <div className='flex flex-col'>
          <span className='text-primary text-[18px] font-medium'>Cantidad</span>
          <MultiSelect queryName='quantity' options={options === null ? [] : options.quantity} />
        </div>
        <div className='flex flex-col'>
          <span className='text-primary text-[18px] font-medium'>Envase</span>
          <MultiSelect queryName='package' options={options === null ? [] : options.package} />
        </div>
      </div>
    </section>
  )
}
