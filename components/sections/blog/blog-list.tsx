"use client";

import { motion } from "framer-motion";
import { BlogCard, BlogArticle } from "./blog-card";

interface BlogListProps {
  articles: BlogArticle[];
}

export function BlogList({ articles }: BlogListProps) {
  if (articles.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-gray-500">Tiada artikel dijumpai untuk carian ini.</p>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <motion.div key={article.id} variants={item}>
          <BlogCard article={article} />
        </motion.div>
      ))}
    </motion.div>
  );
}
