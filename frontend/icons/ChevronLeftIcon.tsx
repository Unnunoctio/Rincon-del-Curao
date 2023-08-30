
export const ChevronLeftIcon = ({ className }: { className?: string }): React.ReactNode => {
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
        strokeWidth='2'
        d='m15 19l-7-7l7-7'
      />
    </svg>
  )
}
