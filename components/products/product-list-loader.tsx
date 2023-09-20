import { Loader } from '../loader'

export const ProductListLoader: React.FC = () => {
  return (
    <div className='flex justify-center items-center min-h-product-list'>
      <Loader />
    </div>
  )
}
