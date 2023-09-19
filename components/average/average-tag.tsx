import { StarBorderIcon, StarHalfIcon, StarIcon } from './icons'

interface Props {
  average: number
}

export const AverageTag: React.FC<Props> = ({ average }) => {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className='flex items-center'>
      {stars.map((star, index) => (
        (average >= star)
          ? <StarIcon key={index} className='w-4 h-4 fill-active' />
          : (average >= star - 0.5)
              ? <StarHalfIcon key={index} className='w-4 h-4 fill-active' />
              : <StarBorderIcon key={index} className='w-4 h-4 icon-secondary' />
      ))}
    </div>
  )
}
