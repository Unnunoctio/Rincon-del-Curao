import { Loader } from '../loader'

export const SliderLoader = (): JSX.Element => {
  return (
    <div className='flex justify-center items-center w-full min-h-[334px]'>
      <Loader />
    </div>
  )
}
