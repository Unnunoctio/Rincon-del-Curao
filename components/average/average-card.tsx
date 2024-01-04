import { StarBorderIcon, StarHalfIcon, StarIcon } from '@/icons'

interface Props {
  average: number
  className?: string
}

export const AverageCard: React.FC<Props> = ({ average, className = '' }) => {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className={`${className} flex flex-col items-center`}>
      {stars.map((star, index) => (
        (average >= star)
          ? <StarIcon key={index} className='w-4 h-4 fill-active' />
          : (average >= star - 0.5)
              ? <StarHalfIcon key={index} className='w-4 h-4 fill-active' />
              : <StarBorderIcon key={index} className='w-4 h-4 icon-secondary' />
      ))}
      <span className='font-medium text-[14px] text-secondary'>{average.toFixed(1)}</span>
    </div>
  )
}
