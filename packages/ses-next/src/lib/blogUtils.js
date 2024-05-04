export const tagsFromBlogs = (blogPosts = []) => {
  const tagSet = [];
  blogPosts
    .flatMap(({ tags }) => tags)
    .forEach((tag) => {
      if (!tagSet.includes(tag)) {
        tagSet.push(tag);
      }
    });
  return tagSet;
};
