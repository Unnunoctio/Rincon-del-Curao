/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        active: '#d69e2e'
      },
      margin: {
        15: '3.75rem'
      },
      padding: {
        13: '3.25rem'
      },
      minHeight: {
        'page-container': 'calc(100vh - 72px)'
      },
      maxWidth: {
        'nav-container': '1400px',
        'page-container': '1400px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      transitionProperty: {
        height: 'height',
        'text-colors': 'color'
      },
      gridTemplateColumns: {
        'product-list': 'repeat(auto-fit, minmax(250px, 1fr))'
      },
      screens: {
        xs: '440px'
      }
    }
  },
  plugins: []
}
