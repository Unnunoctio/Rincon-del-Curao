'use client'

import { Filter as FilterType } from '@/types/types'
import { useEffect, useState } from 'react'
import { OrderBySelect } from './order-by-select'
import { OrderByEnum } from '@/types/enums'
import { ProductsProps } from '@/types/api'
import { ProductCount } from './product-count'
import { Pagination } from './pagination'
import { Filter, FilterMobile } from './filter'

interface Props {
  hash: string
  title: string
  page: number
  orderBy: OrderByEnum
  filter: FilterType
  children: JSX.Element
}

export const CategoryClientLayout: React.FC<Props> = ({ hash, title, page, orderBy, filter, children }) => {
  const [data, setData] = useState<ProductsProps | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProductsProps = async (): Promise<void> => {
      setIsLoading(true)
      const response = await fetch(`/api/products-props?filter=${JSON.stringify(filter)}`)
      const data = await response.json()
      setData(data)
      setIsLoading(false)
    }
    void fetchProductsProps()
  }, [hash])

  return (
    <>
      <header className='product-list-header'>
        <div className='product-list-title-container'>
          <h1 className='product-list-title'>{title}</h1>
          <ProductCount isLoading={isLoading} totalCount={data?.totalCount} className='xl:hidden' />
        </div>
        <div className='product-list-header-buttons'>
          <FilterMobile>
            <Filter isLoading={isLoading} totalCount={data?.totalCount} filterOptions={data?.filterOptions} filter={filter} />
          </FilterMobile>
          <OrderBySelect orderBy={orderBy} />
        </div>
      </header>
      <section className='product-list-section'>
        <div className='product-list-filter-container'>
          <Filter isLoading={isLoading} totalCount={data?.totalCount} filterOptions={data?.filterOptions} filter={filter} />
        </div>
        <div className='product-list-container'>
          {children}
          <Pagination currentPage={page} totalPages={data?.totalPages} />
        </div>
      </section>
    </>
  )
}
