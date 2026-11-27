import Link from 'next/link';

import { Icon } from '@/components/Icon/Icon';
import { careersPath } from '@/lib/careers';

interface TeamHiringCardProps {
  heading: string;
  roleTitle: string;
  buttonText: string;
}

/** The "empty seat" in Meet our Team. Sized to match the member cards beside it. */
export function TeamHiringCard({ heading, roleTitle, buttonText }: TeamHiringCardProps) {
  return (
    <div className="flex w-full flex-col items-center rounded-lg p-4 md:w-1/4 lg:p-8">
      <div className="border-primary/50 bg-primary/5 text-primary mb-2 flex size-24 items-center justify-center rounded-full border-2 border-dashed md:mb-4 md:size-32">
        <Icon name="user-plus" size="xxl" className="md:size-12" />
      </div>
      <div className="text-center font-bold md:text-lg">{heading}</div>
      <p className="text-base-content/70 mb-3 text-center text-sm md:mb-4 md:text-base">{roleTitle}</p>
      <Link href={careersPath} className="btn btn-primary btn-sm rounded-full">
        {buttonText}
        <Icon name="arrow-right" size="sm" />
      </Link>
    </div>
  );
}
