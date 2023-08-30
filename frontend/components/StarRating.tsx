import { StarBorderIcon, StarHalfIcon, StarIcon } from '@/icons/productWebsites'

export const StarRating = ({ value }: { value: number }): React.ReactNode => {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className='flex items-center'>
      {stars.map((star, index) => (
        (value >= star)
          ? <StarIcon key={index} className='w-4 h-4 fill-active' />
          : (value >= (star - 0.5)
              ? <StarHalfIcon key={index} className='w-4 h-4 fill-active' />
              : <StarBorderIcon key={index} className='w-4 h-4 icon-secondary' />
            )
      ))}
    </div>
  )
}
