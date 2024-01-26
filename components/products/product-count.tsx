import { getTotalProducts } from '@/lib/api'
import { getCookie } from '@/lib/cookies'
import { FilterOptions } from '@/types/types'

interface Props {
  category: string
  filterOptions: FilterOptions
  className?: string
}

export const ProductCount: React.FC<Props> = async ({ category, filterOptions, className }): Promise<JSX.Element> => {
  // wait 100 miliseconds
  await new Promise(resolve => setTimeout(resolve, 100))

  const prefWebs = getCookie('prefWebs')
  const count = await getTotalProducts((prefWebs === null) ? [] : prefWebs.split(','), category, filterOptions)

  return (
    <span className={className}>{count} productos</span>
  )
}
