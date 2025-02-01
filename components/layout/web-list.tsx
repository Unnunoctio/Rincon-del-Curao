import { getAllWebs } from '@/graphql/requests'
import { WebInfo } from '@/graphql/types'
import { ExclamationIcon } from '@/icons/ui/exclamation-icon'
import { useCookies } from 'next-client-cookies'
import { JSX, useEffect, useState } from 'react'
import { Loader } from '../ui/loader'
import { WebCheckbox } from './web-checkbox'

export const WebList: React.FC = (): JSX.Element => {
  const prefersWebsCookie = useCookies().get('prefers-webs')
  const prefersWebsId = (prefersWebsCookie === undefined) ? [] : prefersWebsCookie.split(',')

  const [allWebs, setAllWebs] = useState<WebInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void fetchAllWebs()
  }, [])

  const fetchAllWebs = async (): Promise<void> => {
    try {
      const data = await getAllWebs()
      setAllWebs(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='n-modal-websites-loading-container'>
        <Loader />
      </div>
    )
  }

  if (allWebs.length === 0) {
    return (
      <div className='n-modal-websites-error-container'>
        <div className='n-modal-websites-error-content'>
          <ExclamationIcon className='n-modal-websites-error-icon' />
          <span className='n-modal-websites-error-text'>Lo sentimos, tenemos problemas para obtener las tiendas.</span>
        </div>
      </div>
    )
  }

  return (
    <ul className='n-modal-websites-container'>
      {allWebs.map((web, index) => (
        <li key={index} className='n-modal-website-item'>
          <WebCheckbox value={web.code} label={web.name} checked={prefersWebsId.includes(web.code) || prefersWebsId.length === 0} />
        </li>
      ))}
    </ul>
  )
}
