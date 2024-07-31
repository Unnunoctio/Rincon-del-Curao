'use client'

import { useState } from 'react'
import { Navbar } from './navbar/navbar'

export const Navigation: React.FC = (): JSX.Element => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSideOpen, setIsSideOpen] = useState(false)

  return (
    <>
      <Navbar isOpen={isNavOpen} onOpen={() => setIsNavOpen(true)} onClose={() => setIsNavOpen(false)} sideOpen={() => setIsSideOpen(true)} />
    </>
  )
}
