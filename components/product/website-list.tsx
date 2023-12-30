import { Website } from '@/types/api'
import { WebsiteItem } from './website-item'
import { WebsiteNotFound } from './website-not-found'

interface Props {
  websites: Website[]
}

export const WebsiteList: React.FC<Props> = ({ websites }) => {
  return (
    <section className='max-w-[270px] w-full min-w-[240px]'>
      <h2 className='text-primary font-medium text-2xl'>Tiendas</h2>
      {websites.length === 0 && <WebsiteNotFound />}
      {websites.length > 0 && (
        <ul className='flex flex-col gap-3 mt-2 '>
          {websites.map((website, index) => (
            <li key={index}>
              <WebsiteItem {...website} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
