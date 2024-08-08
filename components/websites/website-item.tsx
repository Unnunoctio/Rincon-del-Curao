import { Website } from '@/types/api'
import { AverageWebsite } from '../average'

interface Props extends Omit<Website, 'records'> {}

export const WebsiteItem: React.FC<Props> = ({ url, logo, name, average, bestPrice, price }) => {
  return (
    <a href={url} target='_blank' rel='noopener noreferrer'>
      <article className='group website-item-container'>
        <div className='website-item-img-container'>
          <img src={logo} alt={`${name} logo`} loading='lazy' width={48} height={48} className='website-item-img' />
        </div>
        <section className='website-item-section-container'>
          <div className='website-item-text-container'>
            <h3 className='website-item-text'>{name}</h3>
            <AverageWebsite average={average} />
          </div>
          <div className='website-item-price-container'>
            {price !== bestPrice && <span className='website-item-price'>${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>}
            <span className='website-item-best-price'>${bestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
          </div>
        </section>
      </article>
    </a>
  )
}
