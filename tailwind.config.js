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
          light: '#253D76',
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
        display: ['Sora', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
        sans: ['"Inter Tight"', 'sans-serif'],
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'editorial': 'cubic-bezier(0.83, 0, 0.17, 1)',
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
