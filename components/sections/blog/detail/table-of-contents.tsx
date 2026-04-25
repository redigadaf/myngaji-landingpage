"use client";

import React, { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Facebook, Twitter, Link as LinkIcon } from "lucide-react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items?: TOCItem[];
}

export function TableOfContents({ items = [] }: TableOfContentsProps) {
  const [dynamicHeadings, setDynamicHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const activeIdRef = React.useRef("");
  const isClickScrollingRef = React.useRef(false);

  // Scraper to automatically build TOC from the article body if database is empty
  useEffect(() => {
    const scrapeHeadings = () => {
      const article = document.querySelector(".tiptap-content");
      if (!article) return;

      // Only search for H2 to keep the sidebar clean as requested
      // Also ignore any H2 that's been demoted to a sub-section or is a conclusion
      const found = Array.from(article.querySelectorAll("h2:not(.is-sub-section):not(.is-conclusion)")).map((h) => {
        // Use innerText to avoid including prepended badges/spans if they exist
        const text = (h as HTMLElement).innerText || "";
        const slug = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/^-+|-+$/g, "");
        if (!h.id) h.id = slug;
        
        return {
          id: h.id,
          title: text,
          level: 2
        };
      });

      if (found.length > 0 && JSON.stringify(found) !== JSON.stringify(dynamicHeadings)) {
        setDynamicHeadings(found);
      }
    };

    const interval = setInterval(scrapeHeadings, 2000);
    scrapeHeadings();
    return () => clearInterval(interval);
  }, [dynamicHeadings]);

  // Priority: Scraped Dynamic Items > Prop Items > Static Initial Fallback
  const headings = useMemo<TOCItem[]>(() => {
    const filterHeadings = (list: TOCItem[]) => 
      list.filter(item => !["kesimpulan", "penutup"].some(k => item.title.toLowerCase().includes(k)));

    // We prefer dynamicHeadings because they reflect the "Auto-healing" logic
    // (demoted sub-sections, conclusions, etc.) applied by ArticleContent.
    if (dynamicHeadings.length > 0) return dynamicHeadings;
    
    if (items && items.length > 0) return filterHeadings(items);
    
    const fallback = [
      { id: "gunakan-teknik-5-5-5", title: "Gunakan Teknik 5-5-5", level: 2 },
      { id: "dengarkan-murattal-sepanjang-hari", title: "Dengarkan Murattal Sepanjang Hari", level: 2 },
      { id: "fahami-makna-ayat", title: "Fahami Makna Ayat", level: 2 },
      { id: "lakukan-murojaah", title: "Lakukan Murojaah", level: 2 },
      { id: "tetapkan-target", title: "Tetapkan Target", level: 2 },
    ];
    
    return fallback;
  }, [items, dynamicHeadings]);

  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      const article = document.querySelector(".tiptap-content");
      if (!article) return;

      const allHeadings = Array.from(article.querySelectorAll("h2, h3"));
      const triggerOffset = 130; 
      
      let discoveredId = activeIdRef.current;

      allHeadings.forEach((h) => {
        const rect = h.getBoundingClientRect();
        if (rect.top <= triggerOffset) {
          // Ultra-Fuzzy Normalization: lower case, remove spaces, remove special chars
          const normalize = (text: string) => text.toLowerCase().replace(/[^\w]/g, "").trim();
          
          const headingText = normalize(h.textContent || "");
          const match = headings.find(item => 
            item.id === h.id || 
            normalize(item.title) === headingText ||
            headingText.includes(normalize(item.title))
          );
          
          if (match) discoveredId = match.id;
        }
      });

      if (discoveredId && discoveredId !== activeIdRef.current) {
        activeIdRef.current = discoveredId;
        setActiveId(discoveredId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const timers = [setTimeout(handleScroll, 200), setTimeout(handleScroll, 1000), setTimeout(handleScroll, 3000)];

    return () => {
      window.removeEventListener("scroll", handleScroll);
      timers.forEach(clearTimeout);
    };
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, title: string) => {
    e.preventDefault();
    
    // 1. Find the element by ID or Text (Title-First)
    const article = document.querySelector(".tiptap-content");
    if (!article) return;

    const allHeadings = Array.from(article.querySelectorAll("h2, h3"));
    const element = allHeadings.find(h => 
      h.id === id || h.textContent?.trim().toLowerCase() === title.trim().toLowerCase()
    ) as HTMLElement;

    if (element) {
      isClickScrollingRef.current = true;
      
      const realId = element.id || id;
      setActiveId(id); // Keep the Menu ID highlighting for UI consistency
      activeIdRef.current = id;
      
      const headerOffset = 120;
      const top = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({ top, behavior: "smooth" });
      window.history.pushState(null, "", `#${realId}`);

      setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 1200);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-lg">Kandungan Artikel</h3>
        <nav className="flex flex-col space-y-1">
          {headings.map((heading) => {
            // Clean title from manual numbers like "1. " or "2. " for a clean sidebar
            const cleanTitle = heading.title.replace(/^\d+[\.\s]+/, "");
            
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id, heading.title)}
                className={cn(
                  "group flex items-center justify-between rounded-xl px-4 py-2.5 text-sm transition-all duration-300 relative",
                  activeId === heading.id
                    ? "bg-primary text-white font-bold shadow-md shadow-[#17838F]/20 dark:shadow-none translate-x-2"
                    : "text-gray-600 hover:bg-[#17838F]/10 hover:text-primary dark:text-gray-400 dark:hover:bg-[#17838F]/20"
                )}
              >
                <span className="relative z-10 truncate">{cleanTitle}</span>
                
                {activeId === heading.id && (
                  <div className="h-1.5 w-1.5 rounded-full bg-white shrink-0 ml-auto animate-pulse" />
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-slate-900 text-white rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#17838F]/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <h3 className="font-bold text-lg mb-2">Langgan Newsletter</h3>
          <p className="text-slate-300 text-sm mb-4">Dapatkan artikel, tips mengaji, dan panduan terkini terus ke inbox anda.</p>
          <div className="space-y-3">
            <input type="email" placeholder="Alamat Emel" className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#17838F] placeholder:text-slate-500" />
            <button className="w-full bg-[#17838F] hover:bg-[#17838F]/90 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">Langgan Sekarang</button>
          </div>
        </div>
      </div>
    </div>
  );
}
