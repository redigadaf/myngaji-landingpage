"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { supabase } from "@/lib/supabase/client";
import { Article } from "./article-list/types";
import { Toolbar } from "./article-list/Toolbar";
import { ListView } from "./article-list/ListView";
import { GridView } from "./article-list/GridView";
import { EmptyState } from "./article-list/EmptyState";



export function ArticleList() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [selectedAuthor, setSelectedAuthor] = useState("Semua Penulis");
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Close filter on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenFilter(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    async function fetchBlogs() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          status,
          created_at,
          published_at,
          is_featured,
          is_pinned,
          view_count,
          media_assets ( url ),
          blog_categories ( name ),
          teachers ( image_url, accounts ( full_name ) )
        `)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (data) {
        // Handle TS strict no-explicit-any
        interface RawBlogData {
          id: string;
          title: string;
          slug: string;
          status: string;
          published_at: string | null;
          created_at: string;
          excerpt: string | null;
          is_featured: boolean;
          is_pinned: boolean;
          view_count: number | null;
          blog_categories: { name: string } | null;
          teachers: { image_url: string | null; accounts: { full_name: string } | null } | null;
          media_assets: { url: string } | null;
        }

        const mapped: Article[] = (data as unknown as RawBlogData[]).map((b) => ({
          id: b.id,
          slug: b.slug,
          title: b.title,
          category: b.blog_categories?.name || "Uncategorized",
          author: b.teachers?.accounts?.full_name || "Admin",
          avatar: b.teachers?.image_url || "/assets/ustaz-dafli.jpg",
          status: b.status.charAt(0).toUpperCase() + b.status.slice(1).toLowerCase(),
          views: b.view_count || 0,
          published: new Date(b.published_at || b.created_at).toLocaleDateString("ms-MY"),
          image: b.media_assets?.url || "/assets/placeholders/blog3.jpg",
          excerpt: b.excerpt || "Tiada ringkasan",
          featured: b.is_featured || false,
          pinned: b.is_pinned || false
        }));
        setBlogs(mapped);
      } else if (error) {
        console.error("Error fetching blogs:", error);
        setFetchError(error.message || JSON.stringify(error));
      }
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedStatus("Semua Status");
    setSelectedCategory("Semua Kategori");
    setSelectedAuthor("Semua Penulis");
    setOpenFilter(null);
    setCurrentPage(1);
  };

  const categoriesList = useMemo(() => ["Semua Kategori", ...Array.from(new Set(blogs.map(b => b.category)))], [blogs]);
  const authorsList = useMemo(() => ["Semua Penulis", ...Array.from(new Set(blogs.map(b => b.author)))], [blogs]);
  const statusesList = ["Semua Status", "Published", "Draft", "Scheduled"];

  const filteredArticles = useMemo(() => {
    return blogs
      .filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === "Semua Status" || blog.status === selectedStatus;
        const matchesCategory = selectedCategory === "Semua Kategori" || blog.category === selectedCategory;
        const matchesAuthor = selectedAuthor === "Semua Penulis" || blog.author === selectedAuthor;
        
        return matchesSearch && matchesStatus && matchesCategory && matchesAuthor;
      });
  }, [blogs, searchQuery, selectedStatus, selectedCategory, selectedAuthor]);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);



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
          searchQuery={searchQuery} 
          setSearchQuery={(val) => { setSearchQuery(val); setCurrentPage(1); }}
          selectedStatus={selectedStatus} 
          setSelectedStatus={(val) => { setSelectedStatus(val); setCurrentPage(1); }}
          selectedCategory={selectedCategory} 
          setSelectedCategory={(val) => { setSelectedCategory(val); setCurrentPage(1); }}
          selectedAuthor={selectedAuthor} 
          setSelectedAuthor={(val) => { setSelectedAuthor(val); setCurrentPage(1); }}
          viewMode={viewMode} setViewMode={setViewMode}
          openFilter={openFilter} setOpenFilter={setOpenFilter}
          categoriesList={categoriesList} authorsList={authorsList} statusesList={statusesList}
        />

        <div className="w-full relative min-h-[300px]">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white/50 dark:bg-gray-900/50 rounded-2xl">
              <div className="w-12 h-12 border-4 border-[#17838F]/20 border-t-[#17838F] rounded-full animate-spin mb-4" />
              <p className="text-[14px] text-gray-500 font-bold ml-1">Mengambil artikel...</p>
            </div>
          ) : fetchError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <p className="text-red-500 font-bold mb-2">Supabase Error:</p>
              <code className="text-sm bg-red-50 dark:bg-red-900/20 text-red-600 block p-4 rounded-lg max-w-lg mx-auto">
                {fetchError}
              </code>
            </div>
          ) : paginatedArticles.length > 0 ? (
            viewMode === "list" ? (
              <ListView articles={paginatedArticles} />
            ) : (
              <GridView articles={paginatedArticles} />
            )
          ) : (
            <EmptyState resetFilters={resetFilters} />
          )}
        </div>

        {/* Pagination Section */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-50 dark:border-gray-800 px-6">
          <p className="text-[13px] font-medium text-gray-400">
            Menunjukkan <span className="text-gray-700 dark:text-gray-200 font-bold">
              {filteredArticles.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} hingga {Math.min(currentPage * itemsPerPage, filteredArticles.length)}
            </span> daripada <span className="text-gray-700 dark:text-gray-200 font-bold">{filteredArticles.length} artikel</span>
          </p>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className={`h-9 rounded-xl border-gray-200 dark:border-gray-800 text-[13px] font-bold 
                ${currentPage === 1 ? "text-gray-300 opacity-50" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
            >
              Sebelumnya
            </Button>
            
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary text-white font-bold text-[13px] shadow-sm shadow-primary/20">
                {currentPage}
              </button>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className={`h-9 rounded-xl border-gray-200 dark:border-gray-800 text-[13px] font-bold
                ${currentPage >= totalPages ? "text-gray-300 opacity-50" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
            >
              Seterusnya
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
