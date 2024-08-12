'use client'

import { SearchParams } from '@/types/types'
import { ProductCount } from '../product-count'
import { useEffect, useState } from 'react'
import { TotalOptions } from '@/types/api'
import { RangeSlider } from './range-slider'
import { TextFormatEnum } from '@/types/enums'
import { MultiSelect } from './multi-select'
import { RemoveFilters } from './remove-filters'
import { getOptions } from '@/helpers/options'

interface Props {
  category: string
  searchParams: SearchParams
  hash: string
}

export const Filter: React.FC<Props> = ({ category, searchParams, hash }) => {
  const [totalOptions, setTotalOptions] = useState<TotalOptions | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTotalOptions = async (): Promise<void> => {
      setIsLoading(true)
      const response = await fetch(`/api/total-options?category=${category}&options=${JSON.stringify(searchParams)}`)
      const data = await response.json()
      setTotalOptions(data)
      setIsLoading(false)
    }
    void fetchTotalOptions()
  }, [hash])

  return (
    <section className={`filter-container ${isLoading ? 'animate-pulse' : ''}`}>
      <header className='filter-container-header'>
        <ProductCount category={category} searchParams={searchParams} hash={hash} />
        <RemoveFilters filterOptions={getOptions(searchParams)} />
      </header>
      <div className='filter-inputs-container'>
        <RangeSlider label='Precio Oferta' minName='price_min' maxName='price_max' min={totalOptions?.priceMin ?? 0} max={totalOptions?.priceMax ?? 0} step={1} textFormat={TextFormatEnum.PRICE} />
        <hr className='filter-divider' />
        <MultiSelect label='Categoria' name='sub_category' options={totalOptions?.subCategory ?? []} aria='seleccionar categoria' />
        <MultiSelect label='Marca' name='brand' options={totalOptions?.brand ?? []} aria='seleccionar marca' />
        <MultiSelect label='Contenido' name='content' options={totalOptions?.content ?? []} aria='seleccionar contenido unitario' />
        <RangeSlider label='Graduación Alcohólica' minName='grade_min' maxName='grade_max' min={totalOptions?.gradeMin ?? 0} max={totalOptions?.gradeMax ?? 0} step={0.1} textFormat={TextFormatEnum.GRADE} />
        <MultiSelect label='Cantidad' name='quantity' options={totalOptions?.quantity ?? []} aria='seleccionar cantidad' />
        <MultiSelect label='Envase' name='package' options={totalOptions?.package ?? []} aria='seleccionar envase' />
      </div>
    </section>
  )
}
