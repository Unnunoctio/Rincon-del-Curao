
interface Props {
  title: string
  children: JSX.Element
}

export const SliderBox: React.FC<Props> = ({ title, children }) => {
  return (
    <div className='w-full min-h-[398.281px]'>
      <h3 className='text-[24px] sm:text-[28px] font-medium text-primary'>{title}</h3>
      <div className='relative px-0 sm:px-4 md:px-6 lg:px-8'>
        {children}
      </div>
    </div>
  )
}
