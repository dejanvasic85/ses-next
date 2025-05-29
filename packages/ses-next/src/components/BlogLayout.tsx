import React from 'react';
import { BlogMenu } from './BlogMenu';

interface BlogLayoutProps {
  tags: string[];
  children: React.ReactNode;
}

export const BlogLayout = ({ tags, children }: BlogLayoutProps) => {
  return (
    <div className="flex min-h-[50vh] w-full lg:w-3/5 flex-col mt-6 gap-6 container mx-auto mb-12">
      <section>
        <BlogMenu tags={tags} />
      </section>
      {children}
    </div>
  );
};
