
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

interface ArticleStats {
  id: string;
  title: string;
  views: number;
}

export function TopArticles() {
  const [topArticles, setTopArticles] = useState<ArticleStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopArticles() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, view_count')
          .order('view_count', { ascending: false })
          .limit(5);

        if (error) throw error;

        if (data) {
          interface ArticleData {
            id: string;
            title: string;
            view_count: number | null;
          }
          setTopArticles((data as unknown as ArticleData[]).map(p => ({
            id: p.id,
            title: p.title,
            views: p.view_count || 0
          })));
        }
      } catch (error) {
        console.error("Error fetching top articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopArticles();
  }, []);

  const maxViews = topArticles.length > 0 ? Math.max(...topArticles.map(a => a.views)) : 1;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">Top 5 Artikel</h3>
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">Views</span>
      </div>

      <div className="flex-1 space-y-7">
        {loading ? (
          <div className="h-full flex items-center justify-center min-h-[200px]">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : topArticles.length > 0 ? (
          topArticles.map((article, index) => (
            <div key={article.id} className="flex items-center gap-4">
              {/* Rank Number */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-black flex-shrink-0
                ${index < 3 
                  ? "bg-primary text-white shadow-md shadow-primary/20" 
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"}`}
              >
                {index + 1}
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-gray-700 dark:text-gray-200 truncate pr-2" title={article.title}>
                  {article.title}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-[80px] h-2 bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden flex-shrink-0">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${(article.views / (maxViews || 1)) * 100}%` }}
                />
              </div>

              {/* View Count */}
              <span className="text-[15px] font-black text-gray-900 dark:text-gray-100 w-6 text-right">
                {article.views}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-sm mt-10">Tiada data tontonan</p>
        )}
      </div>
    </div>
  );
}

