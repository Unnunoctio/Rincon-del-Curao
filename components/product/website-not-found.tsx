import { ExclamationIcon } from '@/icons'

export const WebsiteNotFound: React.FC = () => {
  return (
    <div className='flex flex-col items-center gap-2 w-full my-4'>
      <ExclamationIcon className='w-12 h-12 icon-secondary' />
      <span className='text-secondary text-xl text-center'>
        El producto no se encuentra en las tiendas seleccionadas.
      </span>
    </div>
  )
}
