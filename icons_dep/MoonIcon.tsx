
export const MoonIcon = ({ className }: { className?: string }): React.ReactNode => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24' height='24'
      viewBox='0 0 24 24'
    >
      <path
        shapeRendering='geometricPrecision'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z'
      />
    </svg>
  )
}
