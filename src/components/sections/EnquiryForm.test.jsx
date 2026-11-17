import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EMPTY_ENQUIRY } from '../../lib/enquiry';
import EnquiryForm from './EnquiryForm';

function renderForm(values = {}, props = {}) {
  const handlers = { onOpenEmail: vi.fn(), onOpenWhatsApp: vi.fn(), ...props };
  render(<EnquiryForm initialValues={{ ...EMPTY_ENQUIRY, ...values }} {...handlers} />);
  return handlers;
}

async function fillValidEnquiry(user) {
  await user.type(screen.getByLabelText('Full name'), 'Ada Obi');
  await user.type(screen.getByLabelText('Email address'), 'ada@example.com');
  await user.type(screen.getByLabelText('Message'), 'Please share pricing for Goshen.');
}

describe('EnquiryForm', () => {
  it('shows field errors and focuses the first invalid field when submitted empty', async () => {
    const user = userEvent.setup();
    const { onOpenEmail } = renderForm();

    await user.click(screen.getByRole('button', { name: /send by email/i }));

    expect(screen.getByText('Please enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your email address.')).toBeInTheDocument();
    expect(screen.getByText('Please tell us how we can help.')).toBeInTheDocument();
    expect(screen.getByLabelText('Full name')).toHaveFocus();
    expect(screen.getByLabelText('Full name')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Full name')).toHaveAccessibleDescription('Please enter your name.');
    expect(onOpenEmail).not.toHaveBeenCalled();
  });

  it('clears a field error as soon as that field is edited', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole('button', { name: /send by email/i }));
    await user.type(screen.getByLabelText('Full name'), 'A');

    expect(screen.queryByText('Please enter your name.')).not.toBeInTheDocument();
    expect(screen.getByText('Please enter your email address.')).toBeInTheDocument();
  });

  it('opens a pre-filled email and confirms when the enquiry is valid', async () => {
    const user = userEvent.setup();
    const { onOpenEmail, onOpenWhatsApp } = renderForm();

    await fillValidEnquiry(user);
    await user.click(screen.getByRole('button', { name: /send by email/i }));

    expect(onOpenEmail).toHaveBeenCalledWith(expect.stringMatching(/^mailto:info@hilltopdevelopments\.com\?subject=/));
    expect(onOpenWhatsApp).not.toHaveBeenCalled();
    expect(screen.getByRole('status')).toHaveTextContent(/email app should now open/i);
  });

  it('opens WhatsApp with the message when chosen', async () => {
    const user = userEvent.setup();
    const { onOpenEmail, onOpenWhatsApp } = renderForm();

    await fillValidEnquiry(user);
    await user.click(screen.getByRole('button', { name: /send on whatsapp/i }));

    expect(onOpenWhatsApp).toHaveBeenCalledWith(expect.stringMatching(/^https:\/\/wa\.me\/2349139083794\?text=/));
    expect(onOpenEmail).not.toHaveBeenCalled();
    expect(screen.getByRole('status')).toHaveTextContent(/whatsapp has opened/i);
  });

  it('does not open WhatsApp for an invalid enquiry', async () => {
    const user = userEvent.setup();
    const { onOpenWhatsApp } = renderForm({ name: 'Ada Obi' });

    await user.click(screen.getByRole('button', { name: /send on whatsapp/i }));

    expect(onOpenWhatsApp).not.toHaveBeenCalled();
    expect(screen.getByLabelText('Email address')).toHaveFocus();
  });

  it('asks which development only for development enquiries', async () => {
    const user = userEvent.setup();
    renderForm();

    expect(screen.queryByLabelText(/which development/i)).not.toBeInTheDocument();
    await user.selectOptions(screen.getByLabelText('Enquiry about'), 'development');
    await user.selectOptions(screen.getByLabelText(/which development/i), 'the-yard');

    expect(screen.getByLabelText(/which development/i)).toHaveValue('the-yard');
  });

  it('shows the ownership opportunity the visitor came from, and hides it if the type changes', async () => {
    const user = userEvent.setup();
    renderForm({ type: 'ownership', opportunity: 'estate' });
    expect(screen.getByText('Estate Opportunities')).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText('Enquiry about'), 'general');
    expect(screen.queryByText('Estate Opportunities')).not.toBeInTheDocument();
  });
});
