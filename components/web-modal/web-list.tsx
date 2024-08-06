/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import useSWR from 'swr'
import { Web } from '@/types/api'
import { fetcher } from '@/helpers/fetcher'
import { WebCheckbox } from './web-checkbox'
import { WebListLoader } from './web-list-loader'
import { WebListError } from './web-list-error'

interface Props {
  websCookie: string[]
}

export const WebList: React.FC<Props> = ({ websCookie }) => {
  const { data, error, isLoading } = useSWR<Web[], Error>('/api/webs', fetcher)

  if (error) return <WebListError />
  if (isLoading) return <WebListLoader />

  return (
    <ul className='web-list'>
      {data?.map((web, index) => (
        <li key={index} className='web-item'>
          <WebCheckbox value={web.code} label={web.name} checked={websCookie.includes(web.code) || websCookie.length === 0} />
        </li>
      ))}
    </ul>
  )
}
