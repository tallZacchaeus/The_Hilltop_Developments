import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { act, screen, within } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Root from './Root';
import site from './site/pages';
import SiteRoutes from './site/SiteRoutes';
import { buildSite } from './site/buildSite';

const TEMPLATE = '<html><head><!--app-head:start--><!--app-head:end--></head><body><div id="root"></div></body></html>';
const ROOT_OPEN = '<div id="root">';
const ROOT_CLOSE = '</div></body></html>';

/** The #root markup of every file the build writes, by file name. */
let prerendered = new Map();
let mounted = null;

beforeAll(() => {
  // Server rendering inside jsdom makes React warn about layout effects; that noise isn't under test.
  const silence = vi.spyOn(console, 'error').mockImplementation(() => {});
  prerendered = new Map(
    buildSite(TEMPLATE)
      .filter(({ file }) => file.endsWith('.html'))
      .map(({ file, contents }) => [file, contents.slice(contents.indexOf(ROOT_OPEN) + ROOT_OPEN.length, contents.lastIndexOf(ROOT_CLOSE))]),
  );
  silence.mockRestore();
});

/**
 * Hydrates the prerendered file Vercel would serve for `url` (chosen by path alone; an unknown
 * path gets 404.html), then boots the app with the full URL, query string included.
 */
async function hydrateAt(url) {
  const { file } = site.pageAt(new URL(url, 'http://localhost').pathname);
  const container = document.createElement('div');
  container.innerHTML = prerendered.get(file);
  document.body.appendChild(container);
  window.history.replaceState(null, '', url);

  const errors = [];
  vi.spyOn(console, 'error').mockImplementation((...args) => errors.push(args.map(String).join(' ')));
  const root = await act(async () =>
    hydrateRoot(
      container,
      <Root>
        <BrowserRouter>
          <SiteRoutes />
        </BrowserRouter>
      </Root>,
      { onRecoverableError: (error) => errors.push(String(error)) },
    ),
  );
  mounted = { root, container };
  return { container, errors };
}

afterEach(() => {
  act(() => mounted?.root.unmount());
  mounted?.container.remove();
  mounted = null;
  vi.restoreAllMocks();
  window.history.replaceState(null, '', '/');
});

describe('hydrating prerendered pages', () => {
  it.each(site.pages.filter((page) => page.known).map((page) => page.path))(
    '%s hydrates without mismatches',
    async (url) => {
      const { errors } = await hydrateAt(url);
      expect(errors).toEqual([]);
    },
  );

  // Vercel serves the same 404.html at every unknown URL, including ones under a real section or in the wrong case.
  it.each(['/no-such-page', '/developments/no-such-development', '/about/no-such-section', '/About'])(
    'hydrates 404.html at %s without mismatches',
    async (url) => {
      const { errors } = await hydrateAt(url);

      expect(errors).toEqual([]);
      expect(screen.getByRole('heading', { level: 1, name: 'This page could not be found' })).toBeInTheDocument();
    },
  );

  it('applies ?type= to the contact form once hydrated', async () => {
    const { errors } = await hydrateAt('/contact?type=partnership');

    expect(errors).toEqual([]);
    expect(screen.getByLabelText('Enquiry about')).toHaveValue('partnership');
  });

  it('applies ?category= to the developments filter once hydrated', async () => {
    const { errors } = await hydrateAt('/developments?category=infrastructure');

    expect(errors).toEqual([]);
    const titles = screen.getAllByRole('article').map((card) => within(card).getByRole('heading').textContent);
    expect(titles).toEqual(['Infrastructure Developments']);
  });

  it('keeps prerendered content visible after hydration', async () => {
    const { container } = await hydrateAt('/about');
    const heading = within(container).getByRole('heading', { level: 1, name: 'Who We Are' });

    expect(heading.closest('[style*="opacity: 0"]')).toBeNull();
  });
});
