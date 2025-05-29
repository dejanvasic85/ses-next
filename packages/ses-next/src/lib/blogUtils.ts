interface BlogPost {
  tags: string[];
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
