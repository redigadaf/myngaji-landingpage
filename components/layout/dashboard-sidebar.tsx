"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, Link as LinkIcon, Image as ImageIcon, LogOut, CheckCircle2, ChevronsUpDown, LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";

const sidebarNavItems = [
  {
    title: "Article Management",
    href: "/dashboard",
    icon: FileText,
  },
  {
    title: "Links",
    href: "/dashboard/links",
    icon: LinkIcon,
  },
  {
    title: "Media Library",
    href: "/dashboard/media-library",
    icon: ImageIcon,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [teacherData, setTeacherData] = useState<{ image_url?: string; nama?: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Ambil image_url dari tabel teachers
        const { data: teacher } = await supabase
          .from("teachers")
          .select("image_url")
          .eq("account_id", user.id)
          .single();

        // Ambil nama dari tabel accounts
        const { data: account } = await supabase
          .from("accounts")
          .select("nama")
          .eq("id", user.id)
          .single();

        setTeacherData({
          image_url: teacher?.image_url ?? undefined,
          nama: account?.nama ?? undefined,
        });
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const displayName = teacherData.nama || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Admin";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <aside className="hidden w-72 flex-col bg-primary md:flex flex-shrink-0 relative overflow-visible">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-secondary blur-3xl opacity-50" />
      </div>

      {/* Header / Logo */}
      <div className="flex h-24 items-center px-8 relative z-10">
        <Link href="/" className="relative h-10 w-40 block transition-transform hover:scale-105 duration-300">
          <Image 
            src="/assets/logo1.png" 
            alt="MyNgaji Logo" 
            fill 
            className="object-contain object-left"
            priority
          />
        </Link>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-auto py-6 relative z-10">
        <div className="px-6 mb-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2 mb-4">Menu Utama</p>
          <nav className="grid items-start gap-1.5">
            {sidebarNavItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-300 outline-none",
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activePill"
                      className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={cn("h-5 w-5 relative z-10 transition-colors", isActive ? "text-secondary" : "text-white/30 group-hover:text-white/60")} />
                  <span className="relative z-10 font-bold tracking-tight text-[14px]">{item.title}</span>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-4 w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(252,227,0,0.5)]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Profile - Premium Floating Card */}
      <div className="p-6 relative z-10">
        <div className="relative">
          {/* Backdrop for click-outside */}
          {isOpen && (
            <div 
              className="fixed inset-0 z-40 bg-black/5" 
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Premium Popover */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-0 mb-4 w-full bg-white dark:bg-gray-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100/50 dark:border-gray-800 overflow-hidden z-50 p-2"
              >
                <div className="p-4 flex items-center gap-3 bg-gray-50/50 dark:bg-gray-800/20 rounded-[1.5rem] mb-2">
                  <div className="h-12 w-12 rounded-[1rem] bg-gradient-to-br from-primary to-primary/40 overflow-hidden flex items-center justify-center text-xl font-black text-white shadow-lg flex-shrink-0 border-2 border-white">
                    {teacherData.image_url ? (
                      <img src={teacherData.image_url} alt={displayName} className="h-full w-full object-cover" />
                    ) : (
                      userInitial
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-[14px] font-black text-primary dark:text-white truncate">{displayName}</h4>
                    <p className="text-[10px] text-primary/40 dark:text-gray-400 font-bold truncate tracking-wider">{user?.email}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-bold text-gray-600 dark:text-gray-300 hover:bg-primary/5 hover:text-primary rounded-xl transition-all duration-300 group/item">
                    <div className="p-2 rounded-lg bg-gray-50 group-hover/item:bg-primary/10 transition-colors">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    Account Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 group/logout"
                  >
                    <div className="p-2 rounded-lg bg-red-50 group-hover/logout:bg-red-100 transition-colors">
                      <LogOut className="h-4 w-4" />
                    </div>
                    Log out Account
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "group relative flex w-full items-center gap-3 rounded-[2rem] p-3 transition-all duration-500 border border-white/10 active:scale-[0.97] overflow-hidden shadow-2xl shadow-black/20",
              isOpen ? "bg-white text-primary ring-4 ring-white/10" : "bg-white/10 hover:bg-white/15 text-white"
            )}
          >
            {/* Glossy Overlay */}
            {!isOpen && <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />}
            
            <div className="h-12 w-12 rounded-[1.2rem] bg-gradient-to-br from-white/30 to-white/5 overflow-hidden flex items-center justify-center text-xl font-black text-white shadow-xl flex-shrink-0 relative z-10 border border-white/20">
              {teacherData.image_url ? (
                <img src={teacherData.image_url} alt={displayName} className="h-full w-full object-cover" />
              ) : (
                userInitial
              )}
            </div>
            
            <div className="flex-1 text-left overflow-hidden relative z-10 ml-1">
              <p className={cn("text-[14px] font-black truncate leading-tight transition-colors", isOpen ? "text-primary" : "text-white")}>
                {displayName}
              </p>
              <p className={cn(
                "text-[10px] font-bold truncate transition-colors tracking-wide",
                isOpen ? "text-primary/40" : "text-white/40 group-hover:text-secondary"
              )}>{user?.email}</p>
            </div>
            
            <div className={cn("p-1.5 rounded-full transition-all duration-300", isOpen ? "bg-primary/5 text-primary rotate-180" : "bg-white/5 text-white/30 rotate-0")}>
              <ChevronsUpDown className="h-4 w-4" />
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
