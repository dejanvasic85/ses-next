import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'class-names';

import { Icon } from '@/components/Icon/Icon';
import { ConditionalWrap } from '@/components/ConditionalWrap';
import { Rating } from '@/components/Rating';

interface TestimonialReviewer {
  profilePhotoUrl: string;
  profileUrl: string;
  displayName: string;
}

interface TestimonialProps {
  date: string;
  comment: string;
  starRating: number;
  reviewer: TestimonialReviewer;
  url: string;
}

export function Testimonial(testimonial: TestimonialProps) {
  const {
    date,
    comment,
    starRating,
    reviewer: { profilePhotoUrl, profileUrl, displayName },
    url,
  } = testimonial;
  const [showMore, setShowMore] = React.useState(false);

  return (
    <div className="p-4 rounded-3xl flex flex-col bg-slate-500 text-left">
      <div className="flex gap-2">
        <div className="flex">
          <div className="h-12 w-12 flex items-center justify-center">
            <ConditionalWrap
              condition={!!profileUrl}
              wrapper={(children) => (
                <Link href={profileUrl} target="_blank" className="">
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
                <Link href={profileUrl} target="_blank" className="">
                  {children}
                </Link>
              )}
            >
              <div className="inline text-sm text-white md:text-base font-bold border-b-2">{displayName}</div>
            </ConditionalWrap>
            <em className="text-white text-sm">{date}</em>
          </div>
          <Rating starRating={starRating} name={displayName} />
          <div>
            <div className={classNames('pr-4 text-white', { 'line-clamp-4': !showMore })}>“{comment}”</div>
            <button className="text-white border-b-2" onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show less' : 'Show more'}
            </button>
          </div>
          <div>
            <Link
              className="tooltip"
              data-tip="Posted on Google"
              href={url}
              target="_blank"
              aria-label={`Read review from ${displayName} on Google Maps`}
            >
              <Icon name="google-full" size="xl" className="w-14 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
