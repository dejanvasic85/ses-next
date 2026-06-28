import { sanityClient } from '@/sanity/lib/client';
import { type BlogPost, type BlogPostContentModel, BlogPostSchema } from '@/types';
import { mapBlogPost } from '@/lib/content/mappers';
import { allBlogPostsQuery, blogPostBySlugQuery } from '@/lib/content/queries';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const result = await sanityClient.fetch(allBlogPostsQuery, {}, { next: { tags: ['blog-post'] } });
    return result.map((post: unknown) => BlogPostSchema.parse(post)).map(mapBlogPost);
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    throw new Error('Failed to fetch blog posts');
  }
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPostContentModel | null> => {
  try {
    const result = await sanityClient.fetch(blogPostBySlugQuery, { slug }, { next: { tags: ['blog-post'] } });
    if (!result) return null;
    return BlogPostSchema.parse(result);
  } catch (error) {
    console.error('Error in getBlogPostBySlug:', error);
    throw new Error('Failed to fetch blog post');
  }
};
