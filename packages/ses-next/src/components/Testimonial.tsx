'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';

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
    <div className="surface-glass flex flex-col rounded-3xl p-4 text-left">
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
              <div className="font-display text-base-content inline border-b-2 text-sm font-bold md:text-base">
                {displayName}
              </div>
            </ConditionalWrap>
            <em className="text-base-content/60 text-sm">{date}</em>
          </div>
          <Rating starRating={starRating} name={displayName} />
          <div>
            <div ref={textRef} className={clsx('text-base-content/80 pr-4', { 'line-clamp-4': !showMore })}>
              &ldquo;{comment}&rdquo;
            </div>
            {(isClamped || showMore) && (
              <button className="text-primary border-b-2" onClick={() => setShowMore(!showMore)}>
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
              <Icon name="google-full" size="xl" className="text-base-content/70 w-14" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
