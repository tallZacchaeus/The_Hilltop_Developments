import { describe, expect, it } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DEVELOPMENTS } from './data/developments';
import { renderRoute } from './test/renderRoute';

const PAGES = [
  ['/', 'Building Sustainable Cities for Generations'],
  ['/about', 'Who We Are'],
  ['/services', 'Expertise That Moves Developments Forward.'],
  ['/developments', 'Our Real Estate Developments'],
  ['/insights', 'Insights and Updates'],
  ['/contact', 'Get in Touch with Hilltop'],
  ['/own-a-piece', 'Own a Piece of the Earth.'],
  ['/privacy-policy', 'Privacy Policy'],
  ['/terms', 'Terms & Conditions'],
];

describe('routes', () => {
  it.each(PAGES)('%s renders exactly one h1: "%s"', (path, heading) => {
    renderRoute(path);
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it.each(DEVELOPMENTS.map((item) => [item.slug, item.name]))('/developments/%s shows %s', (slug, name) => {
    renderRoute(`/developments/${slug}`);
    expect(screen.getByRole('heading', { level: 1, name })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register interest/i })).toHaveAttribute(
      'href',
      `/contact?type=development&development=${slug}`,
    );
  });

  // Client request (Nov 2026): the parent-brand line is removed from the site.
  it.each(PAGES)('%s never mentions Marvel Ideations', (path) => {
    renderRoute(path);
    expect(document.body.textContent).not.toMatch(/marvel/i);
  });

  it('shows the not-found page for unknown paths and marks it noindex', () => {
    renderRoute('/no-such-page');
    expect(screen.getByRole('heading', { level: 1, name: 'This page could not be found' })).toBeInTheDocument();
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  });

  it('shows the not-found page for an unknown development slug', () => {
    renderRoute('/developments/atlantis');
    expect(screen.getByRole('heading', { level: 1, name: 'This page could not be found' })).toBeInTheDocument();
  });

  // The static host matches file names exactly, so /About gets 404.html; the app must agree to hydrate it.
  it('treats paths as case-sensitive, like the static host', () => {
    renderRoute('/About');
    expect(screen.getByRole('heading', { level: 1, name: 'This page could not be found' })).toBeInTheDocument();
  });
});

describe('page metadata', () => {
  it('sets the title, canonical URL, og:url and robots for each page', () => {
    renderRoute('/about');

    expect(document.title).toBe('About Us | Hilltop Developments');
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.thehilltopdevelopments.com/about',
    );
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://www.thehilltopdevelopments.com/about',
    );
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
  });

  it('uses the brand title on the homepage', () => {
    renderRoute('/');
    expect(document.title).toBe('Hilltop Developments — Building Sustainable Cities');
  });

  it('gives the 404 page the same canonical URL as 404.html at any unknown address', () => {
    renderRoute('/no-such-page');
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.thehilltopdevelopments.com/404',
    );
  });

  it('drops a trailing slash from the canonical URL', () => {
    renderRoute('/about/');
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.thehilltopdevelopments.com/about',
    );
  });
});

describe('robustness', () => {
  it('survives a malformed URL hash instead of blanking the page', async () => {
    renderRoute('/about#%E0%A4%A');
    // The hash is decoded on the next animation frame; let it run.
    await new Promise((resolve) => window.requestAnimationFrame(resolve));
    expect(screen.getByRole('heading', { level: 1, name: 'Who We Are' })).toBeInTheDocument();
  });
});

describe('developments filter', () => {
  const cardTitles = () => screen.getAllByRole('article').map((card) => within(card).getByRole('heading').textContent);

  it('shows every development by default and narrows by category', async () => {
    const user = userEvent.setup();
    renderRoute('/developments');

    expect(cardTitles()).toHaveLength(DEVELOPMENTS.length);
    expect(screen.getByRole('button', { name: /^All/ })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: /^Infrastructure/ }));
    expect(cardTitles()).toEqual(['Infrastructure Developments']);
    expect(screen.getByRole('button', { name: /^Infrastructure/ })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByRole('button', { name: /^Land/ })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^All/ }));
    expect(cardTitles()).toHaveLength(DEVELOPMENTS.length);
  });

  it('reads the category from the URL', () => {
    renderRoute('/developments?category=residential');
    expect(cardTitles()).toHaveLength(5);
  });

  it('falls back to all developments for an unknown category', () => {
    renderRoute('/developments?category=castles');
    expect(cardTitles()).toHaveLength(DEVELOPMENTS.length);
    expect(screen.getByRole('button', { name: /^All/ })).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('insights page', () => {
  it('shows the client copy with a button to a real destination on each card', () => {
    renderRoute('/insights');

    expect(
      screen.getByText(
        'Stay informed about Hilltop Developments, our projects, company activities and perspectives on the real estate industry.',
      ),
    ).toBeInTheDocument();
    const buttons = [
      ['News & Updates', 'View All News', '/contact?type=news#enquiry'],
      ['Articles', 'Explore Articles', '/contact?type=articles#enquiry'],
      ['Careers at Hilltop', 'Explore Career Opportunities', '/contact?type=careers#enquiry'],
    ];
    buttons.forEach(([title, label, href]) => {
      const card = screen.getByRole('heading', { level: 2, name: title }).closest('article');
      expect(within(card).getByRole('link', { name: label })).toHaveAttribute('href', href);
    });
  });

  it('pre-selects the news and articles enquiry types on the contact page', () => {
    const { unmount } = renderRoute('/contact?type=news');
    expect(screen.getByLabelText('Enquiry about')).toHaveValue('news');
    unmount();
    renderRoute('/contact?type=articles');
    expect(screen.getByLabelText('Enquiry about')).toHaveValue('articles');
  });
});

describe('own a piece page', () => {
  it('offers land buying only', () => {
    renderRoute('/own-a-piece');

    expect(screen.getByRole('link', { name: /enquire about land/i })).toHaveAttribute(
      'href',
      '/contact?type=ownership&opportunity=land',
    );
    ['Estate Opportunities', 'Property Opportunities', 'Investment Opportunities'].forEach((title) =>
      expect(screen.queryByText(title)).not.toBeInTheDocument(),
    );
  });
});

describe('contact page', () => {
  it('pre-selects the enquiry type from the link that brought the visitor', () => {
    renderRoute('/contact?type=partnership');
    expect(screen.getByLabelText('Enquiry about')).toHaveValue('partnership');
  });

  it('pre-selects the development for "register interest" links', () => {
    renderRoute('/contact?type=development&development=splurge');
    expect(screen.getByLabelText(/which development/i)).toHaveValue('splurge');
  });

  it('scrolls to the FAQ when the URL has #faqs', async () => {
    renderRoute('/contact#faqs');
    expect(screen.getByRole('heading', { level: 2, name: 'Frequently Asked Questions' })).toBeInTheDocument();
    await waitFor(() => expect(Element.prototype.scrollIntoView).toHaveBeenCalled());
  });
});

describe('navigation', () => {
  it('moves between pages from the header and scrolls to the top', async () => {
    const user = userEvent.setup();
    renderRoute('/');

    const mainNav = screen.getByRole('navigation', { name: 'Main' });
    await user.click(within(mainNav).getByRole('link', { name: 'Services' }));

    expect(
      screen.getByRole('heading', { level: 1, name: 'Expertise That Moves Developments Forward.' }),
    ).toBeInTheDocument();
    expect(window.scrollTo).toHaveBeenCalled();
    expect(document.activeElement).toBe(screen.getByRole('main'));
  });

  it('updates the title, canonical URL and robots when navigating in the app', async () => {
    const user = userEvent.setup();
    renderRoute('/about');

    await user.click(within(screen.getByRole('navigation', { name: 'Main' })).getByRole('link', { name: 'Services' }));

    expect(document.title).toBe('Our Services | Hilltop Developments');
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.thehilltopdevelopments.com/services',
    );
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://www.thehilltopdevelopments.com/services',
    );
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
  });

  it('starts each development page afresh when moving between developments', async () => {
    const user = userEvent.setup();
    const [first, second] = DEVELOPMENTS;
    renderRoute(`/developments/${first.slug}`);
    const firstHeading = screen.getByRole('heading', { level: 1, name: first.name });

    await user.click(screen.getByRole('link', { name: second.name }));

    // A new element, not the old one with new text: the page remounted, so no state carries over.
    expect(screen.getByRole('heading', { level: 1, name: second.name })).not.toBe(firstHeading);
  });

  it('marks the current section in the header, but no section on the 404 page', () => {
    const currentInMainNav = () =>
      within(screen.getByRole('navigation', { name: 'Main' }))
        .queryAllByRole('link')
        .filter((link) => link.getAttribute('aria-current') === 'page')
        .map((link) => link.textContent);

    const { unmount } = renderRoute('/developments/splurge');
    expect(currentInMainNav()).toEqual(['Developments']);
    unmount();

    renderRoute('/developments/no-such-development');
    expect(currentInMainNav()).toEqual([]);
  });

  it('does not move focus on the first page load', () => {
    renderRoute('/services');
    expect(document.activeElement).toBe(document.body);
  });

  it('closes the mobile menu when the current page is chosen again', async () => {
    const user = userEvent.setup();
    renderRoute('/about');

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    const mobileNav = screen.getByRole('navigation', { name: 'Mobile' });
    await user.click(within(mobileNav).getByRole('link', { name: 'About' }));

    await waitFor(() => expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument());
  });

  it('hides an open header dropdown on Escape', async () => {
    const user = userEvent.setup();
    renderRoute('/');
    const mainNav = screen.getByRole('navigation', { name: 'Main' });
    const aboutLink = within(mainNav).getByRole('link', { name: 'About' });
    const dropdown = within(mainNav).getByRole('link', { name: 'Company Overview' }).closest('div');

    aboutLink.focus();
    await user.keyboard('{Escape}');

    expect(dropdown.className).toContain('!invisible');
    expect(aboutLink).toHaveFocus();
  });

  it('opens and closes the mobile menu, and closes it after navigating', async () => {
    const user = userEvent.setup();
    renderRoute('/');

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('navigation', { name: 'Mobile' })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe('');

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    const mobileNav = screen.getByRole('navigation', { name: 'Mobile' });
    await user.click(within(mobileNav).getByRole('link', { name: 'Own a Piece' }));

    expect(screen.getByRole('heading', { level: 1, name: 'Own a Piece of the Earth.' })).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument());
  });
});
