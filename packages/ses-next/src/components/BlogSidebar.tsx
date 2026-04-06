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
  const params = useParams<{ tag?: string | string[] }>();
  const pathname = usePathname();
  const rawTag = params?.tag;
  const currentTag = typeof rawTag === 'string' ? rawTag : undefined;
  const isAllPosts = pathname === '/blog' && !currentTag;

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24">
        <nav aria-label="Blog categories">
          <h2 className="font-semibold text-base-content mb-4">Categories</h2>
          <ul className="menu menu-sm bg-base-100 rounded-box p-0 gap-1">
            <li>
              <Link href="/blog" className={`flex justify-between ${isAllPosts ? 'active' : ''}`}>
                <span>All Posts</span>
                <span className="badge badge-sm badge-ghost">{totalPosts}</span>
              </Link>
            </li>
            {tagsWithCount.map(({ name, count }) => (
              <li key={name}>
                <Link
                  href={`/blog/tag/${encodeURIComponent(name)}`}
                  className={`flex justify-between ${currentTag === name ? 'active' : ''}`}
                >
                  <span className="capitalize">{name.replace(/-/g, ' ')}</span>
                  <span className="badge badge-sm badge-ghost">{count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
