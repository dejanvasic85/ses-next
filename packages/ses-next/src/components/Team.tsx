import { Heading } from '@/components/Heading';
import { SanityImage } from '@/components/SanityImage';
import { Icon } from '@/components/Icon/Icon';
import type { IconMap } from '@/components/Icon/IconMap';

interface TeamMember {
  avatar: string;
  fullName: string;
  role: string;
}

interface TrainingItem {
  trainingTitle: string;
  icon: string;
}

interface TeamProps {
  blurbs: string[];
  members: TeamMember[];
  training: TrainingItem[];
}

export function Team({ blurbs, members, training }: TeamProps) {
  const [firstBlurb, secondBlurb] = blurbs;

  return (
    <>
      <div className="bg-slate-50 py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <Heading level={2}>Meet our Team</Heading>
            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">{firstBlurb}</p>
          </div>
          <div className="flex flex-wrap items-stretch justify-center gap-4 lg:flex-row lg:gap-8">
            {members.map(({ avatar, fullName, role }) => (
              <div key={fullName} className="flex w-full flex-col items-center rounded-lg p-4 md:w-1/4 lg:p-8">
                <div className="relative mb-2 h-24 w-24 overflow-hidden rounded-full bg-slate-200 shadow-lg md:mb-4 md:h-32 md:w-32">
                  <SanityImage
                    src={avatar}
                    alt={fullName}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>
                <div>
                  <div className="text-center font-bold md:text-lg">{fullName}</div>
                  <p className="mb-3 text-center text-sm text-gray-500 md:mb-4 md:text-base">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-12">
          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">{secondBlurb}</p>
        </div>
        <div className="grid grid-cols-2 gap-6 rounded-lg p-6 sm:h-40 sm:content-evenly xl:grid-cols-4">
          {training.map(({ trainingTitle, icon }, idx) => (
            <div key={idx} className="flex items-center justify-center gap-1 text-gray-500">
              <Icon name={icon as keyof typeof IconMap} size="xxxl" />
              <span className="text-sm md:text-2xl xl:text-3xl">{trainingTitle}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
