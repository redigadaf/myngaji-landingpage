"use client";

import { BlogCard } from "../blog-card";
import { BlogArticle } from "../blog-card";

interface ArticleRelatedProps {
  currentSlug: string;
  articles: BlogArticle[];
}

export function ArticleRelated({ currentSlug, articles }: ArticleRelatedProps) {
  // Filter out current article and take 3
  const related = articles.filter((a) => a.slug !== currentSlug).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="py-12 border-t border-gray-100 dark:border-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Artikel Berkaitan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((article) => (
          <div key={article.id} className="h-full">
            <BlogCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}
