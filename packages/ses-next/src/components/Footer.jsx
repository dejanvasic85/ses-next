import React from 'react';

import { Icon } from './Icon/Icon';

export function Footer({
  social = {},
  links = { home: '/', services: '/#services', about: '/#about', contact: '/#contact', faq: '/faq' },
}) {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer className="footer p-10 bg-neutral text-white">
      <div className="flex flex-col gap-2">
        <Icon name="bolt" size="xxxl" />
        <div>
          <strong>Storm Electrical Solutions. Melbourne electricians.</strong>
        </div>
        <div>Copyright {year} All rights reserved</div>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a className="link link-hover" href={links.services}>
          Services
        </a>
        <a className="link link-hover" href={links.about}>
          About us
        </a>
        <a className="link link-hover" href={links.contact}>
          Contact us
        </a>
        <a className="link link-hover" href={links.faq}>
          FAQ
        </a>
      </div>
      <div>
        <span className="footer-title">Follow us</span>
        {social.facebook && (
          <a className="link link-hover flex gap-1" href={social.facebook} target="_blank">
            <Icon name="facebook" />
            Facebook
          </a>
        )}
        {social.linkedIn && (
          <a className="link link-hover flex gap-1" href={social.linkedIn} target="_blank">
            <Icon name="linked-in" />
            Linked in
          </a>
        )}
      </div>
    </footer>
  );
}
