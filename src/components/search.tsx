'use client'

import { SearchIcon } from "@/icons/search"
import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

export const Search = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [query, setQuery] = useState(searchParams.get("q")?.trim() || "")

  useEffect(() => {
    setQuery(searchParams.get("q")?.trim() || "")
  }, [searchParams])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('q')?.toString().trim() || ''

    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} method="get" className="w-full max-w-full sm:max-w-[244px]">
      <label className="group flex gap-2 px-3 py-2 border border-c-steel-gray focus-within:border-c-snow-white rounded-full w-full cursor-text">
        <SearchIcon className="stroke-c-steel-gray min-w-6 h-6" />
        <input
          name="q"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="[&::-ms-clear]:hidden [&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden outline-none w-full text-c-snow-white"
          placeholder="Buscar"
          autoComplete="off"
        />
      </label>
    </form>
  )
}
