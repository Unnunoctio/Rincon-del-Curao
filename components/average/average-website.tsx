import { StarBorderIcon, StarIcon } from '@/icons'

interface Props {
  average: number | null
}

export const AverageWebsite: React.FC<Props> = ({ average }) => {
  return (
    <div className='flex h-fit gap-0.5'>
      {average !== null && <StarIcon className='w-4 h-4 fill-active' />}
      {average === null && <StarBorderIcon className='w-4 h-4 icon-secondary' />}
      <span className='font-medium text-[14px] text-secondary align-super'>
        {average !== null ? average.toFixed(1) : 0}
      </span>
    </div>
  )
}
