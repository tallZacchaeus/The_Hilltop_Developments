/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#14265F',
          deep: '#10204F',
          soft: '#253D76',
        },
        sky: {
          50: '#F4F8FC',
          100: '#E9EFF5',
          200: '#D5E9F8',
          300: '#C2DEF4',
        },
        gold: {
          DEFAULT: '#D4B76E',
          soft: '#E2C985',
        },
        line: 'rgb(20 38 95 / 0.09)',
      },
      fontFamily: {
        display: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        h1: ['clamp(2.5rem, 1.45rem + 3.5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        h2: ['clamp(2.125rem, 1.5rem + 2.3vw, 3.375rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        h3: ['clamp(1.375rem, 1.25rem + 0.45vw, 1.5625rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        lead: ['clamp(1rem, 0.95rem + 0.25vw, 1.125rem)', { lineHeight: '1.6' }],
        eyebrow: ['0.8125rem', { lineHeight: '1', letterSpacing: '0.07em' }],
      },
      borderRadius: {
        panel: '24px',
        card: '20px',
        inner: '14px',
        btn: '10px',
      },
      boxShadow: {
        card: '0 1px 2px rgb(20 38 95 / 0.04), 0 12px 32px -18px rgb(20 38 95 / 0.22)',
        button: '0 1px 2px rgb(20 38 95 / 0.08), 0 6px 16px -8px rgb(20 38 95 / 0.35)',
        header: '0 1px 0 rgb(20 38 95 / 0.06), 0 8px 24px -16px rgb(20 38 95 / 0.18)',
      },
      maxWidth: {
        content: '1240px',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
