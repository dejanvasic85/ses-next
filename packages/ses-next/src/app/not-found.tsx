import Image from 'next/image';
import Link from 'next/link';

import { Container, PageSection } from '@/components';

export default function NotFound() {
  return (
    <PageSection>
      <Container width="standard">
        <div className="mb-10 md:mb-16">
          <h1 className="text-base-content mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">Page not found</h1>
          <Image src="/not-found.jpg" alt="404 - Not Found" width={600} height={400} className="mx-auto" />
          <p className="text-base-content text-center text-lg">
            The page you are looking for does not exist or has been moved. Please check the URL or return to the{' '}
            <Link href="/" className="link">
              homepage.
            </Link>
          </p>
        </div>
      </Container>
    </PageSection>
  );
}
