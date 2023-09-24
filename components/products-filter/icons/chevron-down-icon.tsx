interface Props {
  className: string
}

export const ChevronDownIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='20' height='20'
      viewBox='0 0 20 20'
    >
      <path
        fillRule='evenodd'
        d='M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z'
        clipRule='evenodd'
      />
    </svg>
  )
}
