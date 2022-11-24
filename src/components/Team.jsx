import React from 'react';

import { Heading } from './Heading';

export function Team({ about, introduction, members }) {
  const [first, second] = about;
  const middleIndex = Math.ceil(members.length / 2);
  const firstHalfMembers = members.splice(0, middleIndex);
  const secondHalf = members.splice(-middleIndex);

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
        <div className="mb-10 md:mb-16">
          <Heading level={2}>Meet our Team</Heading>
          <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">{introduction}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
          <div className="flex flex-col w-80 items-center justify-center bg-slate-100 rounded-lg text-gray-500 p-8 md:p-12 font-bold text-center">
            {first}
          </div>
          {members.map(({ avatar, fullName, role }) => (
            <div className="flex flex-col w-80 items-center bg-slate-100 rounded-lg p-4 lg:p-8">
              <div className="w-24 md:w-32 h-24 md:h-32 bg-slate-200 rounded-full overflow-hidden shadow-lg mb-2 md:mb-4">
                <img src={avatar} loading="lazy" alt={fullName} className="w-full h-full object-cover object-center" />
              </div>
              <div>
                <div className="text-primary md:text-lg font-bold text-center">{fullName}</div>
                <p className="text-gray-500 text-sm md:text-base text-center mb-3 md:mb-4">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
