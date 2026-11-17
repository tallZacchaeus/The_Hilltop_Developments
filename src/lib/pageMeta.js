import { SITE } from '../data/site';

/** "/about/" and "/about" are the same page; canonicalise without the trailing slash. */
export function canonicalPath(pathname) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

/**
 * Resolves a page's metadata. Shared by the browser (usePageMeta) and the prerender step,
 * so the HTML that link-preview crawlers read matches what the app sets at runtime.
 * @param {{ title?: string, description?: string, noIndex?: boolean }} input
 * @param {string} pathname
 * @returns {Readonly<{ title: string, description: string, url: string, robots: string }>}
 */
export function buildPageMeta({ title, description, noIndex = false } = {}, pathname = '/') {
  return Object.freeze({
    title: title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`,
    description: description ?? SITE.description,
    url: `${SITE.url}${canonicalPath(pathname)}`,
    robots: noIndex ? 'noindex' : 'index, follow',
  });
}

/**
 * The page-specific <meta> tags as [attribute, key, content] triples.
 * The <title> and canonical <link> are handled separately by callers.
 * @param {ReturnType<typeof buildPageMeta>} meta
 */
export function metaTagsFor({ title, description, url, robots }) {
  return [
    ['name', 'robots', robots],
    ['name', 'description', description],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:url', url],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
  ];
}
