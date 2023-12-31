import { getTotalProducts } from '@/lib/api'
import { getCookie } from '@/lib/cookies'

interface Props {
  category: string
  className?: string
}

export const ProductCount: React.FC<Props> = async ({ category, className }): Promise<JSX.Element> => {
  const prefWebs = getCookie('prefWebs')
  const count = await getTotalProducts((prefWebs === null) ? [] : prefWebs.split(','), category)

  return (
    <span className={className}>{count} productos</span>
  )
}
