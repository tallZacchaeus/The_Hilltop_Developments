// Writes a static HTML file for every route after `vite build`, so link previews, search engines
// and visitors without JavaScript get each page's real content and metadata.
// Run by `npm run build`; expects dist/ (client build) and dist-ssr/ (server build of src/entry-server.jsx).
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PROJECT_DIR = fileURLToPath(new URL('..', import.meta.url));
const CLIENT_DIR = join(PROJECT_DIR, 'dist');
const SERVER_DIR = join(PROJECT_DIR, 'dist-ssr');

async function writePage(file, html) {
  const target = join(CLIENT_DIR, file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}

async function prerender() {
  try {
    const server = await import(pathToFileURL(join(SERVER_DIR, 'entry-server.js')).href);
    const template = await readFile(join(CLIENT_DIR, 'index.html'), 'utf8');
    const pages = server.prerenderPages();

    // Sequential on purpose: renders are synchronous and the page count is small.
    for (const { path, file } of pages) {
      await writePage(file, server.renderDocument(template, path));
    }
    process.stdout.write(`Prerendered ${pages.length} pages into dist/\n`);
  } finally {
    await rm(SERVER_DIR, { recursive: true, force: true });
  }
}

prerender().catch((error) => {
  process.stderr.write(`Prerender failed: ${error?.stack ?? error}\n`);
  process.exitCode = 1;
});
