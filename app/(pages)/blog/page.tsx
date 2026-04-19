"use client";

import { useState } from "react";
import { BlogHero } from "@/components/sections/blog/blog-hero";
import { FeaturedArticle } from "@/components/sections/blog/featured-article";
import { BlogCategoryFilter } from "@/components/sections/blog/blog-category-filter";
import { BlogList } from "@/components/sections/blog/blog-list";
import { BlogSidebar } from "@/components/sections/blog/blog-sidebar";
import { BlogPagination } from "@/components/sections/blog/blog-pagination";
import { BlogArticle } from "@/components/sections/blog/blog-card";
import blogData from "@/components/sections/data/blog-articles.json";

// Extract categories and counts from data
const getCategories = (articles: BlogArticle[]) => {
  const counts: Record<string, number> = {};
  articles.forEach((article) => {
    counts[article.category] = (counts[article.category] || 0) + 1;
  });

  const categories = [{ name: "Semua", count: articles.length }, ...Object.entries(counts).map(([name, count]) => ({ name, count }))];

  return categories;
};

export default function BlogPage() {
  const [allArticles, setAllArticles] = useState<BlogArticle[]>(blogData as BlogArticle[]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter Logic
  const filteredArticles = allArticles.filter((article) => {
    const matchesCategory = activeCategory === "Semua" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured Article
  const featuredArticle = allArticles.find((a) => a.featured) || allArticles[0];

  const displayArticles = filteredArticles;

  // Pagination Logic
  const totalPages = Math.ceil(displayArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = displayArticles.slice(startIndex, startIndex + itemsPerPage);

  // Popular articles for sidebar
  const popularArticles = allArticles.slice(0, 5);

  const categories = getCategories(allArticles);
  const categoryNames = categories.map((c) => c.name);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <BlogHero onSearch={setSearchQuery} />

      {isLoading ? (
        <div className="flex justify-center items-center py-20 min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {featuredArticle && <FeaturedArticle article={featuredArticle} />}

          <BlogCategoryFilter
            categories={categoryNames}
            activeCategory={activeCategory}
            onCategoryChange={(cat) => {
              setActiveCategory(cat);
              setCurrentPage(1); // Reset to page 1 on filter change
            }}
          />

          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col gap-12 lg:flex-row">
              {/* Main Content */}
              <div className="flex-1">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-primary dark:text-white">{activeCategory === "Semua" ? "Artikel Terkini" : `Artikel: ${activeCategory}`}</h2>
                  <span className="text-sm text-gray-500">
                    Menunjukkan {paginatedArticles.length} daripada {displayArticles.length} artikel
                  </span>
                </div>

                {/* Passing key forces the component to remount and re-trigger animations when data changes */}
                {paginatedArticles.length > 0 ? (
                  <>
                    <BlogList key={`${activeCategory}-${searchQuery}-${currentPage}`} articles={paginatedArticles} />
                    {displayArticles.length > itemsPerPage && <BlogPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    Tiada artikel dijumpai. Cuba carian atau kategori lain.
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <BlogSidebar popularArticles={popularArticles} categories={categories} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
