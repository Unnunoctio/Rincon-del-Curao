'use client'

import { useState } from 'react'
import { Navbar } from '../navbar/navbar'
import { Sidebar } from '../sidebar/sidebar'

export const Navigation = (): JSX.Element => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSideOpen, setIsSideOpen] = useState(false)

  return (
    <>
      <Navbar isOpen={isNavOpen} onOpen={() => setIsNavOpen(true)} onClose={() => setIsNavOpen(false)} sideOpen={() => setIsSideOpen(true)} />
      <Sidebar isOpen={isSideOpen} onClose={() => setIsSideOpen(false)} />
    </>
  )
}
