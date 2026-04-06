'use client';

import Link from 'next/link';

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Server Error</h1>
          <p className="text-center text-gray-800 text-lg">
            We experienced something unexpected. Please try again later or{' '}
            <Link href="/" className="link">
              contact support
            </Link>{' '}
            if the issue persists.
          </p>
          <div className="mt-6 text-center">
            <button onClick={() => unstable_retry()} className="btn btn-primary">
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
