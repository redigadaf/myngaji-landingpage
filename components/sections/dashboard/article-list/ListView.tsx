import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { MoreVertical, Pencil, Copy, Trash2, ExternalLink } from "lucide-react";
import { Article } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

interface DropdownItemProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  variant?: "default" | "danger";
}

function DropdownItem({ onClick, icon, label, variant = "default" }: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${
        variant === "danger"
          ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

interface ListViewProps {
  articles: Article[];
}

export function ListView({ articles }: ListViewProps) {
  const router = useRouter();
  const [activeMenuId, setActiveMenuId] = useState<string | number | null>(null);
  const [menuCoords, setMenuCoords] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    setMounted(true);
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

  const handleAction = async (action: string, article: Article) => {
    setActiveMenuId(null);
    
    switch (action) {
      case "view":
        window.open(`/blog/${article.slug}`, "_blank");
        break;
      case "edit":
        router.push(`/dashboard/blog/edit/${article.id}`);
        break;
      case "duplicate":
        try {
          const { data: original } = await supabase.from("blog_posts").select("*").eq("id", article.id).single();
          if (original) {
            // Use destructuring to omit internal fields instead of 'delete' with 'any' casting
            const rest = Object.fromEntries(
              Object.entries(original).filter(([key]) => 
                !["id", "created_at", "updated_at", "published_at"].includes(key)
              )
            );

            const { error } = await supabase.from("blog_posts").insert({
              ...rest,
              title: `${article.title} (Salinan)`,
              slug: `${article.slug}-copy-${Math.floor(Math.random() * 1000)}`,
              status: "draft",
              view_count: 0,
            });
            if (error) throw error;
            router.refresh();
            window.location.reload();
          }
        } catch (err) {
          console.error("Duplicate error:", err);
          alert("Gagal menduplikasi artikel.");
        }
        break;
      case "delete":
        setArticleToDelete(article);
        break;
    }
  };

  const handleConfirmDelete = async () => {
    if (!articleToDelete) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", articleToDelete.id);
      if (error) throw error;
      router.refresh();
      window.location.reload();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Gagal memadam artikel.");
    } finally {
      setIsDeleting(false);
      setArticleToDelete(null);
    }
  };

  return (
    <div className="overflow-x-auto scrollbar-none pb-12 px-1">
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
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setMenuCoords({ 
                          top: rect.bottom + 8, // slight margin
                          left: rect.right - 180 // width of dropdown is 180px, align right edge
                        });
                        setActiveMenuId(activeMenuId === article.id ? null : article.id);
                      }}
                      className={`p-2 transition-all rounded-lg border ${
                        activeMenuId === article.id 
                          ? 'bg-primary/10 border-primary/20 text-primary' 
                          : 'text-gray-400 hover:text-primary hover:bg-primary/5 border-transparent hover:border-primary/10'
                      }`}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {mounted && typeof document !== "undefined" && createPortal(
                      <AnimatePresence>
                        {activeMenuId === article.id && (
                          <div 
                            className="fixed z-[100]" 
                            style={{ top: `${menuCoords.top}px`, left: `${menuCoords.left}px` }}
                            ref={menuRef} // To catch clicks outside
                          >
                            <motion.div
                              initial={{ opacity: 0, y: -5, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -5, scale: 0.95 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="w-[180px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl shadow-black/10 p-2 backdrop-blur-xl"
                            >
                              <div className="space-y-1">
                                <DropdownItem onClick={() => handleAction("view", article)} icon={<ExternalLink className="h-4 w-4" />} label="View Article" />
                                <DropdownItem onClick={() => handleAction("edit", article)} icon={<Pencil className="h-4 w-4" />} label="Edit Article" />
                                <DropdownItem onClick={() => handleAction("duplicate", article)} icon={<Copy className="h-4 w-4" />} label="Duplicate" />
                                <div className="h-px bg-gray-50 dark:bg-gray-800 my-1" />
                                <DropdownItem onClick={() => handleAction("delete", article)} icon={<Trash2 className="h-4 w-4" />} label="Delete Article" variant="danger" />
                              </div>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>,
                      document.body
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmModal 
        isOpen={!!articleToDelete}
        onClose={() => setArticleToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Padam Artikel?"
        itemName={articleToDelete?.title || ""}
        isDeleting={isDeleting}
      />
    </div>
  );
}


