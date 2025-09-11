import React, { ReactNode } from 'react';
import Link from 'next/link';

import { Icon } from './Icon/Icon';
import { Social, ServiceList } from '@/types';

interface ConditionalWrapProps {
  children: ReactNode;
  condition: boolean;
  wrapper: (children: ReactNode) => ReactNode;
}

const ConditionalWrap = ({ children, condition, wrapper }: ConditionalWrapProps) => {
  return condition ? wrapper(children) : children;
};

interface Links {
  home: string;
  services: string;
  about: string;
  contact: string;
  faq: string;
  blog: string;
  terms: string;
}

interface FooterProps {
  social: Social;
  links?: Links;
  services: ServiceList;
}

export function Footer({
  social = {} as Social,
  links = {
    home: '/',
    services: '/#services',
    about: '/#about',
    contact: '/#contact',
    faq: '/faq',
    blog: '/blog',
    terms: '/terms',
  },
  services = { items: [] },
}: FooterProps) {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className="footer p-10 bg-slate-700 text-white grid grid-cols-1 lg:grid-cols-4">
      <div className="flex flex-col gap-2">
        <Icon name="bolt" size="xxxl" />
        <div>
          <strong>Storm Electrical Solutions. Melbourne electricians.</strong>
        </div>
        <div>Copyright {year} All rights reserved</div>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <Link className="link link-hover" href={links.services}>
          Services
        </Link>
        <Link className="link link-hover" href={links.about}>
          About us
        </Link>
        <Link className="link link-hover" href={links.contact}>
          Contact us
        </Link>
        <Link className="link link-hover" href={links.blog}>
          Blog
        </Link>
        <Link className="link link-hover" href={links.faq}>
          FAQ
        </Link>
        <Link className="link link-hover" href={links.terms}>
          Terms and Conditions
        </Link>
      </div>
      <div>
        <span className="footer-title">Services</span>
        {services.items.map(({ name, linkToReadMore, slug }) => (
          <ConditionalWrap
            key={name}
            condition={!!linkToReadMore && !!slug}
            wrapper={(children) => (
              <Link href={`/services/${slug}`} className="link link-hover">
                {children}
              </Link>
            )}
          >
            {name}
          </ConditionalWrap>
        ))}
      </div>
      <div>
        <span className="footer-title">Follow us</span>
        {social.facebook && (
          <Link className="link link-hover flex gap-1" href={social.facebook} target="_blank">
            <Icon name="facebook" />
            Facebook
          </Link>
        )}
        {social.instagram && (
          <Link className="link link-hover flex gap-1" href={social.instagram} target="_blank">
            <Icon name="instagram" />
            Instagram
          </Link>
        )}
        {social.linkedIn && (
          <Link className="link link-hover flex gap-1" href={social.linkedIn} target="_blank">
            <Icon name="linked-in" />
            Linked in
          </Link>
        )}
      </div>
    </footer>
  );
}
