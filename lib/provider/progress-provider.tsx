'use client'

import { Next13ProgressBar } from 'next13-progressbar'

interface Props {
  children: React.ReactNode
}

export const ProgressProvider: React.FC<Props> = ({ children }) => {
  return (
    <>
      {children}
      <Next13ProgressBar height='3px' color='#d69e2e' options={{ showSpinner: false }} showOnShallow />
    </>
  )
}
