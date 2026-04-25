import { useState, useEffect } from "react";
import { X, Search, Loader2, FileText } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
import { createPortal } from "react-dom";

export interface Article {
  id: string;
  title: string;
  slug: string;
  image: string;
  readingTime: string;
  excerpt: string;
}

interface RelatedArticlePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (article: Article) => void;
  selectedIds: string[];
  excludeId?: string;
}

export function RelatedArticlePicker({ 
  isOpen, 
  onClose, 
  onSelect, 
  selectedIds, 
  excludeId 
}: RelatedArticlePickerProps) {
  const [search, setSearch] = useState("");
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchArticles = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from("blog_posts")
        .select(`
          id, 
          title, 
          slug, 
          reading_time, 
          excerpt,
          media_assets ( url )
        `)
        .eq("status", "published")
        .order("created_at", { ascending: false });
      
      if (data) {
        const transformed: Article[] = data.map(d => ({
          id: d.id,
          title: d.title || "Untitled",
          slug: d.slug || "",
          readingTime: d.reading_time || "5 min",
          excerpt: d.excerpt || "",
          image: (d.media_assets as unknown as { url: string } | null)?.url || ""
        }));
        setAllArticles(transformed);
      }
      setIsLoading(false);
    };
    fetchArticles();
  }, [isOpen]);

  const filteredResults = allArticles.filter(a => 
    a.id !== excludeId && 
    !selectedIds.includes(a.id) &&
    (search === "" || a.title.toLowerCase().includes(search.toLowerCase()))
  );

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 fade-in duration-300">
        {/* Header */}
        <div className="p-8 pb-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Add Related Article</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-500 text-sm mb-6">Search and select an article to link.</p>
          
          {/* Search Box */}
          <div className="relative mb-6">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              autoFocus
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-14 pr-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-[15px]"
            />
          </div>
        </div>

        {/* Articles List */}
        <div className="flex-1 overflow-y-auto px-6 pb-8 custom-scrollbar">
          <div className="space-y-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 size={40} className="text-primary animate-spin" />
                <p className="text-gray-400 text-sm font-medium">Mengambil artikel...</p>
              </div>
            ) : filteredResults.length > 0 ? (
              filteredResults.map((article) => (
                <button
                  key={article.id}
                  onClick={() => {
                    onSelect(article);
                    setSearch("");
                  }}
                  className="w-full flex items-center gap-5 p-4 rounded-[22px] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group text-left"
                >
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <Image 
                      src={article.image || "/assets/placeholders/blog1.jpg"} 
                      alt={article.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[15px] font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    {article.excerpt && (
                      <p className="text-[12px] text-gray-500 line-clamp-2 mb-1 leading-relaxed opacity-80">
                        {article.excerpt}
                      </p>
                    )}
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                      {article.readingTime} read
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="py-20 text-center">
                <div className="bg-gray-50 dark:bg-gray-800 w-16 h-16 rounded-[24px] flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <FileText size={28} />
                </div>
                <p className="text-gray-500 font-bold mb-1">Tiada artikel dijumpai</p>
                <p className="text-xs text-gray-400">Cuba tapis dengan kata kunci lain.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
