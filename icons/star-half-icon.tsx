interface Props {
  className: string
}

export const StarHalfIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
    >
      <path
        d='m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28L12 15.4z'
      />
    </svg>
  )
}
