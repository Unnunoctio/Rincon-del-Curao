'use server'

import { cookies } from "next/headers"

export async function getCookie (key: string): Promise <string | undefined> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(key)
  if (cookie !== undefined) {
    return cookie.value
  }
  return undefined
}

export async function setCookie (key: string, value: string): Promise <boolean> {
  if (value === '') return false
  const cookieStore = await cookies()
  cookieStore.set(key, value)
  return true
}
