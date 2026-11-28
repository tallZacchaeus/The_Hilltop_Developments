import { CONTACT } from '../data/site.js';
import { DEVELOPMENTS } from '../data/developments.js';
import { OPPORTUNITIES } from '../data/content.js';

export const ENQUIRY_TYPES = Object.freeze([
  { value: 'general', label: 'General enquiry' },
  { value: 'development', label: 'A development' },
  { value: 'ownership', label: 'Own a Piece (land)' },
  { value: 'services', label: 'Our services' },
  { value: 'partnership', label: 'Partnership proposal' },
  { value: 'careers', label: 'Careers at Hilltop' },
  { value: 'news', label: 'News & updates' },
  { value: 'articles', label: 'Articles' },
]);

export const LIMITS = Object.freeze({
  nameMin: 2,
  nameMax: 80,
  messageMin: 10,
  messageMax: 2000,
  // E.164 allows up to 15 digits; the character cap leaves room for spaces, brackets and dashes.
  phoneMinDigits: 7,
  phoneMaxDigits: 15,
  phoneMax: 25,
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[0-9+()\-\s]+$/;

const isKnown = (list, key, value) => list.some((item) => item[key] === value);

/**
 * @typedef {object} Enquiry
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} type         One of ENQUIRY_TYPES[].value
 * @property {string} development  A development slug or ''
 * @property {string} opportunity  An opportunity id or ''
 * @property {string} message
 */

/** @type {Readonly<Enquiry>} */
export const EMPTY_ENQUIRY = Object.freeze({
  name: '',
  email: '',
  phone: '',
  type: 'general',
  development: '',
  opportunity: '',
  message: '',
});

/**
 * Turns `?type=…&development=…&opportunity=…` into safe initial form values.
 * Unknown values are ignored.
 * @param {URLSearchParams} searchParams
 * @returns {Enquiry}
 */
export function enquiryFromParams(searchParams) {
  const type = searchParams.get('type');
  const development = searchParams.get('development');
  const opportunity = searchParams.get('opportunity');

  return {
    ...EMPTY_ENQUIRY,
    type: isKnown(ENQUIRY_TYPES, 'value', type) ? type : EMPTY_ENQUIRY.type,
    development: isKnown(DEVELOPMENTS, 'slug', development) ? development : '',
    opportunity: isKnown(OPPORTUNITIES, 'id', opportunity) ? opportunity : '',
  };
}

function validateName(name) {
  const length = name.trim().length;
  if (length === 0) return 'Please enter your name.';
  if (length < LIMITS.nameMin || length > LIMITS.nameMax) {
    return `Name should be ${LIMITS.nameMin}–${LIMITS.nameMax} characters.`;
  }
  return null;
}

function validateEmail(email) {
  if (email.trim().length === 0) return 'Please enter your email address.';
  return EMAIL_PATTERN.test(email.trim()) ? null : 'Please enter a valid email address.';
}

function validatePhone(phone) {
  const value = phone.trim();
  if (value.length === 0) return null;
  const digits = value.replace(/\D/g, '').length;
  const isValid =
    PHONE_PATTERN.test(value) &&
    digits >= LIMITS.phoneMinDigits &&
    digits <= LIMITS.phoneMaxDigits &&
    value.length <= LIMITS.phoneMax;
  return isValid ? null : 'Please enter a valid phone number.';
}

function validateMessage(message) {
  const length = message.trim().length;
  if (length === 0) return 'Please tell us how we can help.';
  if (length < LIMITS.messageMin) return `Please write at least ${LIMITS.messageMin} characters.`;
  if (length > LIMITS.messageMax) return `Please keep your message under ${LIMITS.messageMax} characters.`;
  return null;
}

/**
 * @param {Partial<Enquiry>} values
 * @returns {Record<string, string>} field → error message; empty when valid
 */
export function validateEnquiry(values) {
  const checks = {
    name: validateName(values.name ?? ''),
    email: validateEmail(values.email ?? ''),
    phone: validatePhone(values.phone ?? ''),
    type: isKnown(ENQUIRY_TYPES, 'value', values.type) ? null : 'Please choose an enquiry type.',
    message: validateMessage(values.message ?? ''),
  };
  return Object.fromEntries(Object.entries(checks).filter(([, error]) => error !== null));
}

// A development only counts for development enquiries, and an opportunity only for ownership
// enquiries — otherwise switching the type would leave a stale topic in the message.
function topicLabel(values) {
  const typeLabel = ENQUIRY_TYPES.find((item) => item.value === values.type)?.label ?? 'Enquiry';
  const development =
    values.type === 'development' ? DEVELOPMENTS.find((item) => item.slug === values.development) : undefined;
  const opportunity =
    values.type === 'ownership' ? OPPORTUNITIES.find((item) => item.id === values.opportunity) : undefined;
  const topic = development?.name ?? opportunity?.title;
  return topic ? `${typeLabel}: ${topic}` : typeLabel;
}

function messageLines(values) {
  const phone = values.phone.trim();
  return [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    ...(phone ? [`Phone: ${phone}`] : []),
    `Enquiry: ${topicLabel(values)}`,
    '',
    values.message.trim(),
  ];
}

/** @param {Enquiry} values @returns {string} */
export function buildEnquirySubject(values) {
  return `Website enquiry — ${topicLabel(values)} — ${values.name.trim()}`;
}

/** @param {Enquiry} values @returns {string} a mailto: URL (body uses CRLF line breaks, per RFC 6068) */
export function buildMailto(values) {
  const subject = encodeURIComponent(buildEnquirySubject(values));
  const body = encodeURIComponent(messageLines(values).join('\r\n'));
  return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
}

/** @param {Enquiry} values @returns {string} a wa.me URL */
export function buildWhatsAppLink(values) {
  const text = ['Hello Hilltop Developments,', '', ...messageLines(values)].join('\n');
  return buildQuickWhatsAppLink(text);
}

/** @param {string} message @returns {string} a wa.me URL with the message pre-filled */
export function buildQuickWhatsAppLink(message) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
