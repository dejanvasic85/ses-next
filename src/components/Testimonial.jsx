import React from 'react';

export function Testimonial({ fullName, comment, rating }) {
  const [firstName = '', lastName = ''] = fullName.split(' ');

  return (
    <div className="flex flex-col items-center bg-primary rounded-lg gap-4 md:gap-6 px-8 py-6">
      <div className="max-w-md text-white lg:text-lg text-center">“{comment}”</div>

      <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
        <div className="avatar placeholder">
          <div className="bg-white text-primary rounded-full w-12 font-bold">
            <span>
              {firstName.substring(0, 1).toUpperCase()}
              {lastName.substring(0, 1).toUpperCase()}
            </span>
          </div>
        </div>

        <div>
          <div className="text-indigo-50 text-sm md:text-base font-bold text-center sm:text-left">{fullName}</div>
        </div>

        <div>
          <div className="rating">
            {Array.from({ length: 5 }, (_, idx) => (
              <input
                key={idx}
                type="radio"
                disabled
                name={`rating-${fullName}`}
                className="mask mask-star-2 bg-orange-400"
                {...(rating === idx + 1 ? { checked: true } : null)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
