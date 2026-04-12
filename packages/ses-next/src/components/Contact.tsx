'use client';

import { Activity } from 'react';

import { useContact } from '@/hooks/useContact';
import { Heading } from '@/components/Heading';
import { LinkButton } from '@/components/LinkButton';
import { ContactForm } from '@/components/ContactForm';
import { PopSuccess } from '@/components/PopSuccess';
import { Icon } from '@/components/Icon/Icon';
import { ContactContentModel } from '@/types';

interface ContactProps {
  className?: string;
  contact: ContactContentModel;
  location: string | null;
}

export function Contact({ className, contact, location }: ContactProps) {
  const { error, loading, messageSent, sendMessage } = useContact();
  const [firstBlurb = '', secondBlurb = ''] = contact.blurbs ?? [];

  return (
    <div className={className}>
      <Heading level={2}>Contact us</Heading>
      <Activity mode={firstBlurb ? 'visible' : 'hidden'}>
        <p className="mx-auto mb-12 max-w-screen-md px-4 text-center text-gray-500 md:text-lg">{firstBlurb}</p>
      </Activity>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-8 text-center">
          <div className="text-lg" itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
            <p className="mb-2">
              <span itemProp="streetAddress">61B Hansen St</span>,<span itemProp="addressLocality">Altona North</span>,
              <span itemProp="addressRegion">VIC</span>,<span itemProp="postalCode">3025</span>,
              <span itemProp="addressCountry">Australia</span>
            </p>
          </div>
        </div>
      </div>
      <Activity mode={contact.phone ? 'visible' : 'hidden'}>
        <p className="mx-auto mb-12 max-w-screen-md px-4 text-center">
          <LinkButton href={`tel:${contact.phone}`}>
            <Icon name="phone" size="lg" /> {contact.phone}
          </LinkButton>
        </p>
      </Activity>
      <div className="body-font relative text-gray-600">
        {location && (
          <div className="absolute inset-0 bg-gray-300">
            <iframe
              width="100%"
              height="100%"
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
              title="map"
              scrolling="no"
              src={location}
              style={{ filter: 'grayscale(0.7) contrast(1.2) opacity(0.8)' }}
            ></iframe>
          </div>
        )}
        <div className="container mx-auto flex px-5 py-24">
          <div className="relative z-10 mt-10 flex w-full flex-col rounded-lg bg-white p-8 shadow-md md:mt-0 md:ml-auto md:w-1/2 lg:w-1/3">
            <h3 className="title-font mb-1 text-lg font-medium text-gray-900">Message us for a quote or callback</h3>
            <Activity mode={secondBlurb ? 'visible' : 'hidden'}>
              <p className="mb-5 leading-relaxed text-gray-600">{secondBlurb}</p>
            </Activity>

            <Activity mode={!messageSent ? 'visible' : 'hidden'}>
              <ContactForm loading={loading} onSubmit={sendMessage} />
              <Activity mode={error ? 'visible' : 'hidden'}>
                <p role="alert" aria-live="assertive" className="text-error mt-3 text-sm">
                  Something went wrong. Please try again.
                </p>
              </Activity>
            </Activity>
            <Activity mode={messageSent ? 'visible' : 'hidden'}>
              <PopSuccess>Thank you! Your message has been received and our team will get back to you.</PopSuccess>
            </Activity>

            <Activity mode={contact.callBack ? 'visible' : 'hidden'}>
              <p className="mt-3 text-xs text-gray-500">{contact.callBack}</p>
            </Activity>
          </div>
        </div>
      </div>
    </div>
  );
}
