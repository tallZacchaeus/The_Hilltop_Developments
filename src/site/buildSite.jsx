import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Root from '../Root';
import site from './pages';
import SiteRoutes from './SiteRoutes';
import { injectPage, renderHeadTags } from './template';

// public/robots.txt points crawlers at this file.
const SITEMAP_FILE = 'sitemap.xml';
const XML_ENTITIES = Object.freeze({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' });

const escapeXml = (text) => text.replace(/[&<>"']/g, (char) => XML_ENTITIES[char]);

function renderBody(path) {
  return renderToString(
    <Root>
      <StaticRouter location={path}>
        <SiteRoutes />
      </StaticRouter>
    </Root>,
  );
}

/** Every known page that search engines may index, by canonical URL, in table order. */
function renderSitemap(pages) {
  const entries = pages
    .filter((page) => page.known && page.meta.robots !== 'noindex')
    .map((page) => `  <url><loc>${escapeXml(page.meta.url)}</loc></url>\n`);

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `${entries.join('')}</urlset>\n`
  );
}

/**
 * Every file a deploy writes into dist/, built from the client's index.html: one HTML file per page
 * in table order, then 404.html, then sitemap.xml. Each page's <head> comes from the page table, so
 * link previews and search results match what the browser shows. Pure and synchronous: the build
 * script (scripts/prerender.js, through `vite build --ssr`) only writes the results to disk.
 * Throws if the template lacks the app-head markers or an empty #root.
 * @param {string} template
 * @returns {ReadonlyArray<Readonly<{ file: string, contents: string }>>}
 */
export function buildSite(template) {
  const pageFiles = site.pages.map((page) =>
    Object.freeze({
      file: page.file,
      contents: injectPage(template, { headHtml: renderHeadTags(page.meta), appHtml: renderBody(page.path) }),
    }),
  );
  return Object.freeze([...pageFiles, Object.freeze({ file: SITEMAP_FILE, contents: renderSitemap(site.pages) })]);
}
