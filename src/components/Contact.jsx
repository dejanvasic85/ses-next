import React, { useState } from 'react';

import { ContactForm } from './ContactForm';

export function Contact({ contact, location }) {
  const [loading, setLoading] = useState(false);

  return (
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
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Contact us</h2>
          {contact.blurb && <p className="leading-relaxed mb-5 text-gray-600">{contact.blurb}</p>}
          <ContactForm loading={loading} onSubmit={(data) => console.log('submit this', data)} />
          {contact.callBack && <p className="text-xs text-gray-500 mt-3">{contact.callBack}</p>}
        </div>
      </div>
    </div>
  );
}
