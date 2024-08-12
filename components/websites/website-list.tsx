import { Website } from '@/types/api'
import { WebsiteItem } from './website-item'
import { WebsiteNotFound } from './website-not-found'

interface Props {
  websites: Website[]
  className?: string
}

export const WebsiteList: React.FC<Props> = ({ websites, className = '' }) => {
  return (
    <section className={`${className} website-list-container`}>
      <h2 className='website-list-title'>Tiendas</h2>
      {websites.length === 0 && <WebsiteNotFound />}
      {websites.length > 0 && (
        <ul className='website-item-list'>
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
