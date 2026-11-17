import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from './Accordion';

const ITEMS = [
  { question: 'Can I inspect a property?', answer: 'Yes, contact our team.' },
  { question: 'Can I pay in instalments?', answer: 'It depends on the development.' },
];

describe('Accordion', () => {
  it('opens the first item by default and links each button to its panel', () => {
    render(<Accordion items={ITEMS} />);

    expect(screen.getByRole('button', { name: ITEMS[0].question })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region', { name: ITEMS[0].question })).toHaveTextContent(ITEMS[0].answer);
    expect(screen.getByRole('button', { name: ITEMS[1].question })).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps one item open at a time and can close the open item', async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} />);
    const first = screen.getByRole('button', { name: ITEMS[0].question });
    const second = screen.getByRole('button', { name: ITEMS[1].question });

    await user.click(second);
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText(ITEMS[1].answer)).toBeInTheDocument();

    await user.click(second);
    expect(second).toHaveAttribute('aria-expanded', 'false');
  });

  it('can start with everything closed', () => {
    render(<Accordion items={ITEMS} defaultOpen={-1} />);
    screen.getAllByRole('button').forEach((button) => expect(button).toHaveAttribute('aria-expanded', 'false'));
  });
});
