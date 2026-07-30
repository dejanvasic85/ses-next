import type { Metadata } from 'next';

import { Container, Heading, LinkButton, Rating, Section, TrustSignals } from '@/components';
import { Icon } from '@/components/Icon/Icon';
import { NavDrawerRow } from '@/components/Navbar/NavDrawerRow';
import { SwatchRow } from '@/components/DesignSystem/SwatchRow';
import { SurfaceSpecimen } from '@/components/DesignSystem/SurfaceSpecimen';
import type { TrustSignal } from '@/types';

export const metadata: Metadata = {
  title: 'Design system — Storm',
  robots: { index: false, follow: false },
};

const surfaceTokens = [
  { token: 'base-100', className: 'bg-base-100', usage: 'Cards, nav, form panels' },
  { token: 'base-200', className: 'bg-base-200', usage: 'Recessed sections' },
  { token: 'base-300', className: 'bg-base-300', usage: 'Borders, dividers' },
  { token: 'base-content', className: 'bg-base-content', usage: 'Headings and body' },
];

const brandTokens = [
  { token: 'primary', className: 'bg-primary', usage: 'Buttons, links, icons' },
  { token: 'secondary', className: 'bg-secondary', usage: 'Gradient stop, accents' },
  { token: 'accent', className: 'bg-accent', usage: 'Hover and active states' },
  { token: 'neutral', className: 'bg-neutral', usage: 'Footer, inverted panels' },
];

const statusTokens = [
  { token: 'info', className: 'bg-info', usage: 'Neutral notices' },
  { token: 'success', className: 'bg-success', usage: 'Form submitted' },
  { token: 'warning', className: 'bg-warning', usage: 'Star ratings' },
  { token: 'error', className: 'bg-error', usage: 'Validation failures' },
];

const typeScale = [
  { label: 'Heading 1', className: 'text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl' },
  { label: 'Heading 2', className: 'text-2xl font-bold tracking-tight lg:text-3xl' },
  { label: 'Heading 3', className: 'text-xl font-semibold tracking-tight lg:text-2xl' },
];

const bodyScale = [
  { label: 'Body', className: 'text-base', text: "Licensed electricians serving Melbourne's western suburbs." },
  {
    label: 'Body muted',
    className: 'text-base-content/70 text-base',
    text: 'Same-day priority response during business hours. Free quotes.',
  },
  { label: 'Caption', className: 'text-base-content/60 text-sm', text: 'Posted on Google · 2 months ago' },
  {
    label: 'Label',
    className: 'text-base-content/50 text-xs font-semibold tracking-widest uppercase',
    text: 'Years experience',
  },
];

const specimenSignals: TrustSignal[] = [
  { icon: 'bolt', value: '19+', label: 'Years experience' },
  { icon: 'star', value: '122', label: '5-star reviews' },
  { icon: 'shield', value: 'REC 24794', label: 'Licensed & insured' },
  { icon: 'badge', value: 'CEC', label: 'Accredited installer' },
];

export default function DesignSystemPage() {
  return (
    <div className="bg-ambient">
      <Section>
        <Container>
          <p className="text-primary mb-3 text-xs font-semibold tracking-[0.2em] uppercase">Storm</p>
          <Heading level={1} align="left">
            Design system
          </Heading>
          <p className="text-base-content/70 max-w-2xl text-lg">
            Every token and surface the site is built from, rendered by the real components. This page is noindex and
            exists so a change to the theme layer can be reviewed in one place, in whichever theme your system prefers.
          </p>
        </Container>
      </Section>

      <Section tone="quiet">
        <Container>
          <Heading level={2} align="left">
            Colour
          </Heading>
          <p className="text-base-content/70 mb-8 max-w-2xl">
            Primary and secondary come from the logo bolt gradient. Greys are biased toward that same blue rather than
            neutral, so light surfaces read cool and dark reads like a storm sky.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <SwatchRow title="Surfaces" swatches={surfaceTokens} />
            <SwatchRow title="Brand" swatches={brandTokens} />
            <SwatchRow title="Status" swatches={statusTokens} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading level={2} align="left">
            Type
          </Heading>
          <p className="text-base-content/70 mb-8 max-w-2xl">
            Schibsted Grotesk sets headings, Onest carries body copy. Both are variable fonts, self-hosted, one request
            each.
          </p>
          <dl className="divide-base-300 divide-y">
            {typeScale.map(({ label, className }) => (
              <div key={label} className="grid gap-2 py-5 md:grid-cols-[10rem_1fr] md:gap-6">
                <dt className="text-base-content/50 pt-2 text-xs font-semibold tracking-widest uppercase">{label}</dt>
                <dd className={className}>Melbourne Electricians</dd>
              </div>
            ))}
            {bodyScale.map(({ label, className, text }) => (
              <div key={label} className="grid gap-2 py-5 md:grid-cols-[10rem_1fr] md:gap-6">
                <dt className="text-base-content/50 pt-1 text-xs font-semibold tracking-widest uppercase">{label}</dt>
                <dd className={className}>{text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="quiet">
        <Container>
          <Heading level={2} align="left">
            Surfaces
          </Heading>
          <p className="text-base-content/70 mb-8 max-w-2xl">
            Three recipes. Glass sits on the ambient gradient or on imagery, never on another glass panel and never more
            than one blur deep — anything holding dense text uses a card instead.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <SurfaceSpecimen
              name="surface-glass"
              className="surface-glass"
              description="Navbar, trust tiles, service cards, review cards, the floating contact panel."
            />
            <SurfaceSpecimen
              name="surface-card"
              className="surface-card"
              description="Opaque base-100 with a token border. Blog posts, FAQ answers, tables — legibility over atmosphere."
            />
            <SurfaceSpecimen
              name="surface-quiet"
              className="surface-quiet"
              description="Recessed base-200 band that separates full-width sections without a hard rule."
            />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading level={2} align="left">
            Components
          </Heading>
          <div className="mt-8 flex flex-col gap-12">
            <div>
              <h3 className="text-base-content/50 mb-4 text-xs font-semibold tracking-widest uppercase">Buttons</h3>
              <div className="flex flex-wrap items-center gap-3">
                <LinkButton href="#contact">Contact us</LinkButton>
                <LinkButton href="#contact" variant="glass">
                  <Icon name="phone" size="lg" /> Call now
                </LinkButton>
                <LinkButton href="#contact" variant="ghost">
                  See all services
                </LinkButton>
              </div>
            </div>

            <div>
              <h3 className="text-base-content/50 mb-4 text-xs font-semibold tracking-widest uppercase">Navigation</h3>
              <p className="text-base-content/70 mb-4 max-w-2xl text-sm">
                The header rides transparent over the top of a page and condenses into glass on scroll. Its bottom edge
                is a bus bar — a hairline of current that lights up once you leave the top, and that the current page
                taps into with a short bright segment. On mobile the same links become rows in a drawer.
              </p>
              <div className="surface-card overflow-hidden rounded-lg">
                <div className="border-base-300 relative flex h-16 items-center gap-1 border-b px-4">
                  <span className="text-base-content/70 rounded-full px-3 py-2 text-sm font-medium">Services</span>
                  <span className="relative flex h-16 items-center">
                    <span className="text-primary rounded-full px-3 py-2 text-sm font-medium">Locations</span>
                    <span
                      aria-hidden="true"
                      className="bg-primary absolute inset-x-3 bottom-0 h-[2px] rounded-t-full"
                    />
                  </span>
                  <span className="text-base-content/70 rounded-full px-3 py-2 text-sm font-medium">Blog</span>
                  <span aria-hidden="true" className="nav-busbar absolute inset-x-0 bottom-0 h-px" />
                </div>
                <div className="flex max-w-sm flex-col gap-1 p-3">
                  <NavDrawerRow item={{ label: 'Services', href: '#', icon: 'wrench' }} isCurrent={false} />
                  <NavDrawerRow item={{ label: 'Locations', href: '#', icon: 'map-pin' }} isCurrent />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base-content/50 mb-4 text-xs font-semibold tracking-widest uppercase">
                Trust signals
              </h3>
              <TrustSignals signals={specimenSignals} />
            </div>

            <div>
              <h3 className="text-base-content/50 mb-4 text-xs font-semibold tracking-widest uppercase">Rating</h3>
              <Rating starRating={5} name="design-system" />
            </div>

            <div>
              <h3 className="text-base-content/50 mb-4 text-xs font-semibold tracking-widest uppercase">Form fields</h3>
              <div className="surface-glass flex max-w-md flex-col gap-4 rounded-lg p-6">
                <label className="flex flex-col gap-1">
                  <span className="text-base-content/80 text-sm font-medium">Full name</span>
                  <input type="text" placeholder="Jane Citizen" className="input input-bordered w-full" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-base-content/80 text-sm font-medium">Message</span>
                  <textarea placeholder="How can we help?" rows={3} className="textarea textarea-bordered w-full" />
                </label>
                <button type="button" className="btn btn-primary self-start">
                  Send message
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-base-content/50 mb-4 text-xs font-semibold tracking-widest uppercase">Prose</h3>
              <article className="prose surface-card max-w-none rounded-lg p-6">
                <h2>Switchboard upgrades</h2>
                <p>
                  We replace outdated fuse boxes with modern safety switch protection, so your board can handle the load
                  your house actually draws. Every upgrade is certified and comes with a compliance certificate.
                </p>
                <ul>
                  <li>Licensed and insured, REC 24794</li>
                  <li>Same-day priority response during business hours</li>
                </ul>
                <p>
                  <a href="#contact">Get a free quote</a> or call us directly.
                </p>
              </article>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
