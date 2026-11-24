import { buildPageMeta, canonicalPath } from '../lib/pageMeta';

/** Every unknown URL resolves to this page; it is prerendered once as 404.html. */
const NOT_FOUND_PATH = '/404';

// Lowercase slug segments only, so a bad row or data entry can never write outside the output folder.
const SAFE_PATH = /^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/;

/** The file Vercel's `cleanUrls` serves for a path: "/about" → "about.html", "/" → "index.html". */
const fileFor = (path) => (path === '/' ? 'index.html' : `${path.slice(1)}.html`);

/**
 * Decodes each path segment like React Router does. An encoded slash stays encoded, so "/about%2F"
 * is not "/about"; malformed escapes are left as they are. Either way the static host serves 404.html.
 */
function decodePath(pathname) {
  return pathname
    .split('/')
    .map((segment) => {
      try {
        return decodeURIComponent(segment).replace(/\//g, '%2F');
      } catch {
        return segment;
      }
    })
    .join('/');
}

const FAMILY_FUNCTIONS = Object.freeze(['path', 'description', 'element']);

/** A family row stands for one page per item of its `each` list. */
function expandFamily(row, index) {
  const family = `Family row ${index + 1}`;
  if (!Array.isArray(row.each)) throw new Error(`${family} needs \`each\` to be a list of items`);
  const missing = FAMILY_FUNCTIONS.find((key) => typeof row[key] !== 'function');
  if (missing) throw new Error(`${family} needs a ${missing}(item) function`);
  if (row.title !== undefined && typeof row.title !== 'function') {
    throw new Error(`${family} needs title to be a title(item) function`);
  }

  return row.each.map((item) => ({
    path: row.path(item),
    title: row.title?.(item),
    description: row.description(item),
    element: row.element(item),
  }));
}

const expandRow = (row, index) => ('each' in row ? expandFamily(row, index) : [row]);

function checkRow(row) {
  const page = `Page "${row.path}"`;
  if (!SAFE_PATH.test(row.path)) {
    throw new Error(`${page} has an unsafe path: use lowercase segments without a trailing slash, like /about`);
  }
  if (row.path === NOT_FOUND_PATH) throw new Error(`${page} is reserved for the 404 page`);
  if (!row.description) throw new Error(`${page} needs a description for search results and link previews`);
  if (!row.element) throw new Error(`${page} needs an element to render`);
  return row;
}

function toPage({ path, title, description, noIndex = false, element }, known) {
  return Object.freeze({ path, file: fileFor(path), known, element, meta: buildPageMeta({ title, description, noIndex }, path) });
}

/**
 * Turns the site's page table into the one answer to "which page is this URL?".
 *
 * Rows: `{ path, title?, description, element }`, or a family row
 * `{ each, path(item), title?(item), description(item), element(item) }` for one page per data item.
 * Throws when the table loads if a path is unsafe, has a trailing slash, repeats, or claims /404,
 * or if a row lacks a description or element, so a bad row fails the tests and the build.
 *
 * @param {ReadonlyArray<object>} rows
 * @param {{ title: string, description?: string, element: import('react').ReactElement }} notFound
 * @returns {Readonly<{
 *   pages: ReadonlyArray<Page>,
 *   pageAt: (pathname: string) => Page,
 * }>} `pages`: table order (families in data order), then the 404 page.
 *   `pageAt`: exact, case-sensitive lookup after decoding and dropping a trailing slash; any
 *   other path, /404 included, gets the 404 page (`known: false`, `noindex`).
 * @typedef {Readonly<{ path: string, file: string, known: boolean, element: import('react').ReactElement,
 *   meta: ReturnType<typeof buildPageMeta> }>} Page
 */
export function definePages(rows, notFound) {
  if (!notFound?.element) throw new Error('The 404 page needs an element to render');

  const known = rows.flatMap(expandRow).map(checkRow).map((row) => toPage(row, true));
  const duplicate = known.find((page, index) => known.findIndex((other) => other.path === page.path) !== index);
  if (duplicate) throw new Error(`Page "${duplicate.path}" is listed twice (duplicate path)`);

  const notFoundPage = toPage({ ...notFound, path: NOT_FOUND_PATH, noIndex: true }, false);
  const byPath = new Map(known.map((page) => [page.path, page]));

  return Object.freeze({
    pages: Object.freeze([...known, notFoundPage]),
    pageAt: (pathname) => byPath.get(canonicalPath(decodePath(pathname))) ?? notFoundPage,
  });
}
