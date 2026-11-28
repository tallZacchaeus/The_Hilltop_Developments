/** @vitest-environment node */
// Pure data checks — no DOM needed, and Node gives import.meta.url a file: URL for the image checks.
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  DEVELOPMENTS,
  DEVELOPMENT_STATUS_LABELS,
  DEVELOPMENT_TYPES,
  UPCOMING_DEVELOPMENTS,
  filterDevelopments,
  findDevelopment,
  getTypeLabel,
} from './developments';
import { HOME_SERVICES, SERVICES } from './services';
import { FAQS, INSIGHTS, OPPORTUNITIES, PROJECT_CATEGORIES } from './content';
import { PARTNERS } from './partners';
import { FOOTER_GROUPS, NAV_ITEMS, SITE } from './site';
import site from '../site/pages';

const PUBLIC_DIR = fileURLToPath(new URL('../../public/', import.meta.url));
const existsInPublic = (src) => existsSync(PUBLIC_DIR + src.replace(/^\//, ''));
const unique = (values) => new Set(values).size === values.length;

const allImages = [
  ...DEVELOPMENT_TYPES.map((item) => item.image),
  ...DEVELOPMENTS.flatMap((item) => [item.image, ...item.gallery.map((photo) => photo.src)]),
  ...SERVICES.filter((item) => item.image).map((item) => item.image),
  ...PROJECT_CATEGORIES.map((item) => item.image),
  ...OPPORTUNITIES.map((item) => item.image),
  ...INSIGHTS.map((item) => item.image),
  ...PARTNERS.filter((item) => item.logo).map((item) => item.logo),
];

describe('developments data', () => {
  it('has unique, URL-safe slugs', () => {
    const slugs = DEVELOPMENTS.map((item) => item.slug);
    expect(unique(slugs)).toBe(true);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it('uses only known types and statuses', () => {
    const typeIds = DEVELOPMENT_TYPES.map((type) => type.id);
    DEVELOPMENTS.forEach((item) => {
      expect(typeIds).toContain(item.type);
      expect(DEVELOPMENT_STATUS_LABELS[item.status]).toBeTruthy();
    });
  });

  it('lists the five residential developments from the copy doc as upcoming', () => {
    expect(UPCOMING_DEVELOPMENTS.map((item) => item.name)).toEqual([
      'Crib by Hilltop',
      'Goshen by Hilltop',
      'Splurge by Hilltop',
      'The Terrace by Hilltop',
      'The Yard by Hilltop',
    ]);
  });

  it('filters by type and returns everything for unknown categories', () => {
    expect(filterDevelopments('residential')).toHaveLength(5);
    expect(filterDevelopments('infrastructure').map((item) => item.slug)).toEqual(['infrastructure']);
    expect(DEVELOPMENT_TYPES.map((type) => type.id)).toEqual(['residential', 'commercial', 'infrastructure']);
    expect(filterDevelopments('all')).toHaveLength(DEVELOPMENTS.length);
    expect(filterDevelopments(undefined)).toHaveLength(DEVELOPMENTS.length);
  });

  it('finds developments by slug and returns null otherwise', () => {
    expect(findDevelopment('goshen')?.name).toBe('Goshen by Hilltop');
    expect(findDevelopment('nope')).toBeNull();
  });

  it('labels known types and passes unknown ones through', () => {
    expect(getTypeLabel('commercial')).toBe('Commercial');
    expect(getTypeLabel('mystery')).toBe('mystery');
  });
});

describe('content data', () => {
  it('has all ten services with unique ids, and seven on the homepage', () => {
    expect(SERVICES).toHaveLength(10);
    expect(unique(SERVICES.map((item) => item.id))).toBe(true);
    expect(HOME_SERVICES).toHaveLength(7);
  });

  it('has all eleven FAQs from the copy doc', () => {
    expect(FAQS).toHaveLength(11);
    FAQS.forEach((faq) => {
      expect(faq.question.endsWith('?')).toBe(true);
      expect(faq.answer.length).toBeGreaterThan(20);
    });
  });

  it('has the three project categories, and Own a Piece offers land only', () => {
    expect(PROJECT_CATEGORIES.map((item) => item.name)).toEqual(['Metropolis', 'Countryside', 'Hinterland']);
    expect(OPPORTUNITIES.map((item) => item.id)).toEqual(['land']);
  });

  it('points every icon, logo and share image in index.html at a file in public/', () => {
    const template = readFileSync(fileURLToPath(new URL('../../index.html', import.meta.url)), 'utf8');
    const assetPaths = [
      ...template.matchAll(/(?:href|content)="(?:https:\/\/www\.thehilltopdevelopments\.com)?(\/[^"/][^"]*\.(?:png|jpg|svg|ico))"/g),
      ...template.matchAll(/"logo": "https:\/\/www\.thehilltopdevelopments\.com(\/[^"]+)"/g),
    ].map((match) => match[1]);

    expect(assetPaths.length).toBeGreaterThanOrEqual(5);
    assetPaths.forEach((path) => expect(existsInPublic(path), `${path} is missing from public/`).toBe(true));
    expect(template).not.toContain('Hilltop_Developments_2');
  });

  it('keeps Marvel Ideations out of the site data and the HTML template', () => {
    const template = readFileSync(fileURLToPath(new URL('../../index.html', import.meta.url)), 'utf8');

    expect(SITE).not.toHaveProperty('parent');
    expect(template).not.toMatch(/marvel/i);
  });

  it('points every image at a file that exists in public/', () => {
    const missing = allImages.filter((src) => !existsInPublic(src));
    expect(missing).toEqual([]);
  });
});

describe('site navigation', () => {
  const isKnownRoute = (to) => site.pageAt(to.split(/[?#]/)[0]).known;

  it('links only to routes the app defines', () => {
    const navLinks = NAV_ITEMS.flatMap((item) => [item, ...(item.children ?? [])]);
    const footerLinks = FOOTER_GROUPS.flatMap((group) => group.links);
    [...navLinks, ...footerLinks].forEach((link) => expect(isKnownRoute(link.to)).toBe(true));
  });
});
