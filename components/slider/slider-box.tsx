
interface Props {
  title: string
  children: JSX.Element
}

export const SliderBox: React.FC<Props> = ({ title, children }) => {
  return (
    <section className='slider-box'>
      <h1 className='slider-box-title'>{title}</h1>
      <div className='slider-box-container'>
        {children}
      </div>
    </section>
  )
}
