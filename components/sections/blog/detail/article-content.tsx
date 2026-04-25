"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { BLOG_CONFIG } from "@/lib/blog-config";

interface ArticleContentProps {
  content?: string;
  subTopicKeywords?: string[];
}

export function ArticleContent({ 
  content, 
  subTopicKeywords = BLOG_CONFIG.SUB_TOPIC_KEYWORDS,
}: ArticleContentProps) {
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!articleRef.current || !content) return;
    // Find all headings and FORCE them to have matching IDs for the TOC
    const rawHeadings = articleRef.current.querySelectorAll("h2, h3");
    let sectionCounter = 1;
    
    interface NavigableHeading extends HTMLElement {
      _isDemoted?: boolean;
    }
    
    rawHeadings.forEach((heading) => {
      const h = heading as NavigableHeading;
      const text = h.innerText || "";
      
      // AUTO-HEALING: If an H2 title is contextually a sub-section (e.g., contains specific sub-topics)
      // or if it doesn't fit the main numbered sequence, demote it to H3 for a clean TOC.
      const isSubSection = h.tagName.toLowerCase() === "h2" && 
                          subTopicKeywords.some(topic => text.toLowerCase().includes(topic));

      if (isSubSection) {
        // Demote to H3 visually and for the TOC scraper
        h._isDemoted = true;
      }

      // Strip any existing badge or numbers first to avoid duplicates
      h.querySelector(".num-badge")?.remove();
      const pureText = text.replace(/^\d+[\.\s]+/, "").trim();
      
      const slug = pureText
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, "");
      
      h.id = slug;
      h.textContent = pureText;

      if (h.tagName.toLowerCase() === "h2" && !h._isDemoted) {
        // Inject REAL Badge for H2
        const badge = document.createElement("span");
        badge.className = "num-badge inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#17838F]/10 text-[#17838F] text-sm font-bold mr-4 shrink-0 transition-all duration-300";
        badge.textContent = sectionCounter.toString();
        h.prepend(badge);
        sectionCounter++;
      } else {
        // Style as H3 (Sub-heading accent)
        h.classList.add("is-sub-section");
      }
    });
  }, [content, subTopicKeywords]);

  if (!content || content.trim() === "") {
    return (
      <div className="py-20 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
        <p className="text-gray-500 italic">Konten artikel belum tersedia.</p>
      </div>
    );
  }

  return (
    <article 
      ref={articleRef}
      className={cn(
        "prose prose-lg md:prose-xl prose-emerald dark:prose-invert max-w-none",
        "tiptap-content",
        // Automatic Numbered Headings (Premium Modern Look)
        "prose-h2:flex prose-h2:items-center",
        // Sub-headings (H3) Premium Accent
        "prose-h3:border-l-4 prose-h3:border-primary prose-h3:pl-4 prose-h3:py-1 prose-h3:text-gray-800 dark:prose-h3:text-gray-200",
        // Scroll Margin for Sticky Headers
        "prose-h2:scroll-mt-28 prose-h3:scroll-mt-28",
        // General Styles
        "prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white",
        "prose-p:leading-relaxed prose-p:text-gray-600 dark:prose-p:text-gray-300",
        "prose-img:rounded-3xl prose-img:shadow-xl prose-img:mx-auto prose-img:max-h-[550px] prose-img:w-auto prose-img:border-4 prose-img:border-primary/10",
        "prose-blockquote:border-[#17838F] prose-blockquote:bg-[#17838F]/5 dark:prose-blockquote:bg-[#17838F]/10 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg",
        "prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold",
        "prose-ul:list-disc prose-ol:list-decimal"
      )}
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
}
