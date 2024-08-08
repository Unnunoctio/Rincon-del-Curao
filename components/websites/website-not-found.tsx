import { ExclamationIcon } from '@/icons'

export const WebsiteNotFound: React.FC = () => {
  return (
    <div className='website-list-error-container'>
      <ExclamationIcon className='website-list-error-icon' />
      <span className='website-list-error-text'>
        El producto no se encuentra en las tiendas seleccionadas.
      </span>
    </div>
  )
}
