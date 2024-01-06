import React from 'react';
import Image from 'next/image';
import classNames from 'class-names';

import { Icon } from './Icon/Icon';

export function Testimonial(testimonial) {
  const { fullName, comment, rating, profileImgUrl, date = 'a year ago' } = testimonial;
  const [showMore, setShowMore] = React.useState(false);

  return (
    <div className="px-4 pt-4 pb-8 rounded-3xl flex flex-col bg-slate-500 text-left">
      <div className="flex gap-2">
        <div className="flex">
          <div className="h-12 w-12 flex items-center justify-center">
            {profileImgUrl && <Image src={profileImgUrl} width={40} height={40} alt={fullName} />}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col mt-2">
            <div className="flex gap-1 text-sm text-white md:text-base font-bold text-center link">
              {fullName}
              <div className="tooltip" data-tip="Verified Customer">
                <Icon name="check-starburst" className="w-4 h-4" />
              </div>
            </div>
            <em className="text-gray-200 text-sm">{date}</em>
          </div>
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
          <div>
            <div className={classNames('pr-4 text-white', { 'line-clamp-4': !showMore })}>“{comment}”</div>
            <button className="text-gray-200 link" onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show less' : 'Show more'}
            </button>
          </div>
          <div>
            <a className="tooltip link" data-tip="Posted on Google">
              <Icon name="google-full" size="xl" className="w-14" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
