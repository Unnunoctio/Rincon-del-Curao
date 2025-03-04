interface Props {
  className?: string;
}

export const ChevronDoubleRightIcon = ({ className }: Props) => {
  return (
    <svg
      className={className}
      width="24"  height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M7 7l5 5l-5 5" />
      <path d="M13 7l5 5l-5 5" />
    </svg>
  )
}
