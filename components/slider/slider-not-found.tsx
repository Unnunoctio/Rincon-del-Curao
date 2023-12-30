import { ExclamationIcon } from '@/icons'

interface Props {
  text: string
}

export const SliderNotFound: React.FC<Props> = ({ text }) => {
  return (
    <div className='flex flex-col sm:flex-row justify-center items-center gap-4 w-full min-h-[334px]'>
      <ExclamationIcon className='w-16 h-16 icon-secondary' />
      <span className='text-secondary text-3xl text-center'>{text}</span>
    </div>
  )
}
