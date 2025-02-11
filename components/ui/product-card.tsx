import { ProductPreview as IProductPreview } from '@/graphql/types'
import '@/styles/globals.css'
import Link from 'next/link'
import { AverageCard } from './average-card'

interface Props extends IProductPreview {
}

export const ProductPreview: React.FC<Props> = ({ slug, title, price, bestPrice, discount, average, image }) => {
  return (
    <Link href={`/productos/${slug}`} className='link-card'>
      <article className='group card'>
        <div className='card-image-container'>
          <img src={image} alt={title} width={192} height={192} loading='lazy' className='card-image' />
        </div>
        {discount !== 0 && <span className='card-discount'>{discount}% desc.</span>}
        {average !== 0 && <AverageCard average={average} />}
        <div className='card-text-container'>
          <h2 className='card-title'>{title}</h2>
          <div className='card-price-container'>
            {price !== bestPrice && <span className='card-price'>${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>}
            <span className='card-best-price'>${bestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
