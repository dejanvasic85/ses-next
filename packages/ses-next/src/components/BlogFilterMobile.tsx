'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { TagWithCount } from '@/lib/blogUtils';

interface BlogFilterMobileProps {
  tagsWithCount: TagWithCount[];
  totalPosts: number;
}

export const BlogFilterMobile = ({ tagsWithCount, totalPosts }: BlogFilterMobileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentTag = router.query.tag as string | undefined;
  const isAllPosts = router.pathname === '/blog' && !currentTag;

  const getCurrentLabel = () => {
    if (isAllPosts) return 'All Posts';
    if (currentTag) return currentTag.replace(/-/g, ' ');
    return 'Filter';
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden mb-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-outline btn-sm w-full justify-between"
        aria-expanded={isOpen}
        aria-controls="mobile-filter-menu"
      >
        <span className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
          <span className="capitalize">{getCurrentLabel()}</span>
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <nav id="mobile-filter-menu" className="mt-2 bg-base-200 rounded-box p-2" aria-label="Blog categories">
          <ul className="menu menu-sm p-0 gap-1">
            <li>
              <Link
                href="/blog"
                onClick={handleLinkClick}
                className={`flex justify-between ${isAllPosts ? 'active' : ''}`}
              >
                <span>All Posts</span>
                <span className="badge badge-sm badge-ghost">{totalPosts}</span>
              </Link>
            </li>
            {tagsWithCount.map(({ name, count }) => (
              <li key={name}>
                <Link
                  href={`/blog/tag/${name}`}
                  onClick={handleLinkClick}
                  className={`flex justify-between ${currentTag === name ? 'active' : ''}`}
                >
                  <span className="capitalize">{name.replace(/-/g, ' ')}</span>
                  <span className="badge badge-sm badge-ghost">{count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};
