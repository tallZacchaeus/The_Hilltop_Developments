// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { buildPageMeta, canonicalPath, canonicalUrl, metaTagsFor } from './pageMeta';

describe('canonicalPath', () => {
  it('drops trailing slashes but keeps the root', () => {
    expect(canonicalPath('/about/')).toBe('/about');
    expect(canonicalPath('/developments/splurge//')).toBe('/developments/splurge');
    expect(canonicalPath('/')).toBe('/');
  });
});

describe('canonicalUrl', () => {
  it('prefixes the canonical path with the production origin', () => {
    expect(canonicalUrl('/')).toBe('https://www.thehilltopdevelopments.com/');
    expect(canonicalUrl('/developments/splurge/')).toBe('https://www.thehilltopdevelopments.com/developments/splurge');
  });

  it('matches the URL buildPageMeta puts in the canonical link', () => {
    expect(canonicalUrl('/about/')).toBe(buildPageMeta({}, '/about/').url);
  });
});

describe('buildPageMeta', () => {
  it('uses the brand title and site description on the homepage', () => {
    const meta = buildPageMeta({}, '/');

    expect(meta.title).toBe('Hilltop Developments — Building Sustainable Cities');
    expect(meta.description).toMatch(/forward-thinking real estate development company/);
    expect(meta.url).toBe('https://www.thehilltopdevelopments.com/');
    expect(meta.robots).toBe('index, follow');
  });

  it('suffixes page titles with the brand and canonicalises the URL', () => {
    const meta = buildPageMeta({ title: 'About Us', description: 'Who we are.' }, '/about/');

    expect(meta.title).toBe('About Us | Hilltop Developments');
    expect(meta.description).toBe('Who we are.');
    expect(meta.url).toBe('https://www.thehilltopdevelopments.com/about');
  });

  it('marks noIndex pages so search engines skip them', () => {
    expect(buildPageMeta({ title: 'Page not found', noIndex: true }, '/x').robots).toBe('noindex');
  });

  it('returns a frozen object', () => {
    expect(Object.isFrozen(buildPageMeta({}, '/'))).toBe(true);
  });
});

describe('metaTagsFor', () => {
  it('lists the description, robots, Open Graph and Twitter tags for a page', () => {
    const meta = buildPageMeta({ title: 'Services', description: 'What we do.' }, '/services');

    expect(metaTagsFor(meta)).toEqual([
      ['name', 'robots', 'index, follow'],
      ['name', 'description', 'What we do.'],
      ['property', 'og:title', 'Services | Hilltop Developments'],
      ['property', 'og:description', 'What we do.'],
      ['property', 'og:url', 'https://www.thehilltopdevelopments.com/services'],
      ['name', 'twitter:title', 'Services | Hilltop Developments'],
      ['name', 'twitter:description', 'What we do.'],
    ]);
  });
});
