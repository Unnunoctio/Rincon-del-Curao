interface Props {
  className?: string;
}

export const ChevronRightIcon = ({ className }: Props) => {
  return (
    <svg
      className={className}
      width="24"  height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 6l6 6l-6 6" />
    </svg>
  )
}
