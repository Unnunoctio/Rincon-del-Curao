
interface Props {
  children: JSX.Element
  width?: number
  height?: number
}

export const HistoryContainer: React.FC<Props> = ({ children, width = 600, height = 300 }) => {
  return (
    <div className='inline-block w-auto mt-4'>
      <div style={{ width: `${width}px`, height: `${height}px` }}>
        {children}
      </div>
    </div>
  )
}
