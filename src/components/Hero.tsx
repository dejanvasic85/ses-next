import React from 'react';

import Image from 'next/image';

import { Heading } from './Heading';

export function HeroV1() {
  return (
    <div className="from-blue-600 to-blue-800 text-primary-content -mt-[4rem] grid place-items-center items-end bg-gradient-to-br pt-12">
      <div className="hero-content col-start-1 row-start-1 w-full max-w-7xl flex-col justify-between gap-10 pb-10 lg:flex-row lg:items-end lg:gap-0 xl:gap-20">
        <div className="lg:pl-10 lg:pb-28 border-black">
          <div className="md:mb-2 md:py-4 text-center lg:py-10 lg:text-left">
            <div className="hero-content flex-col lg:gap-8 lg:flex-row">
              <div className="rounded-3xl bg-base-200">
                <Image
                  src="/logo.gif"
                  alt="Storm Electrical Solutions"
                  width={350}
                  height={300}
                  className="hidden lg:inline-block"
                />
                <Image
                  src="/logo.gif"
                  alt="Storm Electrical Solutions"
                  width={200}
                  height={200}
                  className="pt-8 lg:hidden"
                />
              </div>
              <div className="md:pt-20 pb-12">
                <Heading level={1}>Storm Electrical Solutions</Heading>
                <h2 className="font-title text-lg font-bold sm:text-2xl lg:text-3xl">Melbourne Electricians</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <svg
        className="fill-blue-400 opacity-50 col-start-1 row-start-1 h-auto w-full"
        width="1600"
        height="380"
        viewBox="0 0 1600 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 338L53.3 349.2C106.7 360.3 213.3 382.7 320 393.8C426.7 405 533.3 405 640 359.3C746.7 313.7 853.3 222.3 960 189.2C1066.7 156 1173.3 181 1280 159.2C1386.7 137.3 1493.3 68.7 1546.7 34.3L1600 0V595H1546.7C1493.3 595 1386.7 595 1280 595C1173.3 595 1066.7 595 960 595C853.3 595 746.7 595 640 595C533.3 595 426.7 595 320 595C213.3 595 106.7 595 53.3 595H0V338Z"></path>
      </svg>
    </div>
  );
}

export function HeroV2() {
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
                  width={300}
                  height={300}
                />
              </div>
              <div className="text-center">
                <Heading level={1}>Storm Electrical Solutions</Heading>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Melbourne Electricians. Free Quotes. Lighting. Testing. Data. Air Conditioning. Emergency Call out.
                  Upgrade your old Halogen lights for Free!
                </p>
                <div className="mt-8 flex gap-x-4 justify-center">
                  <a href="#contact" className="btn btn-primary">
                    Get a free quote
                  </a>
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
