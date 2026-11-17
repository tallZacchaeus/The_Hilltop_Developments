import { canonicalPath, canonicalUrl } from '../lib/pageMeta';
import { NOT_FOUND_PAGE, prerenderPages } from './routes';

/** The file scripts/prerender.js writes into dist/; public/robots.txt points crawlers at it. */
export const SITEMAP_FILE = 'sitemap.xml';

const XML_ENTITIES = Object.freeze({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' });

function escapeXml(text) {
  return text.replace(/[&<>"']/g, (char) => XML_ENTITIES[char]);
}

/**
 * A sitemaps.org XML sitemap listing each path's canonical URL once, in the order given.
 * The 404 page is left out: it is `noindex`, so listing it would send search engines mixed signals.
 * It is the only `noindex` page today; exclude any future `noIndex: true` page here as well.
 * @param {ReadonlyArray<string>} paths
 * @returns {string}
 */
export function renderSitemap(paths) {
  // A Set keeps first-seen order, so "/about/" and "/about" collapse into one entry where the first appeared.
  const listed = [...new Set(paths.map(canonicalPath))].filter((path) => path !== NOT_FOUND_PAGE.path);
  const entries = listed.map((path) => `  <url><loc>${escapeXml(canonicalUrl(path))}</loc></url>\n`);

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `${entries.join('')}</urlset>\n`
  );
}

/**
 * The site's sitemap: every prerendered page except the 404.
 * New developments are listed automatically, because the pages come from the content data.
 * @returns {string}
 */
export function buildSitemap() {
  return renderSitemap(prerenderPages().map(({ path }) => path));
}
