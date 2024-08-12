import { ExclamationIcon } from '@/icons'

export const WebListError: React.FC = () => {
  return (
    <div className='web-list-container'>
      <div className='web-error-container'>
        <ExclamationIcon className='web-error-icon' />
        <span className='web-error-text'>Lo sentimos, tenemos problemas para obtener las tiendas.</span>
      </div>
    </div>
  )
}
