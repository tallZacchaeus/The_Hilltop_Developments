import { Mail } from 'lucide-react';
import { CONTACT } from '../data/site';
import { LEGAL_PAGES } from '../data/legal';
import Button from '../components/ui/Button';
import PageHero from '../components/sections/PageHero';

/** @param {{ kind: 'privacy' | 'terms' }} props */
export default function LegalPage({ kind }) {
  const { title, lead } = LEGAL_PAGES[kind];

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
