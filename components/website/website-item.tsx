import { Website } from '@/types/api'
import { AverageTag } from '../average/average-tag'
import Image from 'next/image'

interface Props extends Website {}

export const WebsiteItem: React.FC<Props> = ({ url, logo, name, average, bestPrice, price }) => {
  return (
    <a href={url} target='_blank' rel='noopener noreferrer' className='max-w-[300px]'>
      <div className='flex gap-2 p-2 w-full bg-primary rounded-md border divider-primary transition-transform hover:scale-[1.04]'>
        <div className='flex items-center'>
          <Image src={logo} width={48} height={48} alt={`${name} logo`} />
        </div>
        <div className='flex flex-col w-full'>
          <div className='flex justify-between'>
            <h4 className='text.primary text-[18px] font-medium text-primary'>{name}</h4>
            <AverageTag average={average} />
          </div>
          <div className='flex justify-between gap-2'>
            <div className='flex flex-col items-end'>
              <span className='text-secondary text-[14px]'>Precio Oferta</span>
              <span className='text-active font-medium'>${bestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
            </div>
            <div className='flex flex-col items-end'>
              <span className='text-secondary text-[14px]'>Precio Normal</span>
              <span className='text-primary font-medium'>${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}
