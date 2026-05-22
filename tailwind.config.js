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
          DEFAULT: '#203858',
          deep: '#183050',
          soft: '#586880',
        },
        cream: {
          DEFAULT: '#FFFFFF',
          muted: 'rgba(176, 184, 192, 0.82)',
        },
        paper: '#F8F8F8',
        gold: {
          DEFAULT: '#B0B8C0',
          soft: '#F0F0F0',
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
