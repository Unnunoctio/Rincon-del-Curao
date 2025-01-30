'use client'

import { MoonIcon } from '@/icons/layout/moon-icon'
import { SunIcon } from '@/icons/layout/sun-icon'
import { SystemIcon } from '@/icons/layout/system-icon'
import { useTheme } from 'next-themes'
import { JSX } from 'react'

export const ThemeSwitch: React.FC = (): JSX.Element => {
  const { theme, setTheme } = useTheme()

  return (
    <section className='n-theme-container'>
      <button
        onClick={() => setTheme('light')}
        className={`n-theme-button ${theme === 'light' ? 'n-theme-button-active' : ''}`}
        aria-label='Modo claro'
      >
        <SunIcon className={`n-theme-icon ${theme === 'light' ? 'n-theme-icon-active' : ''}`} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`n-theme-button ${theme === 'system' ? 'n-theme-button-active' : ''}`}
        aria-label='Modo del sistema'
      >
        <SystemIcon className={`n-theme-icon ${theme === 'system' ? 'n-theme-icon-active' : ''}`} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`n-theme-button ${theme === 'dark' ? 'n-theme-button-active' : ''}`}
        aria-label='Modo oscuro'
      >
        <MoonIcon className={`n-theme-icon ${theme === 'dark' ? 'n-theme-icon-active' : ''}`} />
      </button>
    </section>
  )
}
