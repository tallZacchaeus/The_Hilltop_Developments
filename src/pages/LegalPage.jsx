import { Mail } from 'lucide-react';
import { CONTACT } from '../data/site';
import usePageMeta from '../hooks/usePageMeta';
import Button from '../components/ui/Button';
import PageHero from '../components/sections/PageHero';

// Placeholder until Hilltop supplies the legal text (tracked in docs/01-PRD.md §7).
const PAGES = {
  privacy: {
    title: 'Privacy Policy',
    lead: 'Our privacy policy is being finalised and will be published here soon. If you have a question about how we handle your information, please email us.',
  },
  terms: {
    title: 'Terms & Conditions',
    lead: 'Our terms and conditions are being finalised and will be published here soon. If you have a question in the meantime, please email us.',
  },
};

/** @param {{ kind: 'privacy' | 'terms' }} props */
export default function LegalPage({ kind }) {
  const { title, lead } = PAGES[kind];
  usePageMeta({ title, description: lead });

  return (
    <PageHero
      eyebrow="Legal"
      title={title}
      lead={lead}
      actions={
        <Button href={`mailto:${CONTACT.email}`} variant="dark" icon={Mail}>
          {CONTACT.email}
        </Button>
      }
    />
  );
}
