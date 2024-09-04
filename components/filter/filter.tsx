import { FilterOptions } from '@/types/api'
import { RangeSlider } from './range-slider'
import { TextFormatEnum } from '@/types/enums'
import { MultiSelect } from './multi-select'
import { ProductCount } from '../product-count'
import { Filter as FilterType } from '@/types/types'
import { SearchFilter } from './search-filter'
import { RemoveFilters } from './remove-filters'

interface Props {
  isLoading: boolean
  totalCount: number | undefined
  filterOptions: FilterOptions | undefined
  filter: FilterType
}

export const Filter: React.FC<Props> = ({ isLoading, totalCount, filterOptions, filter }) => {
  return (
    <section className={`filter-container ${isLoading ? 'animate-pulse' : ''}`}>
      <header className='filter-container-header'>
        <ProductCount isLoading={isLoading} totalCount={totalCount} />
        <RemoveFilters filter={filter} />
      </header>
      <div className='filter-inputs-container'>
        <SearchFilter label='Palabras Clave' name='search' placeholder='Palabra clave...' value={filter.search} aria='buscar por palabra clave' />
        <RangeSlider label='Precio Oferta' minName='price_min' maxName='price_max' min={filterOptions?.priceMin ?? 0} max={filterOptions?.priceMax ?? 0} step={1} textFormat={TextFormatEnum.PRICE} />
        <hr className='filter-divider' />
        <MultiSelect label='Categoria' name='sub_category' options={filterOptions?.subCategory ?? []} aria='seleccionar categoria' />
        <MultiSelect label='Marca' name='brand' options={filterOptions?.brand ?? []} aria='seleccionar marca' />
        <MultiSelect label='Contenido' name='volume' options={filterOptions?.volume ?? []} aria='seleccionar contenido unitario' />
        <RangeSlider label='Graduación Alcohólica' minName='abv_min' maxName='abv_max' min={filterOptions?.abvMin ?? 0} max={filterOptions?.abvMax ?? 0} step={0.1} textFormat={TextFormatEnum.GRADE} />
        <MultiSelect label='Cantidad' name='quantity' options={filterOptions?.quantity ?? []} aria='seleccionar cantidad' />
        <MultiSelect label='Envase' name='packaging' options={filterOptions?.packaging ?? []} aria='seleccionar envase' />
      </div>
    </section>
  )
}
