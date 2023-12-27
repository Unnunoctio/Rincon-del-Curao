import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      minHeight: {
        'page-container': 'calc(100vh - 72px)'
      },
      maxWidth: {
        'nav-container': '1450px',
        'page-container': '1500px'
      }
    }
  },
  plugins: []
}

export default config
