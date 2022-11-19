import React from 'react';

import Image from 'next/image';

export function Hero() {
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
                <h1 className="font-title mb-2 text-xl font-extrabold sm:text-5xl lg:text-6xl">
                  Storm Electrical Solutions
                </h1>
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
