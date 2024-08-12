import { ExclamationIcon } from '@/icons'

export const ProductListNotFound: React.FC = () => {
  return (
    <div className='product-list-error-container'>
      <div className='product-list-error'>
        <ExclamationIcon className='product-list-error-icon' />
        <div className='product-list-error-text-container'>
          <span className='product-list-error-text'>Lo sentimos, no hay productos que coincidan con su búsqueda.</span>
          <span className='product-list-error-text-hidden'>Estamos trabajando para tener productos prontamente.</span>
        </div>
      </div>
    </div>
  )
}
