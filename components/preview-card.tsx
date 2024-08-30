import Link from 'next/link'
import { ProductPreview } from '@/types/api'
import { AverageCard } from './average'

interface Props extends ProductPreview {
  className?: string
}

export const PreviewCard: React.FC<Props> = ({ path, title, price, bestPrice, discount, average, image, className = '' }) => {
  return (
    <Link href={`productos/${path}`} className={`preview-card-container ${className}`}>
      <article className='group preview-card'>
        <div className='preview-card-image-container'>
          <img src={image} alt={title} width={192} height={192} loading='lazy' className='preview-card-image' />
        </div>
        {discount !== 0 && <span className='preview-card-discount'>{discount}% desc.</span>}
        {average !== 0 && <AverageCard average={average} />}
        <div className='preview-card-text-container'>
          <h2 className='preview-card-title'>{title}</h2>
          <div className='preview-card-price-container'>
            {price !== bestPrice && <span className='preview-card-best-price'>${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>}
            <span className='preview-card-price'>${bestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
