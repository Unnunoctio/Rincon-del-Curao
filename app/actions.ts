'use server'

import { getAllWebs as getAllWebsApi } from '@/lib/api'
import { Web } from '@/types/api'
import { cookies } from 'next/headers'

export async function getAllWebs (): Promise<Web[]> {
  const allWebs = await getAllWebsApi()
  return allWebs
}

export async function getCookie (key: string): Promise <string | undefined> {
  const cookieStore = cookies()
  const cookie = cookieStore.get(key)
  if (cookie !== undefined) {
    return cookie.value
  }
  return undefined
}

export async function setPrefWebs (formData: FormData): Promise <void> {
  const prefWebs = formData.getAll('webs').join(',')
  const cookieStore = cookies()
  cookieStore.set('prefWebs', prefWebs)
}
