'use client'

import { Navbar } from './navbar/navbar'
import { Sidebar } from './sidebar/sidebar'

export const Navigation: React.FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Sidebar />
    </>
  )
}
