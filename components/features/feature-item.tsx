interface Props {
  title: string
  value: string
  children: React.ReactNode
}

export const FeatureItem: React.FC<Props> = ({ title, value, children }) => {
  return (
    <li className='feature-item-container'>
      <div className='feature-item-icon-container'>
        {children}
      </div>
      <div className='feature-item-text-container'>
        <span className='feature-item-title'>{title}</span>
        <span className='feature-item-value'>{value}</span>
      </div>
    </li>
  )
}
