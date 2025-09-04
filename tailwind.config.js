/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e8edff',
          200: '#cfd9ff',
          300: '#a6b9ff',
          400: '#7b95ff',
          500: '#566fff',
          600: '#3e52e6',
          700: '#2f3fba',
          800: '#273590',
          900: '#233175',
        }
      }
    },
  },
  plugins: [],
}
