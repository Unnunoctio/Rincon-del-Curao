'use client'

import { useState } from 'react'
import { Navbar } from '../navbar/navbar'
import { Sidebar } from '../sidebar/sidebar'

export const Navigation: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSideOpen, setIsSideOpen] = useState(false)

  return (
    <>
      <Navbar isNavOpen={isNavOpen} navOpen={() => setIsNavOpen(true)} navClose={() => setIsNavOpen(false)} sideOpen={() => setIsSideOpen(true)} />
      <Sidebar isSideOpen={isSideOpen} sideClose={() => setIsSideOpen(false)} />
    </>
  )
}
