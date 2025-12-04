import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { TagWithCount } from '@/lib/blogUtils';

interface BlogSidebarProps {
  tagsWithCount: TagWithCount[];
  totalPosts: number;
}

export const BlogSidebar = ({ tagsWithCount, totalPosts }: BlogSidebarProps) => {
  const router = useRouter();
  const currentTag = router.query.tag as string | undefined;
  const isAllPosts = router.pathname === '/blog' && !currentTag;

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
                  href={`/blog/tag/${name}`}
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
