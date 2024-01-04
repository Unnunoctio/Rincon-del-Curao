interface Props {
  className: string
}

export const SystemIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24' height='24'
      viewBox='0 0 24 24'
      shapeRendering='geometricPrecision'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    >
      <rect x='2' y='3' width='20' height='14' rx='2' ry='2' />
      <path d='M8 21h8' />
      <path d='M12 17v4' />
    </svg>
  )
}
