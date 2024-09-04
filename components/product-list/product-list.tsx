
import { Filter } from '@/types/types'
import { PreviewCard } from '../preview-card'
import { ProductListNotFound } from './product-list-not-found'
import { getProducts } from '@/lib/api/category/get-products'

interface Props {
  page: number
  orderBy: string
  filter: Filter
}

export const ProductList: React.FC<Props> = async ({ page, orderBy, filter }) => {
  const products = await getProducts(page, orderBy, filter)

  if (products.length === 0) return <ProductListNotFound />

  return (
    <div className='product-list-grid'>
      {products.map((product, index) => (
        <PreviewCard key={index} {...product} />
      ))}
    </div>
  )
}
