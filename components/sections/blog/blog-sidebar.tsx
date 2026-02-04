"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Mail } from "lucide-react";
import { BlogArticle } from "./blog-card";

interface BlogSidebarProps {
  popularArticles: BlogArticle[];
  categories: { name: string; count: number }[];
}

export function BlogSidebar({ popularArticles, categories }: BlogSidebarProps) {
  return (
    <aside className="hidden w-full lg:block lg:w-80 space-y-8">
      {/* Newsletter Widget */}
      <Card className="border-emerald-100 bg-emerald-50/50 dark:bg-emerald-900/10 dark:border-emerald-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-emerald-800 dark:text-emerald-400">
            <Mail className="h-5 w-5" />
            Langgan Newsletter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">Dapatkan tips mengaji dan panduan terkini terus ke inbox anda.</p>
          <div className="space-y-2">
            <Input placeholder="Alamat Emel" className="bg-white dark:bg-gray-800" />
            <Button className="w-full bg-primary hover:bg-emerald-700 text-white">Langgan Sekarang</Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Articles */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Artikel Popular</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {popularArticles.map((article, index) => (
            <Link key={article.id} href={`/blog/${article.slug}`} className="group flex gap-3 items-start">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">{index + 1}</span>
              <div>
                <h4 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-emerald-600 transition-colors dark:text-gray-200">{article.title}</h4>
                <p className="mt-1 text-xs text-gray-500">{article.readingTime}</p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Categories List */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.name}>
                <button className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
                  <span>{cat.name}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">{cat.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Banner/Ad Placeholder */}
      <div className="rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-center text-white">
        <h3 className="mb-2 font-bold text-lg">Jom Mengaji Bersama Kami!</h3>
        <p className="mb-4 text-sm opacity-90">Kelas percubaan percuma untuk minggu pertama.</p>
        <Button variant="secondary" className="w-full text-emerald-800 hover:bg-emerald-50">
          Daftar Sekarang
        </Button>
      </div>
    </aside>
  );
}
