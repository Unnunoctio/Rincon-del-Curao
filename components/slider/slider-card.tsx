import { ProductSlider } from '@/types/api'
import Image from 'next/image'
import Link from 'next/link'

interface Props extends ProductSlider {
  children: JSX.Element
}

export const SliderCard: React.FC<Props> = ({ path, title, brand, bestPrice, imageUrl, children }) => {
  return (
    <Link href={`productos/${path}`} className='snap-center snap-always'>
      <div className='p-2 w-max max-w-[250px] bg-primary rounded-md border divider-primary transition-transform hover:scale-105'>
        <Image src={imageUrl} alt={title} width={234} height={200} loading='lazy' className='aspect-[234/200] object-cover rounded-sm' />
        <div className='flex flex-col justify-between pt-2'>
          <header>
            {children}
            <h3 className='font-medium text-[18px] text-primary min-h-[54px]'>{title}</h3>
          </header>
          <div className='flex items-end justify-between'>
            <span className='text-secondary'>{brand}</span>
            <span className='font-medium text-[20px] text-primary'>${bestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
