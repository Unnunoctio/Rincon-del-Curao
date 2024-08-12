import { Product } from '@/types/api'
import { Category } from '@/types/enums'
import { AlcoholicIcon, BitternessIcon, BrandIcon, CategoryIcon, ContentIcon, MadeInIcon, PackageIcon, QuantityIcon, StrainIcon, TemperatureIcon, VarietyIcon, VineyardIcon } from '@/icons'
import { FeatureItem } from './feature-item'

interface Props extends Omit<Product, 'title' | 'image' | 'websites'> {
  className?: string
}

export const FeatureList: React.FC<Props> = ({ category, brand, subCategory, quantity, content, variety, strain, vineyard, alcoholicGrade, bitterness, package: packageProp, madeIn, temperature, className = '' }) => {
  return (
    <section className={className}>
      <h2 className='feature-list-title'>Características</h2>
      <ul className='feature-item-list'>
        <FeatureItem title='Marca' value={brand}>
          <BrandIcon className='icon-box-8 icon-stroke-active' />
        </FeatureItem>
        <FeatureItem title='Categoria' value={subCategory}>
          <CategoryIcon className='icon-box-8 icon-stroke-active' />
        </FeatureItem>
        <FeatureItem title='Cantidad' value={`${quantity} ${quantity > 1 ? 'Unidades' : 'Unidad'}`}>
          <QuantityIcon className='icon-box-9 icon-fill-active' />
        </FeatureItem>
        <FeatureItem title='Contenido' value={(content >= 1000) ? `${content / 1000} L` : `${content} cc`}>
          <ContentIcon className='icon-box-8 icon-fill-active' />
        </FeatureItem>
        {category === Category.BEERS && (
          <FeatureItem title='Estilo' value={variety !== null ? variety : 'N/A'}>
            <VarietyIcon className='icon-box-8 icon-stroke-active' />
          </FeatureItem>
        )}
        {category === Category.WINES && (
          <FeatureItem title='Cepa' value={strain !== null ? strain : 'N/A'}>
            <StrainIcon className='icon-box-8 icon-fill-active' />
          </FeatureItem>
        )}
        {category === Category.BEERS && (
          <FeatureItem title='Amargor' value={bitterness !== null ? `${bitterness} IBU` : 'N/A'}>
            <BitternessIcon className='icon-box-8 icon-fill-active' />
          </FeatureItem>
        )}
        {category === Category.WINES && (
          <FeatureItem title='Viña' value={vineyard !== null ? vineyard : 'N/A'}>
            <VineyardIcon className='icon-box-8 icon-fill-active' />
          </FeatureItem>
        )}
        <FeatureItem title='Grado Alcohólico' value={`${alcoholicGrade}°`}>
          <AlcoholicIcon className='icon-box-8 icon-stroke-active' />
        </FeatureItem>
        <FeatureItem title='Envase' value={packageProp}>
          <PackageIcon className='icon-box-8 icon-fill-active' />
        </FeatureItem>
        <FeatureItem title='Lugar de Origen' value={madeIn}>
          <MadeInIcon className='icon-box-8 icon-fill-active' />
        </FeatureItem>
        {category === Category.BEERS && (
          <FeatureItem title='Temperatura Óptima' value={temperature !== null ? temperature : 'N/A'}>
            <TemperatureIcon className='icon-box-8 icon-fill-active' />
          </FeatureItem>
        )}
      </ul>
    </section>
  )
}
