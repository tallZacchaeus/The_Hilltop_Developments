import { PAGE_ROUTES } from '../data/site';
import { DEVELOPMENTS } from '../data/developments';
import { canonicalPath } from '../lib/pageMeta';

/** A path no route matches: rendering it gives the NotFound page, which Vercel serves as 404.html. */
export const NOT_FOUND_PAGE = Object.freeze({ path: '/404', file: '404.html' });

/** Every real page: the top-level routes plus one page per development (from the content data). */
const KNOWN_PATHS = Object.freeze([...PAGE_ROUTES, ...DEVELOPMENTS.map(({ slug }) => `/developments/${slug}`)]);
const KNOWN_PATH_SET = new Set(KNOWN_PATHS);

// Lowercase slug segments only, so a bad data entry can never write outside the output folder.
const SAFE_PATH = /^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/;

/**
 * Whether a URL path is one of the site's real pages (anything else gets the 404 page).
 * @param {string} pathname
 */
export function isKnownPath(pathname) {
  return KNOWN_PATH_SET.has(canonicalPath(pathname));
}

/**
 * The file a path is written to, matching Vercel's `cleanUrls` ("/about" → "about.html").
 * @param {string} path
 */
export function outputFileFor(path) {
  if (!SAFE_PATH.test(path)) {
    throw new Error(`Refusing to prerender unsafe path: ${path}`);
  }
  return path === '/' ? 'index.html' : `${path.slice(1)}.html`;
}

/**
 * Every page to prerender: the known pages, then the 404 page.
 * New developments are picked up automatically from the content data.
 * @returns {ReadonlyArray<Readonly<{ path: string, file: string }>>}
 */
export function prerenderPages() {
  const pages = KNOWN_PATHS.map((path) => Object.freeze({ path, file: outputFileFor(path) }));
  return Object.freeze([...pages, NOT_FOUND_PAGE]);
}
