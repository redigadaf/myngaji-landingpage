import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import blogArticles from "@/components/sections/data/blog-articles.json";
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

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
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Find prev/next articles
  const currentIndex = blogArticles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? blogArticles[currentIndex - 1] : undefined;
  const nextArticle = currentIndex < blogArticles.length - 1 ? blogArticles[currentIndex + 1] : undefined;

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
            <ArticleContent />

            {/* Tags */}
            <div className="flex items-center gap-3 my-8 pt-8 border-t border-gray-100 dark:border-gray-800">
              <span className="font-bold text-sm">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {["TipsIbuBapa", "MengajarAnakMengaji", "AlQuran", "ParentingIslam"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium cursor-pointer hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <ArticleShareBottom />

            {/* <div className="my-12">
              <AuthorFooterCard author={article.author} />
            </div> */}

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
        <ArticleRelated currentSlug={article.slug} />
      </div>
    </div>
  );
}
