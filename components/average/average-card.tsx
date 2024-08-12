import { StarBorderIcon, StarHalfIcon, StarIcon } from '@/icons'

interface Props {
  average: number
}

export const AverageCard: React.FC<Props> = ({ average }) => {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className='preview-card-average'>
      {stars.map((star, index) => (
        (average >= star)
          ? <StarIcon key={index} className='average-icon-star-active' />
          : (average >= star - 0.5)
              ? <StarHalfIcon key={index} className='average-icon-star-active' />
              : <StarBorderIcon key={index} className='average-icon-star' />
      ))}
      <span className='average-text'>{average.toFixed(1)}</span>
    </div>
  )
}
