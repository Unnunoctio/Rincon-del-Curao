import { AlcoholicIcon, BitternessIcon, BrandIcon, CategoryIcon, ContentIcon, MadeInIcon, PackageIcon, QuantityIcon, StrainIcon, VarietyIcon, VineyardIcon } from '@/icons/productFeatures'
import { FeatureItem } from './FeatureItem'

interface FeatureListProps {
  brand: string
  subCategory: string
  quantity: number
  content: number
  variety?: string
  strain?: string
  vineyard?: string
  alcoholicGrade: number
  bitterness?: string
  package: string
  madeIn?: string
}

export const FeatureList = ({ brand, subCategory, quantity, content, variety, strain, vineyard, alcoholicGrade, bitterness, package: packageData, madeIn }: FeatureListProps): React.ReactNode => {
  return (
    <div className='mt-6'>
      <h3 className='text-primary text-[20px]'>Caracteristicas</h3>
      <div className='grid grid-cols-1 xs:grid-cols-2 gap-x-3 mt-2'>
        <FeatureItem title='Marca' value={brand}>
          <BrandIcon className='w-8 h-8 fill-transparent stroke-active' />
        </FeatureItem>
        <FeatureItem title='Categoria' value={subCategory}>
          <CategoryIcon className='w-8 h-8 fill-transparent stroke-active' />
        </FeatureItem>
        <FeatureItem title='Cantidad' value={`${quantity} ${quantity > 1 ? 'Unidades' : 'Unidad'}`}>
          <QuantityIcon className='w-9 h-9 fill-active' />
        </FeatureItem>
        <FeatureItem title='Contenido' value={(content > 1000) ? `${content / 1000} L` : `${content} cc`}>
          <ContentIcon className='w-8 h-8 fill-active' />
        </FeatureItem>
        {variety !== null && (
          <FeatureItem title='Estilo' value={variety as string}>
            <VarietyIcon className='w-8 h-8 fill-transparent stroke-active' />
          </FeatureItem>
        )}
        {strain !== null && (
          <FeatureItem title='Cepa' value={strain as string}>
            <StrainIcon className='w-8 h-8 fill-active' />
          </FeatureItem>
        )}
        {bitterness !== null && (
          <FeatureItem title='Amargor' value={bitterness as string}>
            <BitternessIcon className='w-8 h-8 fill-active' />
          </FeatureItem>
        )}
        {vineyard !== null && (
          <FeatureItem title='Viña' value={vineyard as string}>
            <VineyardIcon className='w-8 h-8 fill-active' />
          </FeatureItem>
        )}
        <FeatureItem title='Grado Alcohólico' value={`${alcoholicGrade}°`}>
          <AlcoholicIcon className='w-8 h-8 fill-transparent stroke-active' />
        </FeatureItem>
        <FeatureItem title='Envase' value={packageData}>
          <PackageIcon className='w-8 h-8 fill-active' />
        </FeatureItem>
        {madeIn !== null && (
          <FeatureItem title='Lugar de Origen' value={madeIn as string}>
            <MadeInIcon className='w-8 h-8 fill-active' />
          </FeatureItem>
        )}
      </div>
    </div>
  )
}
