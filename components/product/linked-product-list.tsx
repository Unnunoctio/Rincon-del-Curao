import { ProductLinked } from '@/types/api'
import { LinkedProductItem } from './linked-product-item'

interface Props {
  linkedProducts: ProductLinked[]
}

export const LinkedProductList: React.FC<Props> = ({ linkedProducts }) => {
  if (linkedProducts.length === 0) return <></>

  return (
    <section className='w-full'>
      <h2 className='text-primary font-medium text-2xl'>Productos Relacionados</h2>
      <ul className='flex gap-4 overflow-x-auto py-3'>
        {linkedProducts.map((product, index) => (
          <li key={index} className='min-w-[250px] max-w-[250px]'>
            <LinkedProductItem {...product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
