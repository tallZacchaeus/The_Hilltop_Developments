import { existsSync, readFileSync } from 'node:fs';
import { join, resolve, sep } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Reuse the production security headers from vercel.json so `vite preview`
// behaves like Vercel (catches CSP problems before deploy).
function productionHeaders() {
  const config = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'));
  const entries = config.headers?.[0]?.headers ?? [];
  return Object.fromEntries(entries.map(({ key, value }) => [key, value]));
}

// True when the request (already rewritten by Vite from /about to /about.html) names an HTML file in dist/.
function existingHtmlFile(distDir, url) {
  try {
    const pathname = decodeURIComponent(new URL(url, 'http://preview.local').pathname);
    const file = resolve(distDir, `.${pathname}`);
    return file.startsWith(`${distDir}${sep}`) && pathname.endsWith('.html') && existsSync(file);
  } catch {
    return false;
  }
}

// Like Vercel with cleanUrls: unknown paths get dist/404.html with a 404 status.
// Runs after Vite's static files and its /about → /about.html rewrite, but before Vite serves the
// HTML, so it lets real pages through and answers everything else with the 404 page.
function previewNotFoundPage() {
  return {
    name: 'hilltop:preview-not-found-page',
    configurePreviewServer(server) {
      const distDir = resolve(server.config.root, server.config.build.outDir);
      const notFoundFile = join(distDir, '404.html');
      return () => {
        server.middlewares.use((req, res, next) => {
          if (existingHtmlFile(distDir, req.url) || !existsSync(notFoundFile)) return next();
          res.statusCode = 404;
          // Vercel applies the security headers to every response, 404s included.
          Object.entries(server.config.preview.headers ?? {}).forEach(([key, value]) => res.setHeader(key, value));
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(readFileSync(notFoundFile));
        });
      };
    },
  };
}

export default defineConfig(({ isPreview, isSsrBuild }) => ({
  plugins: [react(), previewNotFoundPage()],
  // Preview serves only real files, like production: /about → about.html, anything else → 404.html.
  appType: isPreview ? 'mpa' : 'spa',
  build: {
    // The server bundle (src/entry-server.jsx) only renders HTML; it doesn't need public/ assets.
    copyPublicDir: !isSsrBuild,
  },
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
}));
