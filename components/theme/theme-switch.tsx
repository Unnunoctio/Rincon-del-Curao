import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon, SystemIcon } from './icons'

export const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className='flex items-center gap-1 p-1 rounded-full border divider-primary'>
      <button
        onClick={() => setTheme('light')}
        className={`group ${theme === 'light' ? 'bg-page' : 'bg-transparent'} p-1.5 rounded-full hover:bg-page transition-colors`}
        aria-label='light mode'
      >
        <SunIcon className={`w-5 h-5 fill-transparent ${theme === 'light' ? 'stroke-active' : 'icon-stroke-primary'} transition-colors`} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`group ${theme === 'system' ? 'bg-page' : 'bg-transparent'} p-1.5 rounded-full hover:bg-page transition-colors`}
        aria-label='system mode'
      >
        <SystemIcon className={`w-5 h-5 fill-transparent ${theme === 'system' ? 'stroke-active' : 'icon-stroke-primary'} transition-colors`} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`group ${theme === 'dark' ? 'bg-page' : 'bg-transparent'} p-1.5 rounded-full hover:bg-page transition-colors`}
        aria-label='dark mode'
      >
        <MoonIcon className={`w-5 h-5 fill-transparent ${theme === 'dark' ? 'stroke-active' : 'icon-stroke-primary'} transition-colors`} />
      </button>
    </div>
  )
}
