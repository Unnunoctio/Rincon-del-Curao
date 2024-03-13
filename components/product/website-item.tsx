import { Website } from '@/types/api'
import { AverageWebsite } from '../average'

interface Props extends Omit<Website, 'records'> {}

export const WebsiteItem: React.FC<Props> = ({ url, logo, name, average, bestPrice, price }) => {
  return (
    <a href={url} target='_blank' rel='noopener noreferrer' className='w-full'>
      <article className='w-full group flex gap-2 p-2 bg-primary rounded-lg border divider-primary hover:border-hover'>
        <div className='min-w-[48px] flex items-center'>
          <img src={logo} alt={`${name} logo`} loading='lazy' width={48} height={48} className='object-cover' />
        </div>
        <div className='w-full flex flex-col gap-3'>
          <div className='flex gap-2 justify-between'>
            <h3 className='text-primary text-[20px] font-medium truncate'>{name}</h3>
            <AverageWebsite average={average} />
          </div>
          <div className='flex justify-end gap-3 items-baseline'>
            {price !== bestPrice && <span className='text-[16px] text-secondary line-through leading-none truncate'>${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>}
            <span className='font-medium text-[20px] text-active leading-none'>${bestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
          </div>
        </div>
      </article>
    </a>
  )
}
