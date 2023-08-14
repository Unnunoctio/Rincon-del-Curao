import Image from 'next/image'
import { StarRating } from './StarRating'

interface WebsiteProps {
  name: string
  logo: string
  url: string
  price: number
  bestPrice: number
  average: number
}

export const WebsiteList = ({ websites }: { websites: WebsiteProps[] }): React.ReactNode => {
  return (
    <div className='mt-6'>
      <h3 className='text-primary text-[20px]'>Tiendas</h3>
      <div className='flex flex-col gap-3 mt-2'>
        {websites.map((website, index) => (
          <a key={index} href={website.url} target='_blank' rel='noopener noreferrer' className='max-w-[300px]'>
            <div className='flex gap-2 p-2 w-full bg-primary rounded-md border divider-primary transition-transform hover:scale-[1.04]'>
              <div className='flex items-center'>
                <Image src={website.logo} width={48} height={48} alt={`${website.name} logo`} />
              </div>
              <div className='flex flex-col w-full'>
                <div className='flex justify-between'>
                  <h4 className='text.primary text-[18px] font-medium text-primary'>{website.name}</h4>
                  <StarRating value={website.average} />
                </div>
                <div className='flex justify-between gap-2'>
                  <div className='flex flex-col items-end'>
                    <span className='text-secondary text-[14px]'>Precio Oferta</span>
                    <span className='text-active font-medium'>${website.bestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
                  </div>
                  <div className='flex flex-col items-end'>
                    <span className='text-secondary text-[14px]'>Precio Normal</span>
                    <span className='text-primary font-medium'>${website.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
