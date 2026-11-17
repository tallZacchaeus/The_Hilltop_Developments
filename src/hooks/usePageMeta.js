import { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildPageMeta, metaTagsFor } from '../lib/pageMeta';

/**
 * Prerender only: entry-server.jsx provides a callback that receives each page's metadata,
 * because effects (which update <head> in the browser) never run during server rendering.
 */
export const PageMetaSinkContext = createContext(null);

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
 * Sets the document title, description, canonical URL, robots and Open Graph tags for the current route.
 * Pages call this once at the top: `usePageMeta({ title: 'About', description: '…' })`.
 * Prerendered HTML already carries these tags; this keeps them current on client-side navigation.
 * `noIndex` keeps pages such as the 404 out of search results.
 * @param {{ title?: string, description?: string, noIndex?: boolean }} input
 */
export default function usePageMeta({ title, description, noIndex = false } = {}) {
  const { pathname } = useLocation();
  const meta = buildPageMeta({ title, description, noIndex }, pathname);

  // During prerendering, hand the metadata to the renderer (no-op in the browser).
  const reportMeta = useContext(PageMetaSinkContext);
  reportMeta?.(meta);

  const { title: fullTitle, description: summary, url, robots } = meta;
  useEffect(() => {
    const current = { title: fullTitle, description: summary, url, robots };
    document.title = fullTitle;
    metaTagsFor(current).forEach(([attribute, key, content]) => upsertMeta(attribute, key, content));
    upsertCanonical(url);
  }, [fullTitle, summary, url, robots]);
}
