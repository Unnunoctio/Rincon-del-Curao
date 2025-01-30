import { GET_ALL_WEBS } from '@/graphql/queries'
import { generateClient } from '@aws-amplify/api'
import { JSX, useEffect, useState } from 'react'

const API = generateClient()

export const WebList: React.FC = (): JSX.Element => {
  const [allWebs, setAllWebs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void fetchAllWebs()
  }, [])

  const fetchAllWebs = async (): Promise<void> => {
    try {
      const response: any = await API.graphql({
        query: GET_ALL_WEBS
      })
      setAllWebs(response.data.allWebs)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Cargando...</p>

  return (
    <ul>
      {allWebs.map((web: any, index) => (
        <li key={index}>{web.name}</li>
      ))}
    </ul>
  )
}
