'use client';

import Link from 'next/link';

import { Container, PageSection } from '@/components';

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <PageSection>
      <Container width="standard">
        <div className="mb-10 md:mb-16">
          <h1 className="text-base-content mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">Server Error</h1>
          <p className="text-base-content text-center text-lg">
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
      </Container>
    </PageSection>
  );
}
