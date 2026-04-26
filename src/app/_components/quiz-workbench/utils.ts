import type { ArticleRecord } from "./types";

export function findMatchingSavedArticleId(article: ArticleRecord, savedArticles: ArticleRecord[]) {
  const match = savedArticles.find(
    (saved) => saved.title === article.title && saved.content === article.content
  );

  return match?.id ?? null;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
