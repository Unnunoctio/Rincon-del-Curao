import { StarBorderIcon } from '@/icons/ui/star-border-icon'
import { StarHalfIcon } from '@/icons/ui/star-half-icon'
import { StarIcon } from '@/icons/ui/star-icon'

interface Props {
  average: number
}

export const AverageCard: React.FC<Props> = ({ average }) => {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className='card-average'>
      {stars.map((star, index) => (
        (average >= star)
          ? <StarIcon key={index} className='star-active' />
          : (average >= star - 0.5)
              ? <StarHalfIcon key={index} className='star-active' />
              : <StarBorderIcon key={index} className='star-inactive' />
      ))}
      <span className='card-average-text'>{average.toFixed(1)}</span>
    </div>
  )
}
