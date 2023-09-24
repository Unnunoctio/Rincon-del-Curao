import { ExclamationIcon } from './icons'

export const ProductListNotFound: React.FC = () => {
  return (
    <div className='flex justify-center items-center min-h-product-list'>
      <div className='flex flex-col lg:flex-row justify-center items-center gap-4'>
        <ExclamationIcon className='w-[100px] h-[100px] icon-secondary' />
        <div className='flex flex-col text-secondary text-2xl gap-2'>
          <span className='text-center lg:text-start'>Lo sentimos, no hay productos que coincidan con su búsqueda.</span>
          <span className='text-center lg:text-start hidden md:block'>Estamos trabajando para tener productos prontamente.</span>
        </div>
      </div>
    </div>
  )
}
