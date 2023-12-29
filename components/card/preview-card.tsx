import { ProductPreview } from '@/types/api'
import Image from 'next/image'
import Link from 'next/link'
import { AverageCard } from '../average'

interface Props extends ProductPreview {
  className?: string
}

export const PreviewCard: React.FC<Props> = ({ path, title, brand, price, bestPrice, discount, average, preview, className = '' }) => {
  return (
    <Link href={`productos/${path}`} className={`min-w-[250px] max-w-[250px] h-fit select-none ${className}`}>
      <article className='relative group flex flex-col items-center gap-3 p-3 bg-primary rounded-lg border divider-primary hover:border-hover'>
        <div className='w-[192px] h-[192px] overflow-hidden rounded'>
          <Image src={preview} alt={title} width={192} height={192} loading='lazy' className='aspect-square object-cover group-hover:scale-105 transition-transform' />
        </div>
        {discount !== 0 && <span className='absolute left-0 top-[30px] text-primary bg-divider group-hover:bg-active/90 p-1.5 leading-none rounded-r-md'>{discount}% desc.</span>}
        {average !== 0 && <AverageCard average={average} className='absolute right-1' />}
        <div className='w-full flex flex-col gap-3'>
          <h3 className='font-medium text-[18px] text-primary text-center line-clamp-2 leading-6'>{title}</h3>
          <div className='flex justify-center gap-3 items-baseline'>
            {price !== bestPrice && <span className='text-[16px] text-secondary line-through leading-none'>${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>}
            <span className='font-medium text-[20px] text-active leading-none'>${bestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
