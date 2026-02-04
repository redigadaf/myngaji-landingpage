"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Facebook, Twitter, Link as LinkIcon } from "lucide-react";

export function TableOfContents() {
  const [activeId, setActiveId] = useState("");

  const headings = [
    { id: "section-1", title: "1. Tetapkan Waktu " },
    { id: "section-2", title: "2. Cipta Persekitaran" },
    { id: "section-3", title: "3. Kaedah Menyeronokkan" },
    { id: "section-4", title: "4. Pujian & Galakan" },
    { id: "section-5", title: "5. Jadi Role Model" },
    { id: "section-6", title: "6. Sabar" },
    { id: "section-7", title: "7. Guna Teknologi" },
    { id: "kesimpulan", title: "Kesimpulan" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -40% 0px" },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setActiveId(id);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-lg">Kandungan Artikel</h3>
        <nav className="flex flex-col space-y-1">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={cn(
                "group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                activeId === heading.id
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-l-2 border-emerald-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 border-l-2 border-transparent",
              )}
            >
              <span>{heading.title}</span>
              {activeId === heading.id && <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
            </a>
          ))}
        </nav>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-slate-900 text-white rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <h3 className="font-bold text-lg mb-2">Langgan Newsletter</h3>
          <p className="text-slate-300 text-sm mb-4">Dapatkan artikel, tips mengaji, dan panduan terkini terus ke inbox anda.</p>
          <div className="space-y-3">
            <input type="email" placeholder="Alamat Emel" className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-500" />
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">Langgan Sekarang</button>
          </div>
        </div>
      </div>
    </div>
  );
}
