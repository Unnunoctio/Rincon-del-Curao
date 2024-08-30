import { Suspense } from 'react'
import { WebsiteList } from './website-list'
import { WebsiteLoader } from './website-loader'

interface Props {
  path: string
  hash: string
  className?: string
}

export const WebsiteContainer: React.FC<Props> = ({ path, hash, className = '' }) => {
  return (
    <section className={`${className} website-list-container`}>
      <h2 className='website-list-title'>Tiendas</h2>
      <Suspense key={hash} fallback={<WebsiteLoader />}>
        <WebsiteList path={path} />
      </Suspense>
    </section>
  )
}
