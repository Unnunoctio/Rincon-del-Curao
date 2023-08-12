
export const BrandIcon = ({ className }: { className?: string }): React.ReactNode => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24' height='24'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 12 2.314 2.314a.84.84 0 0 1-.172-.925.823.823 0 0 1 .789-.532h18.137a.823.823 0 0 1 .789.532.84.84 0 0 1-.172.925L12 12Zm0 0v11.143m-5.143 0h10.285'
      />
    </svg>
  )
}
