import React from 'react';

import { useContact } from '../hooks/useContact';
import { Heading } from './Heading';
import { LinkButton } from './LinkButton';
import { ContactForm } from './ContactForm';
import { PopSuccess } from './PopSuccess';
import { Icon } from './Icon/Icon';

export function Contact({ className, contact, location }) {
  const { loading, messageSent, sendMessage } = useContact();
  const [firstBlurb = '', secondBlurb = ''] = contact.blurbs ?? [];

  return (
    <div className={className}>
      <Heading level={2}>Contact us</Heading>
      {firstBlurb && (
        <>
          <p className="max-w-screen-md mb-12 text-center mx-auto px-4 text-gray-500 md:text-lg">{firstBlurb}</p>
        </>
      )}
      {contact.phone && (
        <p className="max-w-screen-md mb-12 text-center mx-auto px-4">
          <LinkButton href={`tel:${contact.phone}`}>
            <Icon name="phone" size="lg" /> {contact.phone}
          </LinkButton>
        </p>
      )}

      <div className="text-gray-600 body-font relative">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="map"
            scrolling="no"
            src={location}
            style={{ filter: 'grayscale(0.7) contrast(1.2) opacity(0.8)' }}
          ></iframe>
        </div>
        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h3 className="text-gray-900 text-lg mb-1 font-medium title-font">Message us for a quote or callback</h3>
            {secondBlurb && <p className="leading-relaxed mb-5 text-gray-600">{secondBlurb}</p>}

            {!messageSent && <ContactForm loading={loading} onSubmit={sendMessage} />}
            {messageSent && (
              <PopSuccess>Thank you! Your message has been received and our team will get back to you.</PopSuccess>
            )}

            {contact.callBack && <p className="text-xs text-gray-500 mt-3">{contact.callBack}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
