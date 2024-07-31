interface Props {
  className: string
}

export const TemperatureIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width={24} height={24}
      viewBox='0 0 24 24'
    >
      <g clipPath='url(#a)'>
        <path d='M12 6.75a.75.75 0 0 1 .75.75v7.595a3 3 0 1 1-1.5 0V7.5a.75.75 0 0 1 .75-.75ZM12 0a4.5 4.5 0 0 0-4.5 4.5v9.531a6 6 0 1 0 9 0v-9.53A4.5 4.5 0 0 0 12 0Zm0 1.5a3 3 0 0 1 3 3v10.133l.215.217a4.5 4.5 0 1 1-6.43 0L9 14.633V4.5a3 3 0 0 1 3-3Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  )
}
