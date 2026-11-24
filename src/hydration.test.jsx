import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, screen, within } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Root from './Root';
import { render as renderOnServer } from './entry-server';
import { NOT_FOUND_PAGE } from './prerender/routes';

let mounted = null;

/**
 * Hydrates the prerendered HTML for `url` the way the browser would after Vercel serves it:
 * the file is chosen by path alone, then the app boots with the full URL (query string included).
 */
async function hydrateAt(url, serverPath = new URL(url, 'http://localhost').pathname) {
  const silence = vi.spyOn(console, 'error').mockImplementation(() => {});
  const { html } = renderOnServer(serverPath);
  silence.mockRestore();

  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);
  window.history.replaceState(null, '', url);

  const errors = [];
  vi.spyOn(console, 'error').mockImplementation((...args) => errors.push(args.map(String).join(' ')));
  const root = await act(async () =>
    hydrateRoot(
      container,
      <Root>
        <BrowserRouter>
          <App />
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
  window.history.replaceState(null, '', '/');
});

describe('hydrating prerendered pages', () => {
  it.each([
    '/',
    '/about',
    '/services',
    '/developments',
    '/developments/splurge',
    '/insights',
    '/contact',
    '/own-a-piece',
    '/privacy-policy',
    '/terms',
  ])('%s hydrates without mismatches', async (url) => {
    const { errors } = await hydrateAt(url);
    expect(errors).toEqual([]);
  });

  // Vercel serves the same 404.html at every unknown URL, including ones under a real section.
  it.each(['/no-such-page', '/developments/no-such-development', '/about/no-such-section'])(
    'hydrates 404.html at %s without mismatches',
    async (url) => {
      const { errors } = await hydrateAt(url, NOT_FOUND_PAGE.path);

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
