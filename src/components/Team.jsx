import React from 'react';

import { Heading } from './Heading';
import { Icon } from './Icon/Icon';

export function Team({ aboutIntro, introduction, members }) {
  const [firstAbout, secondAbout] = aboutIntro;

  return (
    <>
      <div className="bg-slate-50 py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
          <div className="mb-10 md:mb-16">
            <Heading level={2}>Meet our Team</Heading>
            <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">{introduction}</p>
          </div>
          <div className="flex flex-wrap justify-center items-stretch lg:flex-row gap-4 lg:gap-8">
            {members.map(({ avatar, fullName, role }) => (
              <div key={fullName} className="flex flex-col items-center w-full md:w-1/4 rounded-lg p-4 lg:p-8">
                <div className="w-24 md:w-32 h-24 md:h-32 bg-slate-200 rounded-full overflow-hidden shadow-lg mb-2 md:mb-4">
                  <img
                    src={avatar}
                    loading="lazy"
                    alt={fullName}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <div className="text-primary md:text-lg font-bold text-center">{fullName}</div>
                  <p className="text-gray-500 text-sm md:text-base text-center mb-3 md:mb-4">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-12 border-t-2">
          <p className="max-w-screen-md text-gray-400 md:text-lg text-center mx-auto">{firstAbout}</p>
        </div>
        <div className="sm:h-40 grid grid-cols-2 xl:grid-cols-4 sm:content-evenly rounded-lg gap-6 p-6">
          <div className="flex items-center justify-center gap-1 text-gray-400">
            <Icon name="space" size="xxxl" />
            <span className="text-lg md:text-2xl xl:text-3xl">Confined spaces</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-gray-400">
            <Icon name="height" size="xxxl" />
            <span className="text-lg md:text-2xl xl:text-3xl">Working at heights</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-gray-400">
            <Icon name="signal-tower" size="xxxl" />
            <span className="text-lg md:text-2xl xl:text-3xl">Tower rescue</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-gray-400">
            <Icon name="bars-staggered" size="xxxl" />
            <span className="text-lg md:text-2xl xl:text-3xl">Boom & scissor lift</span>
          </div>
        </div>
      </div>
    </>
  );
}
