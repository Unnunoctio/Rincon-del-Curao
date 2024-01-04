interface Props {
  className: string
}

export const VarietyIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24' height='24'
      viewBox='0 0 24 24'
    >
      <g
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        clipPath='url(#a)'
      >
        <path d='M1 23 16.4 7.6m0 0h2.2A4.4 4.4 0 0 0 23 3.2V1h-2.2a4.4 4.4 0 0 0-4.4 4.4v2.2ZM2.617 12.583 4.3 10.9l1.683 1.683a3.85 3.85 0 0 1 0 5.434L4.3 19.7l-1.683-1.683a3.85 3.85 0 0 1 0-5.434Zm4.4-4.4L8.7 6.5l1.683 1.683a3.85 3.85 0 0 1 0 5.434L8.7 15.3l-1.683-1.683a3.85 3.85 0 0 1 0-5.434Zm4.4-4.4L13.1 2.1l1.683 1.683a3.85 3.85 0 0 1 0 5.434L13.1 10.9l-1.683-1.683a3.85 3.85 0 0 1 0-5.434Z' />
        <path d='M11.417 18.017 13.1 19.7l-1.683 1.683a3.85 3.85 0 0 1-5.434 0L4.3 19.7l1.683-1.683a3.85 3.85 0 0 1 5.434 0Zm4.4-4.4L17.5 15.3l-1.683 1.683a3.85 3.85 0 0 1-5.434 0L8.7 15.3l1.683-1.683a3.85 3.85 0 0 1 5.434 0Zm4.4-4.4L21.9 10.9l-1.683 1.683a3.85 3.85 0 0 1-5.434 0L13.1 10.9l1.683-1.683a3.85 3.85 0 0 1 5.434 0Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  )
}
