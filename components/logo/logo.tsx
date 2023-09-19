import Image from 'next/image'
import Link from 'next/link'

interface Props {
  width: number
  height: number
  boxHeight: number
  className: string
}

export const Logo: React.FC<Props> = ({ width, height, boxHeight, className }) => {
  return (
    <div className={`flex items-center h-[${boxHeight}px]`}>
      <Link href='/' className={className}>
        <Image src='/logo.png' alt='logo' width={width} height={height} quality={100} priority />
      </Link>
    </div>
  )
}
