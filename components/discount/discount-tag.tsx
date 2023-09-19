
interface Props {
  discount: number
}

export const DiscountTag: React.FC<Props> = ({ discount }) => {
  return (
    <span className='px-2 py-[3px] text-primary text-[14px] font-medium rounded-full bg-active/60'>
      {discount}% desc
    </span>
  )
}
