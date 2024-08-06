import { MoonIcon, SunIcon, SystemIcon } from '@/icons'
import { useTheme } from 'next-themes'

export const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className='theme-container'>
      <button
        onClick={() => setTheme('light')}
        className={`theme-button ${theme === 'light' ? 'theme-button-active' : ''}`}
        aria-label='modo claro'
      >
        <SunIcon className={`theme-icon-stroke ${theme === 'light' ? 'theme-icon-stroke-active' : ''}`} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`theme-button ${theme === 'system' ? 'theme-button-active' : ''}`}
        aria-label='modo del sistema'
      >
        <SystemIcon className={`theme-icon-stroke ${theme === 'system' ? 'theme-icon-stroke-active' : ''}`} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`theme-button ${theme === 'dark' ? 'theme-button-active' : ''}`}
        aria-label='modo oscuro'
      >
        <MoonIcon className={`theme-icon-stroke ${theme === 'dark' ? 'theme-icon-stroke-active' : ''}`} />
      </button>
    </div>
  )
}
