import { ProductLinked } from '@/types/api'
import Link from 'next/link'

interface Props extends ProductLinked {}

export const LinkedProductItem: React.FC<Props> = ({ path, title, price, bestPrice }) => {
  return (
    <Link href={path} className='h-fit select-none'>
      <article className='flex flex-col items-center gap-3 p-3 bg-primary rounded-lg border divider-primary hover:border-hover'>
        <h3 className='font-medium text-[18px] text-primary text-center line-clap-2 leading-6'>{title}</h3>
        <hr className='w-full divider-primary' />
        <div className='flex justify-center gap-3 items-baseline'>
          {price !== bestPrice && <span className='text-[16px] text-secondary line-through leading-none'>${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>}
          <span className='font-medium text-[20px] text-active leading-none'>${bestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
        </div>
      </article>
    </Link>
  )
}
