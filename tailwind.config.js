/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#094C7E',
        secondary: '#800020',
        cream: '#FFF8F0',
        'dark-bg': '#050505',
        'dark-gray': '#1a1a1a',
        'blue-light': '#5FB2D8',
        'low-light': '#707070',
        'low-medium': '#404040',
        'low-dark': '#232323',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        title: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        exg: '5.6rem',
        xg: '4.4rem',
        g: '2.4rem',
        m: '1.6rem',
      },
    },
  },
  plugins: [],
}
