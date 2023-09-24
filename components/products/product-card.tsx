import { ProductList } from '@/types/api'
import Image from 'next/image'
import Link from 'next/link'

interface Props extends ProductList {}

export const ProductCard: React.FC<Props> = ({ path, title, brand, alcoholicGrade, content, bestPrice, imageUrl }) => {
  return (
    <Link href={`productos/${path}`} className='w-[250px] h-fit'>
      <div className='p-2 bg-primary rounded-md border divider-primary transition-transform hover:scale-105'>
        <Image src={imageUrl} alt={title} width={234} height={200} loading='lazy' className='aspect-[234/200] object-cover rounded-sm' />
        <div className='flex flex-col justify-between pt-2'>
          <header>
            <span className='text-secondary'>{brand}</span>
            <h3 className='font-medium text-[18px] text-primary min-h-[54px]'>{title}</h3>
          </header>
          <div className='flex items-end justify-between'>
            <div className='text-secondary text-[14px]'>
              <span className='block'>Graduación: {alcoholicGrade}°</span>
              <span className='block'>Contenido: {(content >= 1000) ? `${content / 1000} L` : `${content} cc`}</span>
            </div>
            <span className='font-medium text-[20px] text-primary'>${bestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
