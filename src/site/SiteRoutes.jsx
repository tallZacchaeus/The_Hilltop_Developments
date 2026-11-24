import { Fragment, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { metaTagsFor } from '../lib/pageMeta';
import useCurrentPage from './useCurrentPage';

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

/** Keeps <title>, the meta tags and the canonical link in step with the page during client-side navigation. */
function useDocumentHead(meta) {
  useEffect(() => {
    document.title = meta.title;
    metaTagsFor(meta).forEach(([attribute, key, content]) => upsertMeta(attribute, key, content));
    upsertCanonical(meta.url);
  }, [meta]);
}

function CurrentPage() {
  const page = useCurrentPage();
  useDocumentHead(page.meta);
  // Keyed by path so a page's state resets when moving to another page of the same kind, such as between developments.
  return <Fragment key={page.path}>{page.element}</Fragment>;
}

// One catch-all route: the page table (src/site/pages.jsx) is the only thing that matches URLs to pages,
// so the router, the <head>, the header and the prerendered files can never disagree about a URL.
const ROUTES = [{ element: <Layout />, children: [{ path: '*', element: <CurrentPage /> }] }];

/**
 * Every page of the site inside the shared layout. Render it inside a router:
 * BrowserRouter in the browser, StaticRouter when prerendering, MemoryRouter in tests.
 */
export default function SiteRoutes() {
  return useRoutes(ROUTES);
}
