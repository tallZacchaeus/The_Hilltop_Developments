import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '../data/site';

function upsertMeta(attribute, key, content) {
  const existing = document.head.querySelector(`meta[${attribute}="${key}"]`);
  const element = existing ?? document.createElement('meta');
  if (!existing) {
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertCanonical(href) {
  const existing = document.head.querySelector('link[rel="canonical"]');
  const link = existing ?? document.createElement('link');
  if (!existing) {
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Sets the document title, description, canonical URL and Open Graph tags for the current route.
 * Pages call this once at the top: `usePageMeta({ title: 'About', description: '…' })`.
 * `noIndex` keeps soft-404 pages out of search results (the SPA always answers 200).
 * @param {{ title?: string, description?: string, noIndex?: boolean }} meta
 */
export default function usePageMeta({ title, description, noIndex = false } = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
    const summary = description ?? SITE.description;
    // "/about/" and "/about" are the same page; canonicalise without the trailing slash.
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    const url = `${SITE.url}${path}`;

    document.title = fullTitle;
    upsertMeta('name', 'robots', noIndex ? 'noindex' : 'index, follow');
    upsertMeta('name', 'description', summary);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', summary);
    upsertMeta('property', 'og:url', url);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', summary);
    upsertCanonical(url);
  }, [title, description, noIndex, pathname]);
}
