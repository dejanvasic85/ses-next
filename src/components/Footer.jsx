import React from 'react';
import { Icon } from '.';

export function Footer() {
  const now = new Date();
  const thisYear = now.getFullYear();

  return (
    <footer className="footer p-10 bg-neutral text-white">
      <div className="flex flex-col gap-2">
        <Icon name="bolt" size="xxxl" />
        <div>Storm Electrical Solutions. Melbourne electricians.</div>
        <div>Copyright {thisYear}</div>
      </div>
      <div>
        <span className="footer-title">Services</span>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </footer>
  );
}
