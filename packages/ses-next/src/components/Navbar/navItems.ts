import type { IconName } from '@/components/Icon/Icon';

export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

export const homeHref = '/';

export const navItems: NavItem[] = [
  { label: 'Home', href: homeHref, icon: 'home' },
  { label: 'Services', href: '/services/', icon: 'wrench' },
  { label: 'Locations', href: '/locations/', icon: 'map-pin' },
  { label: 'About', href: '/#about', icon: 'badge' },
  { label: 'FAQ', href: '/faq', icon: 'help' },
  { label: 'Blog', href: '/blog', icon: 'book' },
  { label: 'Contact', href: '/#contact', icon: 'envelope' },
];

/*
 * The desktop rail leaves Home out — the wordmark already goes there, and the
 * row is tight enough at md that a seventh item pushes the phone button off.
 */
export const railItems = navItems.filter(({ href }) => href !== homeHref);

/*
 * Hash links point at sections of the homepage, so they never own a route and
 * are never marked current. Everything else matches its own path plus anything
 * nested under it, which is what keeps Services lit on a service detail page.
 */
export function isCurrentNavItem({ href }: NavItem, pathname: string): boolean {
  if (href.includes('#')) return false;
  if (href === homeHref) return pathname === homeHref;

  const base = href.replace(/\/$/, '');
  return pathname === base || pathname.startsWith(`${base}/`);
}
