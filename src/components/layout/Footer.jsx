import { Link } from 'react-router-dom';
import { CONTACT, FOOTER_GROUPS, SITE } from '../../data/site';
import { buildQuickWhatsAppLink } from '../../lib/enquiry';
import Wordmark from './Wordmark';

// On navy (#14265F): white is about 14:1, white/80 about 9:1 and white/75 about 8:1, all above the 4.5:1 AA minimum.
const LINK = 'focus-ring-light rounded-sm text-[15px] text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline';
const GROUP_TITLE = 'font-display text-eyebrow uppercase text-white';
const WHATSAPP_GREETING = 'Hello Hilltop Developments, I have an enquiry.';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 bg-navy text-white lg:mt-16">
      <div className="mx-auto max-w-content px-5 pb-10 pt-16 sm:px-8 lg:px-12 lg:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div className="flex flex-col gap-4">
            <Wordmark tone="light" />
            <p className="max-w-xs text-[15px] leading-relaxed text-white/80">
              {SITE.tagline}.
            </p>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className={GROUP_TITLE}>{group.title}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={LINK}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className={GROUP_TITLE}>Contact</h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a href={`mailto:${CONTACT.email}`} className={LINK}>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} className={LINK}>
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={buildQuickWhatsAppLink(WHATSAPP_GREETING)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <address className="text-[15px] not-italic leading-relaxed text-white/80">
                  {CONTACT.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/20 pt-6 text-sm text-white/80 sm:flex-row sm:justify-between">
          <p>
            {/* The year is baked in at build time; suppress the one-off mismatch if a visit crosses New Year before the next deploy. */}
            © <span suppressHydrationWarning>{year}</span> {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
