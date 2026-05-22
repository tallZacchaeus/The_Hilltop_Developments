/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#14265F',
          deep: '#10204F',
          soft: '#253D76',
        },
        cream: {
          DEFAULT: '#FFFDF6',
          muted: 'rgba(255, 253, 246, 0.68)',
        },
        paper: '#FFFDF6',
        gold: {
          DEFAULT: '#D4B76E',
          soft: '#E2C985',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['"Inter Tight"', 'sans-serif'],
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'editorial': 'cubic-bezier(0.83, 0, 0.17, 1)',
      }
    },
  },
  plugins: [],
}
