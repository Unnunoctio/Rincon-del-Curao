import { ExclamationIcon } from '@/icons'

export const HistoryNotFound: React.FC = () => {
  return (
    <div className='history-error-container'>
      <section className='history-error-section'>
        <ExclamationIcon className='history-error-icon' />
        <span className='history-error-text'>El producto no contiene historial en las tiendas seleccionadas.</span>
      </section>
    </div>
  )
}
