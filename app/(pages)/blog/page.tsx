"use client";

import { useState, useEffect } from "react";
import { BlogHero } from "@/components/sections/blog/blog-hero";
import { FeaturedArticle } from "@/components/sections/blog/featured-article";
import { BlogCategoryFilter } from "@/components/sections/blog/blog-category-filter";
import { BlogList } from "@/components/sections/blog/blog-list";
import { BlogSidebar } from "@/components/sections/blog/blog-sidebar";
import { BlogPagination } from "@/components/sections/blog/blog-pagination";
import { BlogArticle } from "@/components/sections/blog/blog-card";
import { supabase } from "@/lib/supabase/client";

/**
 * Safely gets the first item from a potential array or single object returned by Supabase joins.
 */
function getFirst<T>(item: T | T[] | null | undefined): T | null {
  if (!item) return null;
  return Array.isArray(item) ? (item[0] || null) : item;
}

export default function BlogPage() {
  const [allArticles, setAllArticles] = useState<BlogArticle[]>([]);
  const [categories, setCategories] = useState<{name: string, count: number}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchBlogData() {
      setIsLoading(true);
      try {
        // 1. Fetch articles with relations
        const { data: posts, error } = await supabase
          .from("blog_posts")
          .select(`
            id,
            title,
            slug,
            excerpt,
            published_at,
            reading_time,
            is_featured,
            is_pinned,
            view_count,
            category:blog_categories(name),
            author:teachers(
              image_url,
              account:accounts(full_name)
            ),
            media:media_assets(url)
          `)
          .eq("status", "published")
          .order("is_pinned", { ascending: false })
          .order("published_at", { ascending: false });

        if (error) throw error;

        // Transform results to match BlogArticle interface
        const transformed: BlogArticle[] = (posts || []).map(p => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt || "",
          category: getFirst(p.category)?.name || "Umum",
          date: p.published_at || new Date().toISOString(),
          readingTime: p.reading_time || "5 min",
          image: getFirst(p.media)?.url || "",
          featured: p.is_featured || false,
          pinned: p.is_pinned || false,
          author: {
            name: getFirst(getFirst(p.author)?.account)?.full_name || "Admin",
            avatar: getFirst(p.author)?.image_url || ""
          }
        }));

        setAllArticles(transformed);

        // 2. Process Categories
        const counts: Record<string, number> = {};
        transformed.forEach((article) => {
          counts[article.category] = (counts[article.category] || 0) + 1;
        });
        const catList = [
          { name: "Semua", count: transformed.length }, 
          ...Object.entries(counts).map(([name, count]) => ({ name, count }))
        ];
        setCategories(catList);

      } catch (err) {
        console.error("Error fetching blog data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogData();
  }, []);

  // Filter Logic
  const filteredArticles = allArticles.filter((article) => {
    const matchesCategory = activeCategory === "Semua" || article.category === activeCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured Article
  const featuredArticle = allArticles.find((a) => a.featured) || allArticles[0];

  // Pagination Logic
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  // Popular articles for sidebar (sorted by views or just recent)
  const popularArticles = [...allArticles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  const categoryNames = categories.map((c) => c.name);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <BlogHero onSearch={setSearchQuery} />

      {isLoading ? (
        <div className="flex justify-center items-center py-20 min-h-[50vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-gray-500 animate-pulse">Memuatkan artikel MyNgaji...</p>
          </div>
        </div>
      ) : (
        <>
          {featuredArticle && searchQuery === "" && activeCategory === "Semua" && (
            <FeaturedArticle article={featuredArticle} />
          )}

          <BlogCategoryFilter
            categories={categoryNames}
            activeCategory={activeCategory}
            onCategoryChange={(cat) => {
              setActiveCategory(cat);
              setCurrentPage(1);
            }}
          />

          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col gap-12 lg:flex-row">
              {/* Main Content */}
              <div className="flex-1">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-primary dark:text-white">
                    {activeCategory === "Semua" ? "Artikel Terkini" : `Artikel: ${activeCategory}`}
                  </h2>
                  <span className="text-sm text-gray-500">
                    Menunjukkan {paginatedArticles.length} daripada {filteredArticles.length} artikel
                  </span>
                </div>

                {paginatedArticles.length > 0 ? (
                  <>
                    <BlogList key={`${activeCategory}-${searchQuery}-${currentPage}`} articles={paginatedArticles} />
                    {filteredArticles.length > itemsPerPage && (
                      <BlogPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    )}
                  </>
                ) : (
                  <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                    <p className="text-gray-500 text-lg">Tiada artikel dijumpai. Cuba carian atau kategori lain.</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <BlogSidebar 
                popularArticles={popularArticles} 
                categories={categories} 
                activeCategory={activeCategory}
                onCategoryChange={(cat) => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
