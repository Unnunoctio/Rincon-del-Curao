
interface Props {
  title: string
  children: JSX.Element
}

export const SliderBox: React.FC<Props> = ({ title, children }) => {
  return (
    <section className='w-full h-[376px]'>
      <h1 className='text-[24px] sm: text-[28px] font-medium text-primary'>{title}</h1>
      <div className='relative px-0 sm:px-4 md:px-6 lg:px-8'>
        {children}
      </div>
    </section>
  )
}
