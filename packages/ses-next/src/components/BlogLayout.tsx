import React from 'react';
import { BlogMenu } from '@/components/BlogMenu';
import { BlogSidebar } from '@/components/BlogSidebar';
import { BlogFilterMobile } from '@/components/BlogFilterMobile';
import type { TagWithCount } from '@/lib/blogUtils';

interface BlogLayoutProps {
  tagsWithCount: TagWithCount[];
  totalPosts: number;
  children: React.ReactNode;
}

export const BlogLayout = ({ tagsWithCount, totalPosts, children }: BlogLayoutProps) => {
  return (
    <div className="container mx-auto mt-6 mb-12 px-4">
      <BlogMenu />
      <div className="mt-6 flex gap-8">
        <main className="min-w-0 flex-1">
          <BlogFilterMobile tagsWithCount={tagsWithCount} totalPosts={totalPosts} />
          {children}
        </main>
        <BlogSidebar tagsWithCount={tagsWithCount} totalPosts={totalPosts} />
      </div>
    </div>
  );
};
