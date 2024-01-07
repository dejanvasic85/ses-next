import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'class-names';

import { Icon } from './Icon/Icon';
import { ConditionalWrap } from './ConditionalWrap';

const starRatingMap = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

export function Testimonial(testimonial) {
  const {
    date,
    comment,
    starRating,
    reviewer: { profilePhotoUrl, profileUrl, displayName, isAnonymous = false },
    url,
  } = testimonial;
  const rating = starRatingMap[starRating];
  const [showMore, setShowMore] = React.useState(false);

  return (
    <div className="p-4 rounded-3xl flex flex-col bg-slate-500 text-left">
      <div className="flex gap-2">
        <div className="flex">
          <div className="h-12 w-12 flex items-center justify-center">
            <ConditionalWrap
              condition={!!profileUrl}
              wrapper={(children) => (
                <Link href={profileUrl} target="_blank" className="link link-hover">
                  {children}
                </Link>
              )}
            >
              {profilePhotoUrl && <Image src={profilePhotoUrl} width={40} height={40} alt={displayName} />}
            </ConditionalWrap>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col mt-2">
            <ConditionalWrap
              condition={!!profileUrl}
              wrapper={(children) => (
                <Link href={profileUrl} target="_blank" className="link link-hover">
                  {children}
                </Link>
              )}
            >
              <div className="flex gap-1 text-sm text-white md:text-base font-bold text-center link">{displayName}</div>
            </ConditionalWrap>
            <em className="text-gray-200 text-sm">{date}</em>
          </div>
          <div className="rating">
            {Array.from({ length: 5 }, (_, idx) => (
              <input
                key={idx}
                type="radio"
                disabled
                aria-label={`${idx + 1} star`}
                name={`rating-${displayName}`}
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
            <Link className="tooltip link" data-tip="Posted on Google" href={url} target="_blank">
              <Icon name="google-full" size="xl" className="w-14 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
