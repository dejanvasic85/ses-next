import type { LocationPage, ServiceItem, SiteSettings } from '@/types';
import { getAllLocationPages, getServices, getSiteSettings } from '@/lib/content/contentService';

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
  const { companyName, phone, mobile, email, address, baseUrl, abn, recLicence, businessHours } = siteSettings;

  const lines = [
    `# ${companyName}`,
    '',
    '## About',
    '',
    'Licensed electrical services company based in Altona North, Melbourne, Victoria, Australia.',
    'Established 2007. 19+ years experience.',
    ...(abn ? [`ABN: ${abn}`] : []),
    ...(recLicence ? [`REC Licence: ${recLicence}`] : []),
    '',
    '## Director',
    '',
    'Karl Rainbow — Licensed Electrician, Clean Energy Council Accredited Designer and Installer,',
    'New Energy Tech Approved Seller.',
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
    ...(address ? [`- Address: ${address}`] : []),
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
    ...(businessHours ? [businessHours] : []),
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
