// @vitest-environment node
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { PAGE_ROUTES, SITE } from '../data/site';
import { DEVELOPMENTS } from '../data/developments';
import { NOT_FOUND_PAGE } from './routes';
import { SITEMAP_FILE, buildSitemap, renderSitemap } from './sitemap';

const ORIGIN = 'https://www.thehilltopdevelopments.com';

/** The <loc> values of a sitemap, in document order. */
function locsOf(xml) {
  return [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map(([, loc]) => loc);
}

describe('renderSitemap', () => {
  it('returns a sitemaps.org urlset with an absolute canonical URL per page', () => {
    expect(renderSitemap(['/', '/about'])).toBe(
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        `  <url><loc>${ORIGIN}/</loc></url>\n` +
        `  <url><loc>${ORIGIN}/about</loc></url>\n` +
        '</urlset>\n',
    );
  });

  it('keeps the order it is given', () => {
    expect(locsOf(renderSitemap(['/terms', '/', '/about']))).toEqual([`${ORIGIN}/terms`, `${ORIGIN}/`, `${ORIGIN}/about`]);
  });

  it('canonicalises trailing slashes and lists each page once, where it first appears', () => {
    expect(locsOf(renderSitemap(['/about/', '/services', '/about']))).toEqual([`${ORIGIN}/about`, `${ORIGIN}/services`]);
  });

  it('leaves out the 404 page', () => {
    expect(locsOf(renderSitemap(['/', NOT_FOUND_PAGE.path, `${NOT_FOUND_PAGE.path}/`]))).toEqual([`${ORIGIN}/`]);
  });

  it('escapes XML special characters in URLs', () => {
    expect(renderSitemap([`/a&b<c>"d'`])).toContain(`<loc>${ORIGIN}/a&amp;b&lt;c&gt;&quot;d&apos;</loc>`);
  });
});

describe('buildSitemap', () => {
  const locs = locsOf(buildSitemap());

  it('lists every top-level page and every development, and nothing else', () => {
    const expected = [
      ...PAGE_ROUTES.map((route) => `${ORIGIN}${route}`),
      ...DEVELOPMENTS.map(({ slug }) => `${ORIGIN}/developments/${slug}`),
    ];

    expect(locs).toEqual(expected);
  });

  it('never lists the 404 page', () => {
    expect(locs).not.toContain(`${ORIGIN}${NOT_FOUND_PAGE.path}`);
  });
});

describe('public/robots.txt', () => {
  const robots = readFileSync(new URL('../../public/robots.txt', import.meta.url), 'utf8');
  const lines = robots.split('\n').map((line) => line.trim());

  it('lets every crawler see the whole site', () => {
    expect(lines).toContain('User-agent: *');
    expect(lines).toContain('Allow: /');
    // An empty "Disallow:" blocks nothing; any rule with a path would hide part of the site.
    expect(lines.filter((line) => /^Disallow:\s*\S/i.test(line))).toEqual([]);
  });

  it('points crawlers at the generated sitemap on the canonical domain', () => {
    expect(SITEMAP_FILE).toBe('sitemap.xml');
    expect(lines).toContain(`Sitemap: ${SITE.url}/${SITEMAP_FILE}`);
  });
});
