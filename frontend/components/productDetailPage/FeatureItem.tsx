
export const FeatureItem = ({ title, value, children }: { title: string, value: string, children?: React.ReactNode }): React.ReactNode => {
  return (
    <div className='flex items-center gap-2 p-2'>
      <div className='flex justify-center w-[36px]'>
        {children}
      </div>
      <div className='flex flex-col'>
        <span className='text-active text-[14px] leading-4'>{title}</span>
        <span className='text-primary leading-5'>{value}</span>
      </div>
    </div>
  )
}
