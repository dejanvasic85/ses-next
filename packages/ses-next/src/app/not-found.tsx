import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Page not found</h1>
          <Image src="/not-found.jpg" alt="404 - Not Found" width={600} height={400} className="mx-auto" />
          <p className="text-center text-gray-800 text-lg">
            The page you are looking for does not exist or has been moved. Please check the URL or return to the{' '}
            <Link href="/" className="link">
              homepage.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
