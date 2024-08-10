import { ExclamationIcon } from '@/icons'

interface Props {
  text: string
}

export const SliderNotFound: React.FC<Props> = ({ text }) => {
  return (
    <div className='slider-error-container'>
      <ExclamationIcon className='slider-error-icon' />
      <span className='slider-error-text'>{text}</span>
    </div>
  )
}
