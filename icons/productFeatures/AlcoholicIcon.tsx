
export const AlcoholicIcon = ({ className }: { className?: string }): React.ReactNode => {
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
        <path d='M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Z' />
        <path
          d='M15.85 16.4a.55.55 0 1 0 0-1.1.55.55 0 0 0 0 1.1Zm-7.7-7.7a.55.55 0 1 0 0-1.1.55.55 0 0 0 0 1.1Z'
        />
        <path d='m16.4 7.6-8.8 8.8' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  )
}
