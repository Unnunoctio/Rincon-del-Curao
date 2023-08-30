'use client'

import { useState } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export const NavigationV2 = (): React.ReactNode => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSideOpen, setIsSideOpen] = useState(false)

  return (
    <>
      <Navbar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} setIsSideOpen={setIsSideOpen} />
      <Sidebar isSideOpen={isSideOpen} setIsSideOpen={setIsSideOpen} />
    </>
  )
}
