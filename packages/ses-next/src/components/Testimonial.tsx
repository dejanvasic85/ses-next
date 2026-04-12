'use client';

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
  const [isClamped, setIsClamped] = React.useState(false);
  const textRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsClamped(element.scrollHeight > element.clientHeight);
    }
  }, [comment]);

  return (
    <div className="flex flex-col rounded-3xl bg-slate-500 p-4 text-left">
      <div className="flex gap-2">
        <div className="flex">
          <div className="flex h-12 w-12 items-center justify-center">
            <ConditionalWrap
              condition={!!profileUrl}
              wrapper={(children) => (
                <Link href={profileUrl} target="_blank" className="">
                  {children}
                </Link>
              )}
            >
              {profilePhotoUrl && <Image src={profilePhotoUrl} width={40} height={40} alt={displayName} unoptimized />}
            </ConditionalWrap>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="mt-2 flex flex-col">
            <ConditionalWrap
              condition={!!profileUrl}
              wrapper={(children) => (
                <Link href={profileUrl} target="_blank" className="">
                  {children}
                </Link>
              )}
            >
              <div className="inline border-b-2 text-sm font-bold text-white md:text-base">{displayName}</div>
            </ConditionalWrap>
            <em className="text-sm text-white">{date}</em>
          </div>
          <Rating starRating={starRating} name={displayName} />
          <div>
            <div ref={textRef} className={classNames('pr-4 text-white', { 'line-clamp-4': !showMore })}>
              &ldquo;{comment}&rdquo;
            </div>
            {(isClamped || showMore) && (
              <button className="border-b-2 text-white" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show less' : 'Show more'}
              </button>
            )}
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
