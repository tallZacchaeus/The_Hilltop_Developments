// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { PAGE_ROUTES } from '../data/site';
import { DEVELOPMENTS } from '../data/developments';
import { NOT_FOUND_PAGE, isKnownPath, outputFileFor, prerenderPages } from './routes';

describe('isKnownPath', () => {
  it('recognises every prerendered page, with or without a trailing slash', () => {
    expect(isKnownPath('/')).toBe(true);
    expect(isKnownPath('/about')).toBe(true);
    expect(isKnownPath('/about/')).toBe(true);
    expect(isKnownPath('/developments/splurge')).toBe(true);
  });

  it('rejects unknown paths and the 404 page itself', () => {
    expect(isKnownPath('/developments/no-such-development')).toBe(false);
    expect(isKnownPath('/about/team')).toBe(false);
    expect(isKnownPath(NOT_FOUND_PAGE.path)).toBe(false);
  });
});

describe('prerenderPages', () => {
  const pages = prerenderPages();
  const paths = pages.map((page) => page.path);

  it('covers every top-level page and every development', () => {
    PAGE_ROUTES.forEach((route) => expect(paths).toContain(route));
    DEVELOPMENTS.forEach(({ slug }) => expect(paths).toContain(`/developments/${slug}`));
  });

  it('ends with the not-found page written to 404.html', () => {
    expect(pages.at(-1)).toEqual(NOT_FOUND_PAGE);
    expect(NOT_FOUND_PAGE.file).toBe('404.html');
    expect(PAGE_ROUTES).not.toContain(NOT_FOUND_PAGE.path);
  });

  it('writes each page to its own file', () => {
    const files = pages.map((page) => page.file);
    expect(new Set(files).size).toBe(files.length);
  });
});

describe('outputFileFor', () => {
  it('maps paths to the files Vercel serves with cleanUrls', () => {
    expect(outputFileFor('/')).toBe('index.html');
    expect(outputFileFor('/about')).toBe('about.html');
    expect(outputFileFor('/developments/splurge')).toBe('developments/splurge.html');
  });

  it('rejects paths that could write outside the output folder', () => {
    expect(() => outputFileFor('/../etc/passwd')).toThrow(/unsafe/i);
    expect(() => outputFileFor('about')).toThrow(/unsafe/i);
  });
});
