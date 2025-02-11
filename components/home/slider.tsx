
interface Props {
  title: string
  children: React.ReactNode
}

export const Slider: React.FC<Props> = ({ title, children }) => {
  return (
    <section className='slider-container'>
      <h1 className='slider-title'>{title}</h1>
      <div className='slider-content'>
        {children}
      </div>
    </section>
  )
}
