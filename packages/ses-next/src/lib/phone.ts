const australianCountryCode = '+61';

/**
 * Builds an E.164 `tel:` href from a display phone number.
 * Display numbers carry spaces and brackets, which are not valid in a tel: URI
 * and stop the click-to-call link working on mobile.
 */
export const toTelHref = (phone: string): string => {
  const digits = phone.replace(/[^\d+]/g, '');

  if (digits.startsWith('+')) {
    return `tel:${digits}`;
  }

  if (digits.startsWith('0')) {
    return `tel:${australianCountryCode}${digits.slice(1)}`;
  }

  return `tel:${digits}`;
};
