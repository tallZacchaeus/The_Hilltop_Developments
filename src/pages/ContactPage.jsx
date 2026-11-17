import { useSearchParams } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CONTACT } from '../data/site';
import { buildQuickWhatsAppLink, enquiryFromParams } from '../lib/enquiry';
import usePageMeta from '../hooks/usePageMeta';
import Card from '../components/ui/Card';
import Panel from '../components/ui/Panel';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import EnquiryForm from '../components/sections/EnquiryForm';
import FaqSection from '../components/sections/FaqSection';

const CONTACT_ITEMS = [
  { icon: MapPin, label: 'Office address', lines: CONTACT.addressLines },
  { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Phone, label: 'Phone', value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with our team',
    href: buildQuickWhatsAppLink('Hello Hilltop Developments, I have an enquiry.'),
    isExternal: true,
  },
];

function ContactItem({ item }) {
  const Icon = item.icon;
  const externalProps = item.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Card className="flex items-start gap-4 p-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sky-100">
        <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-navy/70">{item.label}</p>
        {item.href ? (
          <a href={item.href} className="focus-ring break-words rounded-sm font-display text-lg" {...externalProps}>
            {item.value}
            {item.isExternal && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
        ) : (
          <address className="font-display text-lg not-italic">
            {item.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        )}
      </div>
    </Card>
  );
}

export default function ContactPage() {
  usePageMeta({
    title: 'Contact Us',
    description:
      "Get in touch with Hilltop Developments about our developments, services or a partnership. We'd be happy to hear from you.",
  });

  const [searchParams] = useSearchParams();
  const initialValues = enquiryFromParams(searchParams);

  return (
    <>
      <Panel aria-labelledby="page-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal className="flex flex-col gap-10">
            <SectionHeading
              as="h1"
              id="page-title"
              align="left"
              eyebrow="Contact us"
              title="Get in Touch with Hilltop"
              lead="Whether you have an enquiry about our developments, are interested in our services or would like to explore a potential partnership, we'd be happy to hear from you."
            />
            <ul className="flex flex-col gap-4">
              {CONTACT_ITEMS.map((item) => (
                <li key={item.label}>
                  <ContactItem item={item} />
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            {/* key: a new ?type=… link resets the form to its pre-selected values */}
            <EnquiryForm key={searchParams.toString()} initialValues={initialValues} />
          </Reveal>
        </div>
      </Panel>
      <FaqSection />
    </>
  );
}
