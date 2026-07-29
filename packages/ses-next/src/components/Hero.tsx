import { Heading } from '@/components/Heading';
import { SanityImage } from '@/components/SanityImage';
import { Icon } from '@/components/Icon/Icon';
import { LinkButton } from '@/components/LinkButton';
import { TrustSignals } from '@/components/TrustSignals';
import type { Social, TrustSignal } from '@/types';

interface HeroProps {
  companyName: string;
  companyLogo: string;
  social: Social;
  mainHeading: string | null;
  subHeading: string | null;
  trustSignals: TrustSignal[];
}

export function Hero({ companyName, companyLogo, social, mainHeading, subHeading, trustSignals }: HeroProps) {
  return (
    <div className="bg-base-100 bg-ambient isolate flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-3xl pt-4 pb-6 sm:pt-24 sm:pb-20 md:p-0">
          <div className="flex-col justify-center md:flex-row">
            <div className="flex justify-center rounded-3xl">
              <SanityImage
                src={companyLogo}
                alt={companyName}
                width={500}
                height={300}
                className="hidden lg:inline-block"
                priority
                loading="eager"
              />
              <SanityImage
                src={companyLogo}
                alt={companyName}
                className="object-scale-down lg:hidden"
                width={500}
                height={300}
                loading="eager"
              />
            </div>
            <div className="text-center">
              <Heading level={1}>
                <strong>{mainHeading}</strong>
              </Heading>
              <h2 className="text-base-content/70 mt-6 text-base leading-8 md:text-lg">{subHeading}</h2>
              <div className="mt-8 flex justify-center gap-x-4">
                <LinkButton href="#contact">Contact us</LinkButton>
                {social.facebook && (
                  <LinkButton
                    variant="glass"
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook page"
                  >
                    <Icon name="facebook" size="lg" />
                  </LinkButton>
                )}
                {social.instagram && (
                  <LinkButton
                    variant="glass"
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram page"
                  >
                    <Icon name="instagram" size="lg" />
                  </LinkButton>
                )}
                {social.linkedIn && (
                  <LinkButton
                    variant="glass"
                    href={social.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn page"
                  >
                    <Icon name="linked-in" size="lg" />
                  </LinkButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {trustSignals.length > 0 && (
        <div className="mt-auto pb-8 sm:pb-12">
          <TrustSignals signals={trustSignals} />
        </div>
      )}
    </div>
  );
}
