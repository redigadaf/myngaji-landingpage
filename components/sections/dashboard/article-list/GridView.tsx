import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Eye, MoreHorizontal, Pencil, Copy, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Article } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

interface GridViewProps {
  articles: Article[];
}

export function GridView({ articles }: GridViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 px-4 pb-8">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const handleAction = async (action: string) => {
    setShowMenu(false);
    
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
            // Use Object entries to filter out internal fields instead of 'delete' with 'any' casting
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
        setShowDeleteModal(true);
        break;
    }
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", article.id);
      if (error) throw error;
      router.refresh();
      window.location.reload();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Gagal memadam artikel.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[16px] p-4 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full items-stretch">
      {/* Image Section - Flushing top, left, right with its own rounding */}
      <div className="relative aspect-[1.15/1] -m-4 mb-5 overflow-hidden rounded-t-[16px]">
        <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        
        {/* Status Badge on Image - Extreme Compact Frosted */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          <div className="flex items-center gap-1 px-1.5 py-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-md shadow-sm border border-white/20">
            <div className={`h-1 w-1 rounded-full animate-pulse ${
              article.status.toLowerCase() === 'published' ? 'bg-emerald-500' :
              article.status.toLowerCase() === 'draft' ? 'bg-gray-400' :
              'bg-purple-500'
            }`} />
            <span className={`text-[9px] font-bold uppercase tracking-tight leading-none h-4 flex items-center ${
              article.status.toLowerCase() === 'published' ? 'text-emerald-600 dark:text-emerald-400' :
              article.status.toLowerCase() === 'draft' ? 'text-gray-500 dark:text-gray-400' :
              'text-purple-600 dark:text-purple-400'
            }`}>{article.status}</span>
          </div>
        </div>

        {/* Action Badges - Extreme Compact Tinted */}
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
          {article.featured && (
            <div className="px-1.5 py-0 bg-amber-50/90 dark:bg-amber-900/20 backdrop-blur-md rounded-md shadow-sm border border-amber-200/50 dark:border-amber-900/30">
              <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-tight leading-none h-4 flex items-center">Featured</span>
            </div>
          )}
          {article.pinned && (
             <div className="px-1.5 py-0 bg-blue-50/90 dark:bg-blue-900/20 backdrop-blur-md rounded-md shadow-sm border border-blue-200/50 dark:border-blue-900/30">
               <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-tight leading-none h-4 flex items-center">Pinned</span>
             </div>
          )}
        </div>
      </div>

      {/* Category Label */}
      <div className="mb-3">
        <span className="px-4 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[12px] font-medium border border-gray-100/50 dark:border-gray-700/50">
          {article.category}
        </span>
      </div>

      {/* Title & Excerpt */}
      <div className="flex-1">
        <h4 className="text-[17px] font-extrabold text-gray-900 dark:text-white leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h4>
        <p className="text-gray-400 dark:text-gray-500 text-[13px] leading-relaxed line-clamp-2 mb-5">
          {article.excerpt}
        </p>
      </div>

      {/* Author Section */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="relative h-10 w-10 rounded-full overflow-hidden bg-primary/10 border-2 border-white dark:border-gray-800 shadow-sm flex items-center justify-center">
          {article.avatar ? (
            <Image src={article.avatar} alt={article.author} fill className="object-cover" />
          ) : (
            <span className="text-primary font-bold text-[12px]">
              {article.author.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-bold text-gray-800 dark:text-gray-200 truncate leading-tight mb-0.5">
            {article.author}
          </div>
          <div className="text-gray-400 text-[12px]">
            {article.published}
          </div>
        </div>
      </div>

      {/* Stats Box */}
      <div className="grid grid-cols-2 gap-px bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-5 border border-gray-50 dark:border-gray-800">
        <div className="bg-gray-50/50 dark:bg-gray-800/40 p-3 text-center">
          <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Views</div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[15px] font-black text-gray-900 dark:text-white leading-none">{article.views}</span>
            <svg className="h-3.5 w-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
          </div>
        </div>
        <div className="bg-gray-50/50 dark:bg-gray-800/40 p-3 text-center">
          <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">30 Days</div>
          <div className="text-[15px] font-black text-gray-400 dark:text-gray-600 leading-none">-</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 relative">
        <Button 
          onClick={() => handleAction("view")}
          variant="outline" 
          className="flex-1 h-[48px] rounded-xl border-gray-100 dark:border-gray-800 hover:border-primary/20 hover:bg-primary/5 group/btn transition-all"
        >
          <div className="flex items-center justify-center gap-2">
            <Eye className="h-4 w-4 text-gray-400 group-hover/btn:text-primary transition-colors" />
            <span className="text-[14px] font-bold text-gray-600 dark:text-gray-300 group-hover/btn:text-primary transition-colors">Preview</span>
          </div>
        </Button>
        
        <div className="relative" ref={menuRef}>
          <Button 
            onClick={() => setShowMenu(!showMenu)}
            variant="outline" 
            className={`h-[48px] w-[48px] rounded-xl p-0 border-gray-100 dark:border-gray-800 hover:border-primary/20 hover:bg-primary/5 group/more transition-all ${showMenu ? 'bg-primary/5 border-primary/20' : ''}`}
          >
            <MoreHorizontal className={`h-4 w-4 transition-colors ${showMenu ? 'text-primary' : 'text-gray-400 group-hover/more:text-primary'}`} />
          </Button>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute bottom-full right-0 mb-2 w-[190px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl shadow-black/10 p-2 z-[100] backdrop-blur-xl"
              >
                <div className="space-y-1">
                  <DropdownItem onClick={() => handleAction("view")} icon={<ExternalLink className="h-4 w-4" />} label="View Article" />
                  <DropdownItem onClick={() => handleAction("edit")} icon={<Pencil className="h-4 w-4" />} label="Edit Article" />
                  <DropdownItem onClick={() => handleAction("duplicate")} icon={<Copy className="h-4 w-4" />} label="Duplicate" />
                  <div className="h-px bg-gray-50 dark:bg-gray-800 my-1" />
                  <DropdownItem onClick={() => handleAction("delete")} icon={<Trash2 className="h-4 w-4" />} label="Delete Article" variant="danger" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <DeleteConfirmModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Padam Artikel?"
        itemName={article.title}
        isDeleting={isDeleting}
      />
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
