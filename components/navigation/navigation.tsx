'use client'

import { useState } from 'react'
import { Navbar } from '../navbar/navbar'
import { Sidebar } from '../sidebar/sidebar'
import { Web } from '@/types/api'

interface Props {
  webs: Web[]
}

export const Navigation: React.FC<Props> = ({ webs }): JSX.Element => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSideOpen, setIsSideOpen] = useState(false)

  return (
    <>
      <Navbar webs={webs} isOpen={isNavOpen} onOpen={() => setIsNavOpen(true)} onClose={() => setIsNavOpen(false)} sideOpen={() => setIsSideOpen(true)} />
      <Sidebar isOpen={isSideOpen} onClose={() => setIsSideOpen(false)} />
    </>
  )
}
