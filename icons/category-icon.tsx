interface Props {
  className: string
}

export const CategoryIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24' height='24'
      viewBox='0 0 24 24'
    >
      <g clipPath='url(#a)'>
        <path
          stroke='#D69E2E'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M1 1h8.25v8.25H1V1Zm13.75 0H23v8.25h-8.25V1ZM1 14.75h8.25V23H1v-8.25Zm13.75 4.125a4.125 4.125 0 1 0 8.25 0 4.125 4.125 0 0 0-8.25 0Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  )
}
