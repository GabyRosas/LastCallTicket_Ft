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
      },
    },
  },
  plugins: [],
} 