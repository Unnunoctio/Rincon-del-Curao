import { TotalOptions } from '@/types/api'
import { FilterOptions } from '@/types/types'
import { Suspense } from 'react'
import { ProductCount } from '.'
import { getCookie } from '@/lib/cookies'
import { MultiSelectV2, RangeSlider, RemoveFilters, SearchFilter } from '../filter'

interface Props {
  category: string
  optionsText: string
  filterOptions: FilterOptions
  totalOptions: TotalOptions
}

export const ProductListFilter: React.FC<Props> = ({ category, optionsText, filterOptions, totalOptions }) => {
  const prefWebs = getCookie('prefWebs')

  return (
    <section className='flex flex-col w-full h-full'>
      <header className='flex items-baseline justify-between pb-2 border-b divider-primary'>
        <Suspense key={`${prefWebs as string}${optionsText}`} fallback={<span className='inline-block text-active'>Cargando...</span>}>
          <ProductCount category={category} filterOptions={filterOptions} className='inline-block text-active' />
        </Suspense>

        <RemoveFilters filterOptions={filterOptions} />
      </header>
      <div className='flex flex-col gap-4 py-3'>
        <SearchFilter label='Palabras Clave' name='search' placeholder='Palabra clave...' value={filterOptions.search} aria='buscar por palabra clave' />
        <RangeSlider label='Precio Oferta' minName='price_min' maxName='price_max' min={totalOptions.priceMin} max={totalOptions.priceMax} step={1} />
        <MultiSelectV2 label='Categoria' name='sub_category' options={totalOptions.subCategory} aria='seleccionar categoria' />
        <MultiSelectV2 label='Marca' name='brand' options={totalOptions.brand} aria='seleccionar marca' />
        <MultiSelectV2 label='Contenido' name='content' options={totalOptions.content} aria='seleccionar contenido unitario' />
        <MultiSelectV2 label='Cantidad' name='quantity' options={totalOptions.quantity} aria='seleccionar cantidad' />
        <MultiSelectV2 label='Envase' name='package' options={totalOptions.package} aria='seleccionar envase' />
      </div>
    </section>
  )
}
