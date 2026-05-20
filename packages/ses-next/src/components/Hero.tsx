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
    <div className="isolate flex min-h-[calc(100vh-4rem)] flex-col bg-white">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#45C1E3"></stop>
              <stop offset="1" stopColor="#007bc0"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>

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
              <h2 className="mt-6 text-base leading-8 text-gray-600 md:text-lg">{subHeading}</h2>
              <div className="mt-8 flex justify-center gap-x-4">
                <LinkButton href="#contact">Contact us</LinkButton>
                {social.facebook && (
                  <LinkButton
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
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
              <svg
                className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                viewBox="0 0 1155 678"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                  fillOpacity=".3"
                  d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                />
                <defs>
                  <linearGradient
                    id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                    x1="1155.49"
                    x2="-78.208"
                    y1=".177"
                    y2="474.645"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#45C1E3"></stop>
                    <stop offset="1" stopColor="#007bc0"></stop>
                  </linearGradient>
                </defs>
              </svg>
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
