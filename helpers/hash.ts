import { SearchParams } from '@/types/types'
import { cookies } from 'next/headers'

export const generateHash = (category: string, searchParams: SearchParams): string => {
  let hash = `${category}`

  const cookieStore = cookies()
  const webs = cookieStore.get('prefWebs')?.value
  if (webs !== undefined) hash += '-' + webs.toString()

  if (!isNaN(Number(searchParams.price_min))) hash += '-' + searchParams.price_min.toString()
  if (!isNaN(Number(searchParams.price_max))) hash += '-' + searchParams.price_max.toString()
  if (!isNaN(Number(searchParams.grade_min))) hash += '-' + searchParams.grade_min.toString()
  if (!isNaN(Number(searchParams.grade_max))) hash += '-' + searchParams.grade_max.toString()
  if (searchParams.sub_category !== undefined) hash += '-' + searchParams.sub_category.toString()
  if (searchParams.brand !== undefined) hash += '-' + searchParams.brand.toString()
  if (searchParams.content !== undefined) hash += '-' + searchParams.content.toString()
  if (searchParams.quantity !== undefined) hash += '-' + searchParams.quantity.toString()
  if (searchParams.package !== undefined) hash += '-' + searchParams.package.toString()

  return hash.toLowerCase().replaceAll(' ', '-')
}

export const generateWebsHash = (): string => {
  const cookieStore = cookies()
  const webs = cookieStore.get('prefWebs')?.value
  return (webs !== undefined) ? webs.toString() : ''
}
