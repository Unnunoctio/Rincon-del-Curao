'use client'

import { useState } from 'react'
import { Navbar } from '../navbar/navbar'

export const Navigation = (): JSX.Element => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSideOpen, setIsSideOpen] = useState(false)

  return (
    <>
      <Navbar isOpen={isNavOpen} open={() => setIsNavOpen(true)} close={() => setIsNavOpen(false)} sideOpen={() => setIsSideOpen(true)} />
    </>
  )
}
