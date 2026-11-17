// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { DEVELOPMENTS } from './data/developments';
import { NOT_FOUND_PAGE, prerenderPages } from './prerender/routes';
import { SITEMAP_FILE, buildSitemap, render, renderDocument } from './entry-server';

const TEMPLATE =
  '<html><head><!--app-head:start--><title>Default</title><!--app-head:end--></head>' +
  '<body><div id="root"></div></body></html>';

// Framer Motion styles for content that waits for JavaScript to fade in (Reveal and the hero).
const HIDDEN_UNTIL_JS = /translateY\((?:24|18)px\)/;

describe('render (prerender entry)', () => {
  it('renders a page with its own metadata', () => {
    const { html, meta } = render('/about');

    expect(html).toContain('Who We Are');
    expect(meta.title).toBe('About Us | Hilltop Developments');
    expect(meta.url).toBe('https://www.thehilltopdevelopments.com/about');
    expect(meta.robots).toBe('index, follow');
  });

  it.each(DEVELOPMENTS.map((development) => [development.slug, development]))(
    'gives /developments/%s its own link preview',
    (slug, development) => {
      const { html, meta } = render(`/developments/${slug}`);

      expect(html).toContain(development.name);
      expect(meta.title).toBe(`${development.name} | Hilltop Developments`);
      expect(meta.description).toBe(development.summary);
    },
  );

  it('renders the not-found page as noindex', () => {
    const { html, meta } = render(NOT_FOUND_PAGE.path);

    expect(html).toContain('This page could not be found');
    expect(meta.robots).toBe('noindex');
  });

  it.each(prerenderPages().map((page) => page.path))('ships %s with its content visible before JavaScript runs', (path) => {
    expect(render(path).html).not.toMatch(HIDDEN_UNTIL_JS);
  });
});

describe('renderDocument', () => {
  it('fills the template with the page head and markup', () => {
    const document = renderDocument(TEMPLATE, '/services');

    expect(document).toContain('<title>Our Services | Hilltop Developments</title>');
    expect(document).toContain('<meta property="og:url" content="https://www.thehilltopdevelopments.com/services" />');
    expect(document).toContain('Expertise That Moves Developments Forward.');
    expect(document).not.toContain('<title>Default</title>');
  });
});

describe('sitemap exports (used by scripts/prerender.js)', () => {
  it('gives the prerender script the sitemap and the file to write it to', () => {
    expect(SITEMAP_FILE).toBe('sitemap.xml');
    expect(buildSitemap()).toContain('<loc>https://www.thehilltopdevelopments.com/developments/splurge</loc>');
  });
});
