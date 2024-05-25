import { BlogMenu } from './BlogMenu';

export const BlogLayout = ({ tags, children }) => {
  return (
    <div className="flex min-h-[50vh] w-full flex-col mt-6 justify-center gap-6 lg:flex-row container mx-auto">
      <section className="max-w-lg max-lg:mx-auto max-lg:w-full">
        <BlogMenu tags={tags} />
      </section>
      {children}
    </div>
  );
};
