import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Reuse the production security headers from vercel.json so `vite preview`
// behaves like Vercel (catches CSP problems before deploy).
function productionHeaders() {
  const config = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'));
  const entries = config.headers?.[0]?.headers ?? [];
  return Object.fromEntries(entries.map(({ key, value }) => [key, value]));
}

export default defineConfig({
  plugins: [react()],
  preview: {
    headers: productionHeaders(),
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: false,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/main.jsx', 'src/test/**', '**/*.test.{js,jsx}'],
      thresholds: { lines: 80, functions: 80, statements: 80, branches: 75 },
    },
  },
});
