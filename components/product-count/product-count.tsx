import { ProductCountLoader } from './product-count-loader'

interface Props {
  isLoading: boolean
  totalCount: number | undefined
  className?: string
}

export const ProductCount: React.FC<Props> = ({ isLoading, totalCount, className = '' }) => {
  if (isLoading || totalCount === undefined) return <ProductCountLoader className={className} />

  return <span className={`product-list-count ${className}`}>{totalCount} {totalCount !== 1 ? 'productos' : 'producto'}</span>
}
