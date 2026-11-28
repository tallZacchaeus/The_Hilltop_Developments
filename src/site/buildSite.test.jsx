// @vitest-environment node
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DEVELOPMENTS } from '../data/developments';
import site from './pages';
import { buildSite } from './buildSite';
import { escapeHtml } from './template';

const TEMPLATE =
  '<html><head><!--app-head:start--><title>Default</title><!--app-head:end--></head>' +
  '<body><div id="root"></div></body></html>';

// Framer Motion styles for content that waits for JavaScript to fade in (Reveal and the hero).
const HIDDEN_UNTIL_JS = /translateY\((?:24|18)px\)/;

const files = buildSite(TEMPLATE);
const contentsOf = (file) => files.find((entry) => entry.file === file)?.contents;
const knownPages = site.pages.filter((page) => page.known);

describe('buildSite', () => {
  it('writes one file per page, then 404.html, then sitemap.xml', () => {
    expect(files.map((entry) => entry.file)).toEqual([...site.pages.map((page) => page.file), 'sitemap.xml']);
    expect(site.pages.at(-1).file).toBe('404.html');
    expect(knownPages).toHaveLength(9 + DEVELOPMENTS.length);
  });

  it.each(site.pages.map((page) => [page.file, page]))('gives %s its own head tags', (file, page) => {
    const html = contentsOf(file);

    expect(html).toContain(`<title>${escapeHtml(page.meta.title)}</title>`);
    expect(html).toContain(`<meta property="og:title" content="${escapeHtml(page.meta.title)}" />`);
    expect(html).toContain(`<meta name="description" content="${escapeHtml(page.meta.description)}" />`);
    expect(html).toContain(`<link rel="canonical" href="${page.meta.url}" />`);
    expect(html).not.toContain('<title>Default</title>');
  });

  it('prerenders Partners in Success on About and Services, and no Advisory Board', () => {
    expect(contentsOf('about.html')).toContain('id="partners"');
    expect(contentsOf('services.html')).toContain('id="partners"');
    expect(contentsOf('about.html')).not.toMatch(/advisory board/i);
    expect(contentsOf('developments/goshen.html')).toContain('/images/goshen-flyer.jpg');
  });

  it("renders each page's own content", () => {
    expect(contentsOf('about.html')).toContain('Who We Are');
    expect(contentsOf('services.html')).toContain('Expertise That Moves Developments Forward.');
    expect(contentsOf('developments/splurge.html')).toContain('Splurge by Hilltop');
    expect(contentsOf('developments/splurge.html')).toContain('Splurge by Hilltop | Hilltop Developments');
  });

  it('writes the 404 page as noindex', () => {
    const html = contentsOf('404.html');

    expect(html).toContain('This page could not be found');
    expect(html).toContain('<meta name="robots" content="noindex" />');
  });

  it.each(site.pages.map((page) => page.file))('ships %s with its content visible before JavaScript runs', (file) => {
    expect(contentsOf(file)).not.toMatch(HIDDEN_UNTIL_JS);
  });

  it("lists every known page's canonical URL in the sitemap, in order, without the 404 page", () => {
    const sitemap = contentsOf('sitemap.xml');
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

    expect(sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(locs).toEqual(knownPages.map((page) => page.meta.url));
    expect(locs).not.toContain('https://www.thehilltopdevelopments.com/404');
  });

  it('writes the sitemap that robots.txt points crawlers at', () => {
    const robots = readFileSync(new URL('../../public/robots.txt', import.meta.url), 'utf8');
    const sitemapUrl = robots.match(/^Sitemap: (\S+)$/m)?.[1];

    expect(sitemapUrl).toBe('https://www.thehilltopdevelopments.com/sitemap.xml');
    expect(files.map((entry) => entry.file)).toContain(new URL(sitemapUrl).pathname.slice(1));
  });

  it('fails loudly when the template is missing its markers', () => {
    expect(() => buildSite('<html><body></body></html>')).toThrow(/app-head/);
  });
});
