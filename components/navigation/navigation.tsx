'use client'

import { useState } from 'react'
import { Navbar } from './navbar/navbar'
import { Sidebar } from './sidebar/sidebar'

export const Navigation: React.FC = (): JSX.Element => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <>
      <Navbar isOpen={isNavOpen} onOpen={() => setIsNavOpen(true)} onClose={() => setIsNavOpen(false)} />
      <Sidebar />
    </>
  )
}
