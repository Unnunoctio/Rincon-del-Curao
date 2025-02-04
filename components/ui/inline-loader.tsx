import '@/styles/inline-loader.css'

export const InlineLoader: React.FC = () => {
  return (
    <div className='inline-loader'>
      <div className='bar bar-a' />
      <div className='bar bar-b' />
      <div className='bar bar-a' />
      <div className='bar bar-b' />
    </div>
  )
}
