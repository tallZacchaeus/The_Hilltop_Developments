// Writes every file buildSite() produces into dist/ after `vite build`: one prerendered HTML file per
// page (so link previews, search engines and visitors without JavaScript get each page's real content
// and metadata), 404.html, and the sitemap that public/robots.txt points crawlers at.
// Run by `npm run build`; expects dist/ (client build) and dist-ssr/ (server build of src/site/buildSite.jsx).
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PROJECT_DIR = fileURLToPath(new URL('..', import.meta.url));
const CLIENT_DIR = join(PROJECT_DIR, 'dist');
const SERVER_DIR = join(PROJECT_DIR, 'dist-ssr');

async function writeOutput(file, contents) {
  const target = join(CLIENT_DIR, file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents);
}

async function prerender() {
  try {
    const { buildSite } = await import(pathToFileURL(join(SERVER_DIR, 'buildSite.js')).href);
    // Read the template before writing anything: index.html itself is one of the outputs.
    const template = await readFile(join(CLIENT_DIR, 'index.html'), 'utf8');
    const files = buildSite(template);

    for (const { file, contents } of files) {
      await writeOutput(file, contents);
    }
    process.stdout.write(`Wrote ${files.length} files into dist/: every page, 404.html and sitemap.xml\n`);
  } finally {
    await rm(SERVER_DIR, { recursive: true, force: true });
  }
}

prerender().catch((error) => {
  process.stderr.write(`Prerender failed: ${error?.stack ?? error}\n`);
  process.exitCode = 1;
});
