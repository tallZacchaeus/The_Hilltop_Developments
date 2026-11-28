import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import PartnersSection from './PartnersSection';
import { PARTNERS } from '../../data/partners';
import { renderRoute } from '../../test/renderRoute';

const SAMPLE = [
  { name: 'Acme Build', logo: '/images/partners/acme.png', width: 300, height: 120 },
  { name: 'Text Only Co', logo: null },
];

describe('PartnersSection', () => {
  it('shows a logo image with alt text for partners that have one', () => {
    render(<PartnersSection id="partners" partners={SAMPLE} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Partners in Success' })).toBeInTheDocument();
    const image = screen.getByAltText('Acme Build');
    expect(image).toHaveAttribute('src', '/images/partners/acme.png');
    expect(image).toHaveAttribute('width', '300');
  });

  it('shows a text wordmark for partners without a logo yet', () => {
    render(<PartnersSection id="partners" partners={SAMPLE} />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(within(items[1]).getByText('Text Only Co')).toBeInTheDocument();
    expect(within(items[1]).queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders nothing when there are no partners', () => {
    const { container } = render(<PartnersSection id="partners" partners={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('partners on the site', () => {
  const NAMES = ['1987 Projects & Procurement', 'Premium Cast', 'The Facility', '2nd Haven', 'Space R'];

  it('lists the five client-supplied partners', () => {
    expect(PARTNERS.map((partner) => partner.name)).toEqual(NAMES);
  });

  it.each(['/about', '/services'])('%s shows Partners in Success', (path) => {
    renderRoute(path);
    const section = document.getElementById('partners');
    expect(section).not.toBeNull();
    NAMES.forEach((name) =>
      expect(within(section).queryByAltText(name) ?? within(section).queryByText(name)).not.toBeNull(),
    );
  });

  it('places the partners directly after Our Team on the About page', () => {
    renderRoute('/about');
    expect(document.getElementById('team').nextElementSibling).toBe(document.getElementById('partners'));
  });
});
