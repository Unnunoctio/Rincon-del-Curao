import { SearchParams } from '@/types/types'
import { cookies } from 'next/headers'

export const generateHash = (category: string, searchParams: SearchParams): string => {
  let hash = `${category}`

  const cookieStore = cookies()
  const webs = cookieStore.get('prefWebs')?.value
  if (webs !== undefined) hash += '-' + webs.toString()

  if (searchParams.sub_category !== undefined) hash += '-' + searchParams.sub_category.toString()
  return hash.toLowerCase().replaceAll(' ', '-')
}

export const generateWebsHash = (): string => {
  const cookieStore = cookies()
  const webs = cookieStore.get('prefWebs')?.value
  return (webs !== undefined) ? webs.toString() : ''
}
