import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PeopleSection from './PeopleSection';

const BASE_PROPS = {
  id: 'team',
  eyebrow: 'Our Team',
  title: 'The People Behind the Vision.',
  intro: ['Behind every development is a team of people.'],
  groupLabel: 'team',
};

describe('PeopleSection', () => {
  it('shows a "coming soon" card while there are no profiles', () => {
    render(<PeopleSection {...BASE_PROPS} people={[]} />);

    expect(screen.getByRole('heading', { level: 2, name: BASE_PROPS.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Profiles coming soon' })).toBeInTheDocument();
    expect(screen.getByText(/introductions to our team/i)).toBeInTheDocument();
  });

  it('renders a card for each person once profiles are added', () => {
    const people = [
      { name: 'Ngozi Adeyemi', title: 'Chair', bio: 'Thirty years in urban planning.', photo: '/images/a.jpg' },
      { name: 'Tunde Bello', title: 'Advisor', bio: 'Investment strategy.', photo: '/images/b.jpg', photoAlt: 'Tunde smiling' },
    ];
    render(<PeopleSection {...BASE_PROPS} people={people} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'Ngozi Adeyemi' })).toBeInTheDocument();
    expect(screen.getByAltText('Portrait of Ngozi Adeyemi')).toBeInTheDocument();
    expect(screen.getByAltText('Tunde smiling')).toBeInTheDocument();
    expect(screen.queryByText('Profiles coming soon')).not.toBeInTheDocument();
  });
});
