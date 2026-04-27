import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ArticleHeader } from "@/components/sections/blog/detail/article-header";
import { ArticleContent } from "@/components/sections/blog/detail/article-content";
import { TableOfContents } from "@/components/sections/blog/detail/table-of-contents";
import { AuthorSidebarCard } from "@/components/sections/blog/detail/author-card";
import { ArticleRelated } from "@/components/sections/blog/detail/article-related";
import { ArticleShareBottom } from "@/components/sections/blog/detail/article-share";
import { ArticleNavigation } from "@/components/sections/blog/detail/article-navigation";
import { ReadingProgress } from "@/components/sections/blog/detail/reading-progress";
import { ChevronRight, Home } from "lucide-react";
import { Metadata } from "next";
import { BlogArticle } from "@/components/sections/blog/blog-card";

export async function generateStaticParams() {
  const { data } = await supabase.from("blog_posts").select("slug").eq("status", "published");
  return data?.map((post) => ({ slug: post.slug })) || [];
}

/**
 * Safely gets the first item from a potential array or single object returned by Supabase joins.
 */
function getFirst<T>(item: T | T[] | null | undefined): T | null {
  if (!item) return null;
  return Array.isArray(item) ? (item[0] || null) : item;
}

interface QueryCategory {
  name: string;
  slug: string;
}

interface QueryTag {
  name: string;
  slug: string;
}

interface QueryBlogPostTag {
  tag: QueryTag | QueryTag[] | null;
}

interface QueryTeacher {
  experience: string;
  bio: string;
  image_url: string;
  account: { full_name: string } | { full_name: string }[] | null;
}

interface QueryMedia {
  url: string;
}

async function getArticle(slug: string) {
  const { data } = await supabase
    .from("blog_posts")
    .select(`
      *,
      category:blog_categories(name, slug),
      author:teachers(
        experience,
        bio,
        image_url,
        account:accounts(full_name)
      ),
      media:media_assets(url),
      tags:blog_post_tags(
        tag:blog_tags(name, slug)
      )
    `)
    .eq("slug", slug)
    .single();

  if (!data) return null;

  // Transform data to match component expectations
  const author = getFirst(data.author as unknown as QueryTeacher | QueryTeacher[] | null);
  const account = getFirst(author?.account);
  const category = getFirst(data.category as unknown as QueryCategory | QueryCategory[] | null);
  const media = getFirst(data.media as unknown as QueryMedia | QueryMedia[] | null);

  return {
    ...data,
    categoryName: category?.name || "Uncategorized",
    authorData: {
      name: account?.full_name || "Admin MyNgaji",
      avatar: author?.image_url || "",
      role: author?.experience || "Tenaga Pengajar",
      bio: author?.bio || ""
    },
    imageUrl: media?.url || "",
    displayTags: (data.tags as unknown as QueryBlogPostTag[])?.map((t) => getFirst(t.tag)?.name).filter((name): name is string => !!name) || []
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
    title: `${article.meta_title || article.title} | MyNgaji Blog`,
    description: article.meta_description || article.excerpt,
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt,
      images: [article.imageUrl],
    },
  };
}

interface RecentPostQueryResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string | null;
  category: QueryCategory | QueryCategory[] | null;
  media: QueryMedia | QueryMedia[] | null;
  author: {
    account: { full_name: string } | { full_name: string }[] | null;
    image_url: string;
  } | {
    account: { full_name: string } | { full_name: string }[] | null;
    image_url: string;
  }[] | null;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  // Fetch related articles specifically if manual IDs are provided
  let relatedArticles: BlogArticle[] = [];
  if (article.related_posts_ids && article.related_posts_ids.length > 0) {
    const { data: relatedData } = await supabase
      .from("blog_posts")
      .select(`
        id,
        title,
        slug,
        excerpt,
        published_at,
        category:blog_categories(name),
        media:media_assets(url),
        author:teachers(
          account:accounts(full_name),
          image_url
        )
      `)
      .in("id", article.related_posts_ids)
      .eq("status", "published");

    if (relatedData) {
      relatedArticles = (relatedData as unknown as RecentPostQueryResult[]).map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        date: p.published_at || "",
        category: getFirst(p.category)?.name || "Umum",
        image: getFirst(p.media)?.url || "",
        readingTime: "5 min",
        author: { 
          name: getFirst(getFirst(p.author)?.account)?.full_name || "Admin",
          avatar: getFirst(p.author)?.image_url || ""
        },
        featured: false
      }));
    }
  }

  // Fetch recent articles ONLY for navigation (Prev/Next)
  const { data: recentArticles } = await supabase
    .from("blog_posts")
    .select("id, title, slug")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(20); // Get enough to likely find neighbours

  const currentIndex = recentArticles?.findIndex((a) => a.slug === slug) ?? -1;
  const prevArticle = currentIndex > 0 ? recentArticles?.[currentIndex - 1] : undefined;
  const nextArticle = currentIndex < (recentArticles?.length || 0) - 1 ? recentArticles?.[currentIndex + 1] : undefined;

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
          <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[200px]">{article.title}</span>
        </nav>

        <ArticleHeader 
          title={article.title} 
          category={article.categoryName} 
          author={article.authorData} 
          date={article.published_at || article.created_at} 
          readingTime={article.reading_time || "5 minit"} 
          image={article.imageUrl} 
          excerpt={article.excerpt} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Main Content */}
          <main className="lg:col-span-8">
            <ArticleContent content={article.content_html} />

            {/* Tags */}
            {article.displayTags.length > 0 && (
              <div className="flex items-center gap-3 my-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                <span className="font-bold text-sm">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {article.displayTags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium cursor-pointer hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <ArticleShareBottom />

            <ArticleNavigation prev={prevArticle} next={nextArticle} />
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8 hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <AuthorSidebarCard author={article.authorData} />
              <TableOfContents items={article.toc_items} />
            </div>
          </aside>
        </div>

        {/* Bottom Related Section */}
        <ArticleRelated 
          currentSlug={article.slug} 
          articles={relatedArticles}
        />
      </div>
    </div>
  );
}
