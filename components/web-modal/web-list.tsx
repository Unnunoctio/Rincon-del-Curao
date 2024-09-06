import { WebListLoader } from './web-list-loader'
import { WebListError } from './web-list-error'
import { useEffect, useState } from 'react'
import { useWebsStore } from '@/stores'
import { useCookies } from 'next-client-cookies'
import { WebCheckbox } from './web-checkbox'

export const WebList: React.FC = () => {
  const prefWebsCookie = useCookies().get('prefWebs')
  const websId = (prefWebsCookie === undefined) ? [] : prefWebsCookie.split(',')

  const { allWebs, setWebs, inTime } = useWebsStore((state) => state)
  const [isLoading, setIsLoading] = useState(!inTime())

  useEffect(() => {
    const fetchWebs = async (): Promise<void> => {
      setIsLoading(true)
      const response = await fetch('/api/all-webs')
      const data = await response.json()
      setWebs(data)
      setIsLoading(false)
    }

    if (!inTime()) void fetchWebs()
  }, [])

  if (isLoading) return <WebListLoader />
  if (allWebs.length === 0) return <WebListError />

  return (
    <ul className='web-list'>
      {allWebs?.map((web, index) => (
        <li key={index} className='web-item'>
          <WebCheckbox value={web.code} label={web.name} checked={websId.includes(web.code) || websId.length === 0} />
        </li>
      ))}
    </ul>
  )
}
