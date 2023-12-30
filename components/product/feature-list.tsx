import { Product } from '@/types/api'
import { Category } from '@/types/enums'
import { FeatureItem } from './feature-item'
import { AlcoholicIcon, BitternessIcon, BrandIcon, CategoryIcon, ContentIcon, MadeInIcon, PackageIcon, QuantityIcon, StrainIcon, TemperatureIcon, VarietyIcon, VineyardIcon } from '@/icons'

interface Props extends Omit<Product, 'title' | 'image' | 'websites'> {}

export const FeatureList: React.FC<Props> = ({ category, brand, subCategory, quantity, content, variety, strain, vineyard, alcoholicGrade, bitterness, package: packageProp, madeIn, temperature }) => {
  return (
    <section>
      <h2 className='text-primary font-medium text-[20px]'>Características</h2>
      <ul className='flex flex-col gap-2 w-[250px] mt-2'>
        <FeatureItem title='Marca' value={brand}>
          <BrandIcon className='w-8 h-8 fill-transparent stroke-active' />
        </FeatureItem>
        <FeatureItem title='Categoria' value={subCategory}>
          <CategoryIcon className='w-8 h-8 fill-transparent stroke-active' />
        </FeatureItem>
        <FeatureItem title='Cantidad' value={`${quantity} ${quantity > 1 ? 'Unidades' : 'Unidad'}`}>
          <QuantityIcon className='w-9 h-9 fill-active' />
        </FeatureItem>
        <FeatureItem title='Contenido' value={(content >= 1000) ? `${content / 1000} L` : `${content} cc`}>
          <ContentIcon className='w-8 h-8 fill-active' />
        </FeatureItem>
        {category === Category.BEERS && (
          <FeatureItem title='Estilo' value={variety !== null ? variety : 'N/A'}>
            <VarietyIcon className='w-8 h-8 fill-transparent stroke-active' />
          </FeatureItem>
        )}
        {category === Category.WINES && (
          <FeatureItem title='Cepa' value={strain !== null ? strain : 'N/A'}>
            <StrainIcon className='w-8 h-8 fill-active' />
          </FeatureItem>
        )}
        {category === Category.BEERS && (
          <FeatureItem title='Amargor' value={bitterness !== null ? `${bitterness} IBU` : 'N/A'}>
            <BitternessIcon className='w-8 h-8 fill-active' />
          </FeatureItem>
        )}
        {category === Category.WINES && (
          <FeatureItem title='Viña' value={vineyard !== null ? vineyard : 'N/A'}>
            <VineyardIcon className='w-8 h-8 fill-active' />
          </FeatureItem>
        )}
        <FeatureItem title='Grado Alcohólico' value={`${alcoholicGrade}°`}>
          <AlcoholicIcon className='w-8 h-8 fill-transparent stroke-active' />
        </FeatureItem>
        <FeatureItem title='Envase' value={packageProp}>
          <PackageIcon className='w-8 h-8 fill-active' />
        </FeatureItem>
        <FeatureItem title='Lugar de Origen' value={madeIn}>
          <MadeInIcon className='w-8 h-8 fill-active' />
        </FeatureItem>
        {category === Category.BEERS && (
          <FeatureItem title='Temperatura Óptima' value={temperature !== null ? temperature : 'N/A'}>
            <TemperatureIcon className='w-8 h-8 fill-active' />
          </FeatureItem>
        )}
      </ul>
    </section>
  )
}
