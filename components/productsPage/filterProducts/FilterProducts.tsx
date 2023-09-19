'use client'

import { ProductsCount } from '../ProductsCount'
import { MultiSelectV2 } from './MultiSelectV2'
import { DeleteFilters } from './DeleteFilters'
import { gql } from '@apollo/client'
import { getVariablesFilter } from '@/helpers/filterHelper'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { ReadonlyURLSearchParams, useParams, useSearchParams } from 'next/navigation'
import { FilterOptions } from '@/helpers/types'

const GET_FILTER_OPTIONS = gql`
  query FilterOptions($filters: FilterInput!) {
    filterOptions(filters: $filters) {
      subCategory {
        label
        value
      }
      brand {
        label
        value
      }
      content {
        label
        value
      }
      quantity {
        label
        value
      }
      package {
        label
        value
      }
    }
  }
`

const fetchFilterOptions = (category: string, searchParams: ReadonlyURLSearchParams): FilterOptions => {
  const variables = {
    filters: getVariablesFilter(category, searchParams)
  }

  const { data }: { data: { filterOptions: FilterOptions } } = useSuspenseQuery(GET_FILTER_OPTIONS, { variables })
  return data.filterOptions
}

export const FilterProducts = (): React.ReactNode => {
  const { category } = useParams()
  const searchParams = useSearchParams()

  const filterOptions = fetchFilterOptions(category as string, searchParams)
  // console.log(filterOptions)

  return (
    <section className='flex flex-col w-full h-full'>
      <header className='flex items-baseline justify-between pb-2 border-b divider-primary'>
        <ProductsCount className='text-active' />
        <DeleteFilters />
      </header>
      <div className='flex flex-col gap-2 py-3'>
        <div className='flex flex-col'>
          <span className='text-primary text-[18px] font-medium'>Categoria</span>
          <MultiSelectV2 queryName='category' options={filterOptions.subCategory} />
        </div>
        <div className='flex flex-col'>
          <span className='text-primary text-[18px] font-medium'>Marca</span>
          <MultiSelectV2 queryName='brand' options={filterOptions.brand} />
        </div>
        <div className='flex flex-col'>
          <span className='text-primary text-[18px] font-medium'>Contenido</span>
          <MultiSelectV2 queryName='content' options={filterOptions.content} />
        </div>
        <div className='flex flex-col'>
          <span className='text-primary text-[18px] font-medium'>Cantidad</span>
          <MultiSelectV2 queryName='quantity' options={filterOptions.quantity} />
        </div>
        <div className='flex flex-col'>
          <span className='text-primary text-[18px] font-medium'>Envase</span>
          <MultiSelectV2 queryName='package' options={filterOptions.package} />
        </div>
      </div>
    </section>
  )
}