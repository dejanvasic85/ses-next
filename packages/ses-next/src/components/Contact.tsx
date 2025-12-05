import { Activity } from 'react';

import { useContact } from '@/hooks/useContact';
import { Heading } from '@/components/Heading';
import { LinkButton } from '@/components/LinkButton';
import { ContactForm } from '@/components/ContactForm';
import { PopSuccess } from '@/components/PopSuccess';
import { Icon } from '@/components/Icon/Icon';

interface ContactData {
  blurbs?: string[];
  phone?: string;
  callBack?: string;
}

interface ContactProps {
  className?: string;
  contact: ContactData;
  location?: string;
}

export function Contact({ className, contact, location }: ContactProps) {
  const { loading, messageSent, sendMessage } = useContact();
  const [firstBlurb = '', secondBlurb = ''] = contact.blurbs ?? [];

  return (
    <div className={className}>
      <Heading level={2}>Contact us</Heading>
      <Activity mode={firstBlurb ? 'visible' : 'hidden'}>
        <p className="max-w-screen-md mb-12 text-center mx-auto px-4 text-gray-500 md:text-lg">{firstBlurb}</p>
      </Activity>
      <div className="flex flex-col items-center justify-center ">
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
        <p className="max-w-screen-md mb-12 text-center mx-auto px-4">
          <LinkButton href={`tel:${contact.phone}`}>
            <Icon name="phone" size="lg" /> {contact.phone}
          </LinkButton>
        </p>
      </Activity>
      <div className="text-gray-600 body-font relative">
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
        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h3 className="text-gray-900 text-lg mb-1 font-medium title-font">Message us for a quote or callback</h3>
            <Activity mode={secondBlurb ? 'visible' : 'hidden'}>
              <p className="leading-relaxed mb-5 text-gray-600">{secondBlurb}</p>
            </Activity>

            <Activity mode={!messageSent ? 'visible' : 'hidden'}>
              <ContactForm loading={loading} onSubmit={sendMessage} />
            </Activity>
            <Activity mode={messageSent ? 'visible' : 'hidden'}>
              <PopSuccess>Thank you! Your message has been received and our team will get back to you.</PopSuccess>
            </Activity>

            <Activity mode={contact.callBack ? 'visible' : 'hidden'}>
              <p className="text-xs text-gray-500 mt-3">{contact.callBack}</p>
            </Activity>
          </div>
        </div>
      </div>
    </div>
  );
}
