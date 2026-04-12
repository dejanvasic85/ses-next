'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import type { TagWithCount } from '@/lib/blogUtils';

interface BlogSidebarProps {
  tagsWithCount: TagWithCount[];
  totalPosts: number;
}

export const BlogSidebar = ({ tagsWithCount, totalPosts }: BlogSidebarProps) => {
  const params = useParams();
  const pathname = usePathname();
  const rawTag = params?.tag;
  const currentTag = typeof rawTag === 'string' ? rawTag : undefined;
  const isAllPosts = pathname === '/blog' && !currentTag;

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-24">
        <nav aria-label="Blog categories">
          <h2 className="text-base-content mb-4 font-semibold">Categories</h2>
          <ul className="menu menu-sm rounded-box bg-base-100 gap-1 p-0">
            <li>
              <Link href="/blog" className={`flex justify-between ${isAllPosts ? 'active' : ''}`}>
                <span>All Posts</span>
                <span className="badge badge-ghost badge-sm">{totalPosts}</span>
              </Link>
            </li>
            {tagsWithCount.map(({ name, count }) => (
              <li key={name}>
                <Link
                  href={`/blog/tag/${encodeURIComponent(name)}`}
                  className={`flex justify-between ${currentTag === name ? 'active' : ''}`}
                >
                  <span className="capitalize">{name.replace(/-/g, ' ')}</span>
                  <span className="badge badge-ghost badge-sm">{count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
