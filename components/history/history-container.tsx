
interface Props {
  children: JSX.Element
  width?: number
  height?: number
}

export const HistoryContainer: React.FC<Props> = ({ children, width = 600, height = 300 }) => {
  return (
    <section className='history-chart-section'>
      <div style={{ width: `${width}px`, height: `${height}px` }}>
        {children}
      </div>
    </section>
  )
}
