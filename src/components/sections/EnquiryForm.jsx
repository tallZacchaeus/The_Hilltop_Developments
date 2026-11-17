import { useState } from 'react';
import { CheckCircle2, MessageCircle, Send } from 'lucide-react';
import { DEVELOPMENTS } from '../../data/developments';
import { OPPORTUNITIES } from '../../data/content';
import { CONTACT } from '../../data/site';
import { ENQUIRY_TYPES, LIMITS, buildMailto, buildWhatsAppLink, validateEnquiry } from '../../lib/enquiry';
import Button from '../ui/Button';
import Card from '../ui/Card';

const INPUT =
  'focus-ring w-full rounded-btn border border-line bg-sky-50 px-4 py-3 text-[15px] text-navy placeholder:text-navy/40 transition-colors focus:bg-white aria-[invalid=true]:border-red-600';

const FIELD_ORDER = ['name', 'email', 'phone', 'type', 'message'];

const openEmailApp = (url) => window.location.assign(url);
const openWhatsAppTab = (url) => window.open(url, '_blank', 'noopener,noreferrer');

const inputId = (name) => `enquiry-${name}`;

const a11yProps = (name, errors) => ({
  id: inputId(name),
  name,
  'aria-invalid': errors[name] ? true : undefined,
  'aria-describedby': errors[name] ? `${inputId(name)}-error` : undefined,
});

function Field({ name, label, error, isOptional = false, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId(name)} className="font-display text-sm">
        {label}
        {isOptional && <span className="text-navy/70"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${inputId(name)}-error`} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function SentMessage({ channel }) {
  const text =
    channel === 'whatsapp'
      ? 'WhatsApp has opened in a new tab with your message ready to send.'
      : `Your email app should now open with your enquiry ready to send. If nothing happened, email us at ${CONTACT.email}.`;

  return (
    <p className="flex items-start gap-3 rounded-btn bg-sky-100 px-4 py-3 text-[15px]">
      <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-navy" />
      <span>{text}</span>
    </p>
  );
}

/**
 * Validated enquiry form. No server yet: "Send by email" opens a pre-filled email,
 * "Send on WhatsApp" opens a pre-filled chat. Opening functions are injectable for tests.
 * @param {{
 *   initialValues: import('../../lib/enquiry').Enquiry,
 *   onOpenEmail?: (url: string) => void,
 *   onOpenWhatsApp?: (url: string) => void
 * }} props
 */
export default function EnquiryForm({ initialValues, onOpenEmail = openEmailApp, onOpenWhatsApp = openWhatsAppTab }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [sentVia, setSentVia] = useState(null);
  const opportunity =
    values.type === 'ownership' ? OPPORTUNITIES.find((item) => item.id === values.opportunity) : undefined;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const { [name]: _cleared, ...rest } = current;
      return rest;
    });
  };

  const send = (channel) => {
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setSentVia(null);
      document.getElementById(inputId(firstInvalid))?.focus();
      return;
    }

    if (channel === 'whatsapp') {
      onOpenWhatsApp(buildWhatsAppLink(values));
    } else {
      onOpenEmail(buildMailto(values));
    }
    setSentVia(channel);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    send('email');
  };

  return (
    <Card
      as="form"
      id="enquiry"
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="enquiry-title"
      className="flex flex-col gap-5 p-6 sm:p-8"
    >
      <div>
        <h2 id="enquiry-title" className="text-h3">
          Send us an enquiry
        </h2>
        <p className="mt-2 text-[15px] text-navy/65">Choose email or WhatsApp — your message is prepared for you to send.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Full name" error={errors.name}>
          <input
            type="text"
            autoComplete="name"
            maxLength={LIMITS.nameMax}
            className={INPUT}
            value={values.name}
            onChange={handleChange}
            {...a11yProps('name', errors)}
          />
        </Field>
        <Field name="email" label="Email address" error={errors.email}>
          <input
            type="email"
            autoComplete="email"
            className={INPUT}
            value={values.email}
            onChange={handleChange}
            {...a11yProps('email', errors)}
          />
        </Field>
        <Field name="phone" label="Phone number" isOptional error={errors.phone}>
          <input
            type="tel"
            autoComplete="tel"
            maxLength={LIMITS.phoneMax}
            className={INPUT}
            value={values.phone}
            onChange={handleChange}
            {...a11yProps('phone', errors)}
          />
        </Field>
        <Field name="type" label="Enquiry about" error={errors.type}>
          <select className={INPUT} value={values.type} onChange={handleChange} {...a11yProps('type', errors)}>
            {ENQUIRY_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {values.type === 'development' && (
        <Field name="development" label="Which development?" isOptional>
          <select className={INPUT} value={values.development} onChange={handleChange} {...a11yProps('development', errors)}>
            <option value="">Not sure yet</option>
            {DEVELOPMENTS.map((development) => (
              <option key={development.slug} value={development.slug}>
                {development.name}
              </option>
            ))}
          </select>
        </Field>
      )}

      {opportunity && (
        <p className="rounded-btn bg-sky-100 px-4 py-3 text-[15px]">
          Opportunity: <span className="font-display">{opportunity.title}</span>
        </p>
      )}

      <Field name="message" label="Message" error={errors.message}>
        <textarea
          rows={5}
          maxLength={LIMITS.messageMax}
          className={`${INPUT} resize-y`}
          value={values.message}
          onChange={handleChange}
          {...a11yProps('message', errors)}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" variant="dark" icon={Send}>
          Send by email
        </Button>
        <Button variant="light" icon={MessageCircle} onClick={() => send('whatsapp')}>
          Send on WhatsApp
        </Button>
      </div>

      <div role="status" aria-live="polite">
        {sentVia && <SentMessage channel={sentVia} />}
      </div>
    </Card>
  );
}
