import React from 'react';

import Image from 'next/image';

import { Heading } from './Heading';
import { Icon } from './Icon/Icon';

export function Hero({ social }) {
  return (
    <div className="isolate bg-white">
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

      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-3xl pt-12 pb-16 sm:pt-24 sm:pb-20 md:p-0">
            <div className="flex-col md:flex-row justify-center">
              <div className="rounded-3xl flex justify-center">
                <Image
                  src="/logo.gif"
                  alt="Storm Electrical Solutions"
                  width={500}
                  height={300}
                  className="hidden lg:inline-block"
                />
                <Image
                  src="/logo.gif"
                  alt="Storm Electrical Solutions"
                  className="object-scale-down lg:hidden"
                  width={500}
                  height={300}
                />
              </div>
              <div className="text-center">
                <Heading level={1}>
                  <strong>Storm Electrical Solutions</strong>
                </Heading>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Melbourne Electricians. Free Quotes. Lighting. Testing. Data. Air Conditioning. Emergency Call out.
                  Upgrade your old Halogen lights for Free!
                </p>
                <div className="mt-8 flex gap-x-4 justify-center">
                  <a href="#contact" className="btn btn-primary">
                    Get a free quote
                  </a>
                  {social.facebook && (
                    <a href={social.facebook} target="_blank" className="btn btn-primary">
                      <Icon name="facebook" size="lg" />
                    </a>
                  )}
                  {social.linkedIn && (
                    <a href={social.linkedIn} target="_blank" className="btn btn-primary">
                      <Icon name="linked-in" size="lg" />
                    </a>
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
      </main>
    </div>
  );
}