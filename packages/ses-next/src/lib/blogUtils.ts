interface BlogPost {
  tags: string[];
}

export interface TagWithCount {
  name: string;
  count: number;
}

export const tagsFromBlogs = (blogPosts: BlogPost[] = []): string[] => {
  const tagSet: string[] = [];
  blogPosts
    .flatMap(({ tags }) => tags)
    .forEach((tag) => {
      if (!tagSet.includes(tag)) {
        tagSet.push(tag);
      }
    });
  return tagSet;
};

export const tagsWithCountFromBlogs = (blogPosts: BlogPost[] = []): TagWithCount[] => {
  const tagCounts = new Map<string, number>();

  blogPosts
    .flatMap(({ tags }) => tags)
    .forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });

  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};
