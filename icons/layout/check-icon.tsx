interface Props {
  className: string
}

export const CheckIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24' height='24'
      viewBox='0 0 24 24'
      fill='none'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-label='check'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M5 12l5 5l10 -10' />
    </svg>
  )
}
