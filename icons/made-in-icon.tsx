interface Props {
  className: string
}

export const MadeInIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24' height='24'
      viewBox='0 0 24 24'
    >
      <path
        d='M11.6 12c-1.32 0-2.4-1.08-2.4-2.4 0-1.32 1.08-2.4 2.4-2.4 1.32 0 2.4 1.08 2.4 2.4 0 1.32-1.08 2.4-2.4 2.4Zm7.2-2.16c0-4.356-3.18-7.44-7.2-7.44S4.4 5.484 4.4 9.84c0 2.808 2.34 6.528 7.2 10.968 4.86-4.44 7.2-8.16 7.2-10.968ZM11.6 0c5.04 0 9.6 3.864 9.6 9.84 0 3.984-3.204 8.7-9.6 14.16C5.204 18.54 2 13.824 2 9.84 2 3.864 6.56 0 11.6 0Z'
      />
    </svg>
  )
}
