/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#851465',  
        'custom-purple-dark': '#5A1D49',
        'custom-purple-light': '#DA69BA',
        'custom-white': '#FFFFFF',
        'custom-gray': '#CECECE',
        'custom-yellow': '#FEFBE1',
        'custom-yellow-transparent': 'rgba(254, 251, 225, 0.8)',
      },
      fontFamily: {
        'chalkboard': ['"Chalkboard SE"', 'Comic Sans MS', 'cursive'],
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        DEFAULT: '4px',
        'md': '0.375rem',
        'lg': '1rem',
        'full': '9999px',
        'large': '12px',
      }
    },
  },
  plugins: [],
} 