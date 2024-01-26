import { getProducts } from '@/lib/api'
import { getCookie } from '@/lib/cookies'
import { PreviewCard } from '../card/preview-card'
import { ProductListNotFound } from './product-list-not-found'
import { FilterOptions } from '@/types/types'

interface Props {
  page: number
  orderBy: string
  category: string
  filterOptions: FilterOptions
}

export const ProductList: React.FC<Props> = async ({ page, orderBy, category, filterOptions }) => {
  // wait 150 miliseconds
  await new Promise(resolve => setTimeout(resolve, 150))

  const prefWebs = getCookie('prefWebs')
  const products = await getProducts((prefWebs === null) ? [] : prefWebs.split(','), page, orderBy, category, filterOptions)

  if (products.length === 0) return <ProductListNotFound />

  return (
    <div className='grid grid-cols-product-list justify-items-center gap-8 min-h-product-list'>
      {products.map((product, index) => (
        <PreviewCard key={index} {...product} />
      ))}
    </div>
  )
}
