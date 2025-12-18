export const getSlug = (slug: string) => {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9\u0600-\u06FF\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^-|-$/g, "");
};
