import { cookies } from 'next/headers'

export const getCookie = (key: string): string | null => {
  const cookieStore = cookies()
  const cookie = cookieStore.get(key)
  if (cookie != null) {
    return cookie.value
  }
  return null
}
