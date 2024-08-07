import { getTotalProducts } from '@/lib/api/get-total-products'
import { SearchParams } from '@/types/types'

interface Props {
  category: string
  searchParams: SearchParams
}

export const ProductCount: React.FC<Props> = async ({ category, searchParams }) => {
  const productsCount = await getTotalProducts(category, searchParams)
  return (
    <span className='product-list-count'>{productsCount} {productsCount !== 1 ? 'productos' : 'producto'}</span>
  )
}
