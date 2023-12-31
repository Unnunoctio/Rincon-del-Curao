import { getProducts } from '@/lib/api'
import { getCookie } from '@/lib/cookies'
import { PreviewCard } from '../card/preview-card'

interface Props {
  page: number
  category: string
}

export const ProductList: React.FC<Props> = async ({ page, category }) => {
  const prefWebs = getCookie('prefWebs')
  const products = await getProducts((prefWebs === null) ? [] : prefWebs.split(','), page, category)

  return (
    <div className='grid grid-cols-product-list justify-items-center gap-8 min-h-product-list'>
      {products.map((product, index) => (
        <PreviewCard key={index} {...product} />
      ))}
    </div>
  )
}
