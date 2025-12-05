import React from 'react';
import { BlogMenu } from './BlogMenu';
import { BlogSidebar } from './BlogSidebar';
import { BlogFilterMobile } from './BlogFilterMobile';
import type { TagWithCount } from '@/lib/blogUtils';

interface BlogLayoutProps {
  tagsWithCount: TagWithCount[];
  totalPosts: number;
  children: React.ReactNode;
}

export const BlogLayout = ({ tagsWithCount, totalPosts, children }: BlogLayoutProps) => {
  return (
    <div className="container mx-auto px-4 mt-6 mb-12">
      <BlogMenu />
      <div className="flex gap-8 mt-6">
        <main className="flex-1 min-w-0">
          <BlogFilterMobile tagsWithCount={tagsWithCount} totalPosts={totalPosts} />
          {children}
        </main>
        <BlogSidebar tagsWithCount={tagsWithCount} totalPosts={totalPosts} />
      </div>
    </div>
  );
};
