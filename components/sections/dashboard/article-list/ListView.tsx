import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MoreVertical, Eye, Pencil, Copy, Trash2, ExternalLink } from "lucide-react";
import { Article } from "./types";
import { motion, AnimatePresence } from "framer-motion";

interface ListViewProps {
  articles: Article[];
}

export function ListView({ articles }: ListViewProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    if (activeMenuId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeMenuId]);

  return (
    <div className="overflow-x-auto scrollbar-none pb-24 px-1">
      <div className="min-w-[1240px] px-1">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-50 dark:border-gray-800">
              <th className="py-4 pl-4 text-left text-[11px] font-black uppercase text-gray-400 tracking-widest w-[450px]">Tajuk Artikel</th>
              <th className="py-4 px-4 text-left text-[11px] font-black uppercase text-gray-400 tracking-widest w-[160px]">Kategori</th>
              <th className="py-4 px-4 text-left text-[11px] font-black uppercase text-gray-400 tracking-widest w-[180px]">Penulis</th>
              <th className="py-4 px-4 text-center text-[11px] font-black uppercase text-gray-400 tracking-widest w-[120px]">Status</th>
              <th className="py-4 px-4 text-center text-[11px] font-black uppercase text-gray-400 tracking-widest w-[100px]">Tontonan</th>
              <th className="py-4 px-4 text-right text-[11px] font-black uppercase text-gray-400 tracking-widest w-[150px]">Tarikh</th>
              <th className="py-4 pr-4 text-right text-[11px] font-black uppercase text-gray-400 tracking-widest w-[80px]">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {articles.map((article) => (
              <tr key={article.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="py-3.5 pl-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-800">
                      <Image src={article.image} alt={article.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col min-w-0 max-w-[380px]">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-gray-900 dark:text-white text-[14px] truncate leading-tight">
                          {article.title}
                        </span>
                        {article.pinned && (
                          <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider border border-blue-100 dark:border-blue-900/50">
                            Pinned
                          </span>
                        )}
                        {article.featured && (
                          <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider border border-amber-100 dark:border-amber-900/50">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-[12px] line-clamp-1 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-left">
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[12px] font-bold">
                    {article.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image src={article.avatar} alt={article.author} width={24} height={24} className="object-cover" />
                    </div>
                    <span className="text-gray-600 dark:text-white text-[13px] font-medium truncate max-w-[140px]">{article.author}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                    article.status.toLowerCase() === 'published' ? 'bg-emerald-50/50 border-emerald-100 text-emerald-600' :
                    article.status.toLowerCase() === 'draft' ? 'bg-gray-50/50 border-gray-100 text-gray-500' :
                    'bg-purple-50/50 border-purple-100 text-purple-600'
                  }`}>
                    <div className={`h-1.5 w-1.5 rounded-full ${
                      article.status.toLowerCase() === 'published' ? 'bg-emerald-500' :
                      article.status.toLowerCase() === 'draft' ? 'bg-gray-400' :
                      'bg-purple-500'
                    }`} />
                    {article.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="text-gray-600 dark:text-white font-medium text-[13px]">{article.views.toLocaleString()}</span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="text-gray-500 dark:text-gray-400 text-[13px] font-medium">{article.published}</span>
                </td>
                <td className="py-3.5 pr-4 text-right">
                  <div className="relative flex justify-end" ref={activeMenuId === article.id ? menuRef : null}>
                    <button 
                      onClick={() => setActiveMenuId(activeMenuId === article.id ? null : article.id)}
                      className={`p-2 transition-all rounded-lg border ${
                        activeMenuId === article.id 
                          ? 'bg-primary/10 border-primary/20 text-primary' 
                          : 'text-gray-400 hover:text-primary hover:bg-primary/5 border-transparent hover:border-primary/10'
                      }`}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    <AnimatePresence>
                      {activeMenuId === article.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full right-0 mt-2 w-[180px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl shadow-black/10 p-2 z-[100] backdrop-blur-xl"
                        >
                          <div className="space-y-1">
                            <DropdownItem onClick={() => setActiveMenuId(null)} icon={<ExternalLink className="h-4 w-4" />} label="View Article" />
                            <DropdownItem onClick={() => setActiveMenuId(null)} icon={<Pencil className="h-4 w-4" />} label="Edit Article" />
                            <DropdownItem onClick={() => setActiveMenuId(null)} icon={<Copy className="h-4 w-4" />} label="Duplicate" />
                            <div className="h-px bg-gray-50 dark:bg-gray-800 my-1" />
                            <DropdownItem onClick={() => setActiveMenuId(null)} icon={<Trash2 className="h-4 w-4" />} label="Delete Article" variant="danger" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DropdownItem({ icon, label, onClick, variant = "default" }: { icon: React.ReactNode, label: string, onClick: () => void, variant?: "default" | "danger" }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
        variant === "danger" 
          ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" 
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary"
      }`}
    >
      <span className={variant === "danger" ? "text-red-400" : "text-gray-400"}>{icon}</span>
      {label}
    </button>
  );
}

