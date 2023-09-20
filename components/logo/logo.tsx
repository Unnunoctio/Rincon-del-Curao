import Image from 'next/image'
import Link from 'next/link'

interface Props {
  width: number
  height: number
  className: string
}

export const Logo: React.FC<Props> = ({ width, height, className }) => {
  return (
    <Link href='/' className={className}>
      <Image src='/logo.png' alt='logo' width={width} height={height} quality={100} priority />
    </Link>
  )
}
