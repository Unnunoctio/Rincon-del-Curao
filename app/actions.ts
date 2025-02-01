'use server'

import { cookies } from 'next/headers'

export async function setCookie (key: string, value: string): Promise <boolean> {
  if (value === '') return false
  const cookieStore = await cookies()
  cookieStore.set(key, value, { sameSite: 'strict' })
  return true
}
