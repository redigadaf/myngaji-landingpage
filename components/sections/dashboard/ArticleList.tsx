"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";

import blogData from "@/components/sections/data/blog-articles.json";
import { Article } from "./article-list/types";
import { Toolbar } from "./article-list/Toolbar";
import { ListView } from "./article-list/ListView";
import { GridView } from "./article-list/GridView";
import { EmptyState } from "./article-list/EmptyState";

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readingTime: string;
  image: string;
  featured: boolean;
}

export function ArticleList() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [selectedAuthor, setSelectedAuthor] = useState("Semua Penulis");
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  // Close filter on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenFilter(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedStatus("Semua Status");
    setSelectedCategory("Semua Kategori");
    setSelectedAuthor("Semua Penulis");
    setOpenFilter(null);
  };

  const categoriesList = useMemo(() => ["Semua Kategori", ...Array.from(new Set((blogData as BlogArticle[]).map(b => b.category)))], []);
  const authorsList = useMemo(() => ["Semua Penulis", ...Array.from(new Set((blogData as BlogArticle[]).map(b => b.author.name)))], []);
  const statusesList = ["Semua Status", "Published", "Draft", "Scheduled"];

  const filteredArticles = useMemo(() => {
    return (blogData as BlogArticle[])
      .filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === "Semua Status" || "Published" === selectedStatus;
        const matchesCategory = selectedCategory === "Semua Kategori" || blog.category === selectedCategory;
        const matchesAuthor = selectedAuthor === "Semua Penulis" || blog.author.name === selectedAuthor;
        
        return matchesSearch && matchesStatus && matchesCategory && matchesAuthor;
      })
      .map((blog) => ({
        id: blog.id,
        title: blog.title,
        category: blog.category,
        author: blog.author.name,
        avatar: blog.author.avatar,
        status: "Published",
        views: (parseInt(blog.id) * 7 + 12) % 45 + 10,
        published: new Date(blog.date).toLocaleDateString('ms-MY'),
        image: blog.image,
        excerpt: blog.excerpt,
        featured: blog.featured,
        pinned: blog.featured
      })) as Article[];
  }, [searchQuery, selectedStatus, selectedCategory, selectedAuthor]);

  return (
    <div className="mt-12 space-y-6 pb-12">
      {/* Click-outside backdrop */}
      {openFilter && (
        <div className="fixed inset-0 z-[15] cursor-default" onClick={() => setOpenFilter(null)} />
      )}

      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-primary rounded-full" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Senarai Artikel</h2>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm overflow-hidden">
        <Toolbar 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor}
          viewMode={viewMode} setViewMode={setViewMode}
          openFilter={openFilter} setOpenFilter={setOpenFilter}
          categoriesList={categoriesList} authorsList={authorsList} statusesList={statusesList}
        />

        <div className="w-full">
          {filteredArticles.length > 0 ? (
            viewMode === "list" ? (
              <ListView articles={filteredArticles} />
            ) : (
              <GridView articles={filteredArticles} />
            )
          ) : (
            <EmptyState resetFilters={resetFilters} />
          )}
        </div>

        {/* Pagination Section */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-50 dark:border-gray-800 px-6">
          <p className="text-[13px] font-medium text-gray-400">
            Menunjukkan <span className="text-gray-700 dark:text-gray-200 font-bold">{filteredArticles.length === 0 ? 0 : 1} hingga {filteredArticles.length}</span> daripada <span className="text-gray-700 dark:text-gray-200 font-bold">{filteredArticles.length} artikel</span>
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled className="h-9 rounded-xl border-gray-100 dark:border-gray-800 text-[13px] font-bold text-gray-400">Sebelumnya</Button>
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary text-white font-bold text-[13px] shadow-sm shadow-primary/20">1</button>
            </div>
            <Button variant="outline" size="sm" className="h-9 rounded-xl border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-bold text-[13px] hover:bg-gray-50 dark:hover:bg-gray-800">Seterusnya</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
