
interface Props {
  className?: string
}

export const ProductCountLoader: React.FC<Props> = ({ className = '' }) => {
  return <span className={`product-list-count ${className}`}>Cargando...</span>
}
