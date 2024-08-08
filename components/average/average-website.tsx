import { StarBorderIcon, StarIcon } from '@/icons'

interface Props {
  average: number | null
}

export const AverageWebsite: React.FC<Props> = ({ average }) => {
  return (
    <div className='average-website-container'>
      {average !== null && <StarIcon className='average-icon-star-active' />}
      {average === null && <StarBorderIcon className='average-icon-star' />}
      <span className='average-text'>
        {average !== null ? average.toFixed(1) : 0}
      </span>
    </div>
  )
}
