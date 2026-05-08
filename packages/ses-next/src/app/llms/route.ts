import type { LocationPage, ServiceItem, SiteSettings } from '@/types';
import { getAllLocationPages, getServices, getSiteSettings } from '@/lib/content/contentService';

export const dynamic = 'force-static';
export const revalidate = 86400;

type LlmsData = {
  siteSettings: SiteSettings;
  services: ServiceItem[];
  locationPages: LocationPage[];
};

function buildServicesSection(services: ServiceItem[]): string {
  return services
    .filter((s) => s.parentService === null)
    .map((s) => `- ${s.name}`)
    .join('\n');
}

function buildServiceAreaSection(locationPages: LocationPage[]): string {
  return locationPages
    .filter((p) => !p.isHub)
    .map((p) => p.suburb)
    .join(', ');
}

function buildLlmsText({ siteSettings, services, locationPages }: LlmsData): string {
  const {
    companyName,
    phone,
    mobile,
    email,
    baseUrl,
    abn,
    recLicence,
    streetAddress,
    suburb,
    state,
    postcode,
    establishedYear,
    directorName,
    owner,
    openingHours,
  } = siteSettings;

  const yearsExperience = establishedYear ? new Date().getFullYear() - establishedYear : null;
  const fullAddress =
    streetAddress && suburb && state && postcode ? `${streetAddress}, ${suburb} ${state} ${postcode}` : null;
  const hoursText = openingHours
    ? `${openingHours.daysOfWeek.join('–')}: ${openingHours.opensAt} – ${openingHours.closesAt}`
    : null;

  const lines = [
    `# ${companyName}`,
    '',
    '## About',
    '',
    `Licensed electrical services company based in ${suburb ?? 'Melbourne'}, Victoria, Australia.`,
    ...(establishedYear
      ? [`Established ${establishedYear}.${yearsExperience ? ` ${yearsExperience}+ years experience.` : ''}`]
      : []),
    ...(abn ? [`ABN: ${abn}`] : []),
    ...(recLicence ? [`REC Licence: ${recLicence}`] : []),
    '',
    '## Director',
    '',
    ...(directorName
      ? [`${directorName}${owner?.accreditations?.length ? ` — ${owner.accreditations.join(', ')}` : ''}`]
      : []),
    '',
    '## Services',
    '',
    buildServicesSection(services),
    '',
    '## Service Area',
    '',
    'Melbourne metropolitan area. Specialising in western and inner suburbs:',
    buildServiceAreaSection(locationPages),
    '',
    '## Contact',
    '',
    ...(phone ? [`- Phone: ${phone}`] : []),
    ...(mobile ? [`- Mobile: ${mobile}`] : []),
    ...(email ? [`- Email: ${email}`] : []),
    ...(fullAddress ? [`- Address: ${fullAddress}`] : []),
    `- Website: ${baseUrl}`,
    '',
    '## Credentials',
    '',
    '- Clean Energy Council (CEC) Accredited Designer and Installer',
    '- New Energy Tech (NET) Approved Seller',
    ...(recLicence ? [`- Registered Electrical Contractor (REC): ${recLicence}`] : []),
    '- Energy Safe Victoria registered',
    '',
    '## Hours',
    '',
    ...(hoursText ? [hoursText] : []),
    'Same-day priority response. No after-hours callouts.',
    '',
    '## Pricing',
    '',
    'All work quoted before commencement. Free quotes provided for installations.',
  ];

  return lines.join('\n');
}

export async function GET(): Promise<Response> {
  const [siteSettings, services, locationPages] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getAllLocationPages(),
  ]);

  const body = buildLlmsText({ siteSettings, services, locationPages });

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
