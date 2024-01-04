import React from 'react';
import Image from 'next/image';

export function Testimonial({ fullName, comment, rating, profileImgUrl }) {
  return (
    <div className="flex flex-col justify-between items-center bg-slate-500 rounded-lg gap-4 md:gap-6 px-8 py-6">
      <div className="max-w-md text-white lg:text-lg text-center">“{comment}”</div>

      <div className="flex flex-col items-center gap-2 md:gap-3">
        <div className="flex justify-center items-center gap-2">
          {profileImgUrl && <Image src={profileImgUrl} width={32} height={37} alt={fullName} />}
          <div className="text-white text-sm md:text-base font-bold text-center">{fullName}</div>
        </div>
        <div>
          <div className="rating">
            {Array.from({ length: 5 }, (_, idx) => (
              <input
                key={idx}
                type="radio"
                disabled
                aria-label={`${idx + 1} star`}
                name={`rating-${fullName}`}
                className="mask mask-star-2 bg-orange-400 hover:cursor-default"
                {...(rating === idx + 1 ? { checked: true } : null)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
