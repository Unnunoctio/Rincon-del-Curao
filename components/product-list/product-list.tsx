import { getProducts } from '@/lib/api/get-products'
import { SearchParams } from '@/types/types'
import { PreviewCard } from '../preview-card'
import { ProductListNotFound } from './product-list-not-found'

interface Props {
  page: number
  orderBy: string
  category: string
  searchParams: SearchParams
}

export const ProductList: React.FC<Props> = async ({ page, orderBy, category, searchParams }) => {
  const products = await getProducts(page, orderBy, category, searchParams)

  if (products.length === 0) return <ProductListNotFound />

  return (
    <div className='product-list-grid'>
      {products.map((product, index) => (
        <PreviewCard key={index} {...product} />
      ))}
    </div>
  )
}
