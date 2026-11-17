import { describe, expect, it } from 'vitest';
import {
  EMPTY_ENQUIRY,
  LIMITS,
  buildEnquirySubject,
  buildMailto,
  buildQuickWhatsAppLink,
  buildWhatsAppLink,
  enquiryFromParams,
  validateEnquiry,
} from './enquiry';

const VALID = Object.freeze({
  ...EMPTY_ENQUIRY,
  name: 'Ada Obi',
  email: 'ada@example.com',
  message: 'I would like details on pricing and inspection.',
});

const paramsOf = (url) => new URLSearchParams(url.slice(url.indexOf('?') + 1));

describe('validateEnquiry', () => {
  it('returns no errors for a complete enquiry', () => {
    expect(validateEnquiry(VALID)).toEqual({});
  });

  it('requires name, email and message', () => {
    expect(Object.keys(validateEnquiry(EMPTY_ENQUIRY)).sort()).toEqual(['email', 'message', 'name']);
  });

  it('treats missing fields as empty, including the enquiry type', () => {
    expect(Object.keys(validateEnquiry({})).sort()).toEqual(['email', 'message', 'name', 'type']);
  });

  it('rejects a malformed email address', () => {
    expect(validateEnquiry({ ...VALID, email: 'ada@example' }).email).toBe('Please enter a valid email address.');
  });

  it('rejects names that are too short or too long', () => {
    expect(validateEnquiry({ ...VALID, name: 'A' }).name).toMatch(/2–80 characters/);
    expect(validateEnquiry({ ...VALID, name: 'x'.repeat(LIMITS.nameMax + 1) }).name).toMatch(/2–80 characters/);
  });

  it('allows an empty phone number and accepts international formats', () => {
    expect(validateEnquiry({ ...VALID, phone: '' }).phone).toBeUndefined();
    expect(validateEnquiry({ ...VALID, phone: '+234 (0) 913 908 3794' }).phone).toBeUndefined();
  });

  it('rejects phone numbers with letters, too few digits or too many digits', () => {
    expect(validateEnquiry({ ...VALID, phone: '0803-CALL-ME' }).phone).toBe('Please enter a valid phone number.');
    expect(validateEnquiry({ ...VALID, phone: '12 34' }).phone).toBe('Please enter a valid phone number.');
    expect(validateEnquiry({ ...VALID, phone: '1234567890123456' }).phone).toBe('Please enter a valid phone number.');
  });

  it('rejects messages that are too short or too long', () => {
    expect(validateEnquiry({ ...VALID, message: 'Hi' }).message).toMatch(/at least 10/);
    expect(validateEnquiry({ ...VALID, message: 'x'.repeat(LIMITS.messageMax + 1) }).message).toMatch(/under 2000/);
  });

  it('rejects an unknown enquiry type', () => {
    expect(validateEnquiry({ ...VALID, type: 'spam' }).type).toBe('Please choose an enquiry type.');
  });
});

describe('enquiryFromParams', () => {
  it('pre-selects a known type, development and opportunity', () => {
    const params = new URLSearchParams('type=development&development=goshen&opportunity=land');
    expect(enquiryFromParams(params)).toMatchObject({ type: 'development', development: 'goshen', opportunity: 'land' });
  });

  it('ignores unknown values and falls back to a general enquiry', () => {
    const params = new URLSearchParams('type=hack&development=nowhere&opportunity=moon');
    expect(enquiryFromParams(params)).toEqual(EMPTY_ENQUIRY);
  });

  it('returns an empty general enquiry when there are no params', () => {
    expect(enquiryFromParams(new URLSearchParams())).toEqual(EMPTY_ENQUIRY);
  });
});

describe('buildMailto', () => {
  it('addresses the Hilltop inbox with an encoded subject naming the development', () => {
    const url = buildMailto({ ...VALID, type: 'development', development: 'goshen' });

    expect(url.startsWith('mailto:info@hilltopdevelopments.com?subject=')).toBe(true);
    expect(paramsOf(url).get('subject')).toBe('Website enquiry — A development: Goshen by Hilltop — Ada Obi');
  });

  it('includes the phone line only when a phone number is given', () => {
    const withPhone = paramsOf(buildMailto({ ...VALID, phone: '+234 800 000 0000' })).get('body');
    const withoutPhone = paramsOf(buildMailto(VALID)).get('body');

    expect(withPhone).toContain('Phone: +234 800 000 0000');
    expect(withoutPhone).not.toContain('Phone:');
  });

  it('trims whitespace from every field and uses CRLF line breaks', () => {
    const body = paramsOf(buildMailto({ ...VALID, name: '  Ada Obi  ', message: '  Hello there, team.  ' })).get('body');
    expect(body).toContain('Name: Ada Obi\r\n');
    expect(body.endsWith('Hello there, team.')).toBe(true);
  });
});

describe('stale topics', () => {
  it('ignores a development once the type is no longer "development"', () => {
    const values = { ...VALID, type: 'general', development: 'crib' };
    expect(buildEnquirySubject(values)).toBe('Website enquiry — General enquiry — Ada Obi');
    expect(paramsOf(buildMailto(values)).get('body')).not.toContain('Crib');
  });

  it('ignores an opportunity once the type is no longer "ownership"', () => {
    expect(buildEnquirySubject({ ...VALID, type: 'services', opportunity: 'land' })).toBe(
      'Website enquiry — Our services — Ada Obi',
    );
  });
});

describe('buildEnquirySubject', () => {
  it('uses the opportunity title for ownership enquiries', () => {
    expect(buildEnquirySubject({ ...VALID, type: 'ownership', opportunity: 'land' })).toBe(
      'Website enquiry — Own a Piece (land & property): Land Opportunities — Ada Obi',
    );
  });

  it('uses just the type label when no topic is chosen', () => {
    expect(buildEnquirySubject({ ...VALID, type: 'careers' })).toBe('Website enquiry — Careers at Hilltop — Ada Obi');
  });
});

describe('WhatsApp links', () => {
  it('builds a wa.me link with a greeting and the enquiry details', () => {
    const url = buildWhatsAppLink(VALID);
    const text = new URL(url).searchParams.get('text');

    expect(url).toMatch(/^https:\/\/wa\.me\/2349139083794\?text=/);
    expect(text.startsWith('Hello Hilltop Developments,')).toBe(true);
    expect(text).toContain('Name: Ada Obi');
  });

  it('encodes a quick message', () => {
    expect(buildQuickWhatsAppLink('Hi & welcome')).toBe('https://wa.me/2349139083794?text=Hi%20%26%20welcome');
  });
});
