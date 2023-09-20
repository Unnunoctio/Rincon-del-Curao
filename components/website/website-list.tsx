import { Website } from '@/types/api'
import { WebsiteItem } from './website-item'

interface Props {
  websites: Website[]
}

export const WebsiteList: React.FC<Props> = ({ websites }) => {
  return (
    <div className='mt-6'>
      <h3 className='text-primary font-medium text-[20px]'>Tiendas</h3>
      <div className='flex flex-col gap-3 mt-2'>
        {websites.map((website, index) => (
          <WebsiteItem key={index} {...website} />
        ))}
      </div>
    </div>
  )
}
