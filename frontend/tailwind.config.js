import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5189',
      },
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
        manrope: ['Manrope', ...defaultTheme.fontFamily.sans],
        mansalva: ['Mansalva', ...defaultTheme.fontFamily.sans],
        caveat: ['Caveat Brush', ...defaultTheme.fontFamily.sans],
        rubik: ['Rubik', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'fadeup': {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-100px)' },
        },
        'bg': {
          '100%': { 'background-position': '-1000px' }
        }
      },
      animation: {
        bg: 'bg 2s linear infinite',
        fadeup: 'fadeup 1s ease forwards'
      }
    },
  },
  plugins: [],
}

