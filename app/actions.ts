'use server'

import { cookies } from 'next/headers'

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
