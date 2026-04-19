import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ArticleHeader } from "@/components/sections/blog/detail/article-header";
import { ArticleContent } from "@/components/sections/blog/detail/article-content";
import { TableOfContents } from "@/components/sections/blog/detail/table-of-contents";
import { AuthorSidebarCard, AuthorFooterCard } from "@/components/sections/blog/detail/author-card";
import { ArticleRelated } from "@/components/sections/blog/detail/article-related";
import { ArticleShareBottom } from "@/components/sections/blog/detail/article-share";
import { ArticleComments } from "@/components/sections/blog/detail/article-comment";
import { ArticleNavigation } from "@/components/sections/blog/detail/article-navigation";
import { ReadingProgress } from "@/components/sections/blog/detail/reading-progress";
import { ChevronRight, Home } from "lucide-react";
import { Metadata } from "next";

async function getArticle(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      id, title, slug, excerpt, content_html, reading_time, image_url, published_at, category_id,
      category:blog_categories(name),
      author:teachers(nama, image_url, display_role, bio)
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  const cat = Array.isArray(data.category) ? data.category[0] : data.category;
  const auth = Array.isArray(data.author) ? data.author[0] : data.author;

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    categoryId: data.category_id,
    category: cat?.name || "Uncategorized",
    excerpt: data.excerpt || "",
    content: data.content_html,
    author: {
      name: auth?.nama || "Unknown",
      avatar: auth?.image_url || "/assets/placeholder-user.jpg",
      role: auth?.display_role,
      bio: auth?.bio,
    },
    date: data.published_at,
    readingTime: data.reading_time || "5 min",
    image: data.image_url || "/assets/placeholder.jpg",
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemui | MyNgaji",
    };
  }

  return {
    title: `${article.title} | MyNgaji Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  // Find tags if implemented (fetching from DB mapping or static placeholders)
  // For now using empty or original static list as tags aren't populated yet in detail
  const tags = ["Tips", "MyNgaji", "AlQuran"];

  interface NavigationPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    image_url: string | null;
    reading_time: string | null;
    published_at: string;
    is_featured: boolean;
    category: { name: string } | { name: string }[] | null;
    author: {
      nama: string;
      image_url: string | null;
      display_role: string | null;
      bio: string | null;
    } | {
      nama: string;
      image_url: string | null;
      display_role: string | null;
      bio: string | null;
    }[] | null;
  }

  // Find prev/next articles simply by date or id, here we do a basic query
  const { data: navigationData } = await supabase
    .from("blog_posts")
    .select(`id, title, slug, excerpt, image_url, category:blog_categories(name), author:teachers(nama, image_url, display_role, bio), reading_time, published_at, is_featured`)
    .eq("status", "published")
    .order("published_at", { ascending: false });
    
  let prevArticle: { title: string; slug: string } | undefined = undefined;
  let nextArticle: { title: string; slug: string } | undefined = undefined;
  
  if (navigationData) {
    const navItems = navigationData as NavigationPost[];
    const currentIndex = navItems.findIndex((a) => a.slug === slug);
    if (currentIndex > 0) {
      const p = navItems[currentIndex - 1];
      prevArticle = {
        title: p.title, 
        slug: p.slug
      };
    }
    if (currentIndex < navItems.length - 1) {
      const n = navItems[currentIndex + 1];
      nextArticle = {
        title: n.title, 
        slug: n.slug
      };
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans">
      <ReadingProgress />

      <div className="container px-4 mx-auto max-w-7xl pt-24 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href="/blog" className="hover:text-emerald-600 transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href={`/blog?category=${article.category}`} className="hover:text-emerald-600 transition-colors">
            {article.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[200px]">{article.title}</span>
        </nav>

        <ArticleHeader title={article.title} category={article.category} author={article.author} date={article.date} readingTime={article.readingTime} image={article.image} excerpt={article.excerpt} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Main Content */}
          <main className="lg:col-span-8">
            <ArticleContent content={article.content} />

            {/* Tags */}
            <div className="flex items-center gap-3 my-8 pt-8 border-t border-gray-100 dark:border-gray-800">
              <span className="font-bold text-sm">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium cursor-pointer hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <ArticleShareBottom />

            <ArticleNavigation prev={prevArticle} next={nextArticle} />

            <ArticleComments />
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8 hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <AuthorSidebarCard author={article.author} />
              <TableOfContents />
            </div>
          </aside>
        </div>

        {/* Bottom Related Section */}
        <ArticleRelated 
          currentSlug={article.slug} 
          articles={(navigationData as NavigationPost[] || []).map((p) => {
            const pCat = Array.isArray(p.category) ? p.category[0] : p.category;
            const pAuth = Array.isArray(p.author) ? p.author[0] : p.author;
            return {
              id: p.id, title: p.title, slug: p.slug, category: pCat?.name || "", 
              excerpt: p.excerpt || "", date: p.published_at, readingTime: p.reading_time || "5m", 
              image: p.image_url || "", featured: p.is_featured,
              content: "",
              author: { name: pAuth?.nama || "", avatar: pAuth?.image_url || "" }
            };
          })}
        />
      </div>
    </div>
  );
}
