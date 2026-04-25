import { useState, useEffect } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
import { RelatedArticlePicker, type Article } from "./RelatedArticlePicker";

interface RelatedArticlesSectionProps {
  value: string[];
  onChange: (val: string[]) => void;
  excludeId?: string;
}

export function RelatedArticlesSection({ value, onChange, excludeId }: RelatedArticlesSectionProps) {
  const [selectedArticles, setSelectedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Sync selected articles data when value (IDs) change
  useEffect(() => {
    const fetchSelectedData = async () => {
      if (value.length === 0) {
        setSelectedArticles([]);
        return;
      }
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
        .in("id", value);
      
      if (data) {
        const transformed: Article[] = data.map(d => ({
          id: d.id,
          title: d.title || "Untitled",
          slug: d.slug || "",
          readingTime: d.reading_time || "5 min",
          excerpt: d.excerpt || "",
          image: (d.media_assets as unknown as { url: string } | null)?.url || ""
        }));
        
        // Reorder to match the value array order
        const ordered = value
          .map(id => transformed.find(a => a.id === id))
          .filter(Boolean) as Article[];
          
        setSelectedArticles(ordered);
      }
      setIsLoading(false);
    };
    fetchSelectedData();
  }, [value]);

  const addArticle = (article: Article) => {
    const newValue = [...value, article.id];
    onChange(newValue);
  };

  const removeArticle = (id: string) => {
    const newValue = value.filter((v: string) => v !== id);
    onChange(newValue);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[24px] p-8 shadow-sm font-sans">
      <div className="space-y-4">
        <Label className="text-[16px] font-semibold uppercase text-gray-400 tracking-[0.1em]">Related Articles</Label>
        
        {/* Selected List */}
        <div className="space-y-2">
          {selectedArticles.map((article) => (
            <div 
              key={article.id} 
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 group transition-all"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                <Image 
                  src={article.image || "/assets/placeholders/blog1.jpg"} 
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate text-gray-900 dark:text-white">{article.title}</p>
                <p className="text-xs text-gray-400 truncate">/{article.slug}</p>
              </div>
              <button 
                onClick={() => removeArticle(article.id)}
                className="p-2 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors text-gray-400"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {isLoading && value.length > 0 && selectedArticles.length === 0 && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="animate-spin text-primary" size={20} />
            </div>
          )}
        </div>

        {/* Picker Button - Dashed UI from Screenshot */}
        <button
          onClick={() => setIsPickerOpen(true)}
          className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl flex items-center justify-center gap-2 text-primary/70 hover:text-primary hover:border-primary hover:bg-primary/[0.02] transition-all group"
        >
          <Plus size={18} className="group-hover:scale-110 transition-transform" />
          <span className="text-[14px] font-medium tracking-wide">Add Related Article</span>
        </button>
        
        {value.length === 0 && (
          <p className="text-[12px] text-gray-400 italic text-center py-1">Tiada artikel berkaitan dipilih.</p>
        )}

        {/* Picker Modal Component */}
        <RelatedArticlePicker 
          isOpen={isPickerOpen}
          onClose={() => setIsPickerOpen(false)}
          onSelect={(article) => {
            addArticle(article);
            setIsPickerOpen(false);
          }}
          selectedIds={value}
          excludeId={excludeId}
        />
      </div>
    </div>
  );
}
