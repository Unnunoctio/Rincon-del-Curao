import { WebsiteItem } from './website-item'
import { getProductWebsites } from '@/lib/api/product'
import { WebsiteNotFound } from './website-not-found'

interface Props {
  path: string
}

export const WebsiteList: React.FC<Props> = async ({ path }): Promise<JSX.Element> => {
  const websites = await getProductWebsites(path)

  if (websites.length === 0) return <WebsiteNotFound />

  return (
    <ul className='website-item-list'>
      {websites.map((website, index) => (
        <li key={index}>
          <WebsiteItem {...website} />
        </li>
      ))}
    </ul>
  )
}
