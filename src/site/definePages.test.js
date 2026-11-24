// @vitest-environment node
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import { definePages } from './definePages';

const el = (text) => createElement('p', null, text);
const ITEMS = Object.freeze([
  { slug: 'alpha', name: 'Alpha', summary: 'The first thing.' },
  { slug: 'beta', name: 'Beta', summary: 'The second thing.' },
]);
const NOT_FOUND = { title: 'Page not found', element: el('Missing') };
const ROWS = [
  { path: '/', description: 'Home page.', element: el('Home') },
  { path: '/about', title: 'About Us', description: 'Who we are.', element: el('About') },
  {
    each: ITEMS,
    path: (item) => `/things/${item.slug}`,
    title: (item) => item.name,
    description: (item) => item.summary,
    element: (item) => el(item.name),
  },
];

describe('definePages', () => {
  const site = definePages(ROWS, NOT_FOUND);

  it('lists pages in table order, families in data order, then the 404 page', () => {
    expect(site.pages.map((page) => page.path)).toEqual(['/', '/about', '/things/alpha', '/things/beta', '/404']);
  });

  it("names each page's file the way Vercel's cleanUrls serves it", () => {
    expect(site.pages.map((page) => page.file)).toEqual([
      'index.html',
      'about.html',
      'things/alpha.html',
      'things/beta.html',
      '404.html',
    ]);
  });

  it('builds each page’s metadata from its row', () => {
    expect(site.pageAt('/').meta.title).toBe('Hilltop Developments — Building Sustainable Cities');
    expect(site.pageAt('/about').meta).toMatchObject({
      title: 'About Us | Hilltop Developments',
      description: 'Who we are.',
      url: 'https://www.thehilltopdevelopments.com/about',
      robots: 'index, follow',
    });
    expect(site.pageAt('/things/beta').meta).toMatchObject({
      title: 'Beta | Hilltop Developments',
      description: 'The second thing.',
    });
    expect(site.pageAt('/things/beta').element.props.children).toBe('Beta');
  });

  it('resolves a trailing slash to the same page', () => {
    expect(site.pageAt('/about/')).toBe(site.pageAt('/about'));
  });

  it('decodes percent-encoded paths the way browsers and the router do', () => {
    expect(site.pageAt('/things/%61lpha')).toBe(site.pageAt('/things/alpha'));
    expect(site.pageAt('/things/%E0%A4%A').known).toBe(false);
  });

  it('keeps an encoded slash inside a segment, so /about%2F is not /about', () => {
    expect(site.pageAt('/about%2F').known).toBe(false);
    expect(site.pageAt('/things%2Falpha').known).toBe(false);
  });

  it.each(['/nope', '/About', '/things/gamma', '/about/team', '/404'])('resolves %s to the 404 page', (path) => {
    const page = site.pageAt(path);

    expect(page.known).toBe(false);
    expect(page.path).toBe('/404');
    expect(page.file).toBe('404.html');
    expect(page.meta.robots).toBe('noindex');
    expect(page.meta.title).toBe('Page not found | Hilltop Developments');
    expect(page.meta.url).toBe('https://www.thehilltopdevelopments.com/404');
  });

  it('marks every table page as known', () => {
    expect(site.pages.filter((page) => page.known).map((page) => page.path)).toEqual([
      '/',
      '/about',
      '/things/alpha',
      '/things/beta',
    ]);
  });

  it('returns frozen pages', () => {
    expect(Object.isFrozen(site.pages)).toBe(true);
    expect(Object.isFrozen(site.pageAt('/about'))).toBe(true);
  });
});

describe('definePages validation', () => {
  const row = (path) => ({ path, description: 'A page.', element: el(path) });

  it.each([
    ['a duplicate path', [row('/about'), row('/about')], /duplicate/i],
    ['a path outside the site', [row('/../etc/passwd')], /unsafe/i],
    ['a trailing slash', [row('/about/')], /unsafe/i],
    ['upper-case letters', [row('/About')], /unsafe/i],
    ['a row claiming the 404 path', [row('/404')], /404/],
    ['a missing description', [{ path: '/x', element: el('x') }], /description/i],
    ['a missing element', [{ path: '/x', description: 'X.' }], /element/i],
    [
      'a family that produces an unsafe path',
      [{ each: [{ slug: 'Bad Slug' }], path: (item) => `/things/${item.slug}`, description: () => 'D.', element: () => el('x') }],
      /unsafe/i,
    ],
    [
      'a family without a description function',
      [{ each: ITEMS, path: (item) => `/things/${item.slug}`, description: 'Shared text.', element: () => el('x') }],
      /family row.*description\(item\)/i,
    ],
    [
      'a family whose data is not a list',
      [{ each: undefined, path: () => '/x', description: () => 'D.', element: () => el('x') }],
      /family row.*each/i,
    ],
  ])('rejects %s when the table loads', (_case, rows, message) => {
    expect(() => definePages(rows, NOT_FOUND)).toThrow(message);
  });

  it('rejects a 404 page without an element', () => {
    expect(() => definePages(ROWS, { title: 'Page not found' })).toThrow(/element/i);
  });
});
