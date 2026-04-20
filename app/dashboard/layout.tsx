"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "../../components/layout/dashboard-sidebar";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Pages that should hide the main dashboard sidebar for focus mode
  const isFocusMode = pathname === "/dashboard/blog/create" || pathname.includes("/edit");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/login");
        } else {
          setLoading(false);
        }
      } catch (error) {
        router.push("/login");
      }
    };
    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center gap-4 text-white font-sans">
        <Loader2 className="h-10 w-10 animate-spin text-secondary" />
        <p className="font-black text-sm uppercase tracking-widest opacity-50">Menyemak Akses Admin...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-[#FDFCFD] dark:bg-gray-950 font-sans tracking-tight overflow-hidden">
      {/* Sidebar Desktop - Hidden in Focus Mode */}
      {!isFocusMode && <DashboardSidebar />}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen relative">
        {/* Mobile Header - Hidden in Focus Mode */}
        {!isFocusMode && (
          <header className="flex h-16 items-center gap-4 border-b border-gray-100 bg-white px-6 dark:border-gray-800 dark:bg-gray-900 md:hidden">
            <Link href="/" className="font-black text-xl text-primary tracking-tight">
              MyNgaji <span className="text-secondary font-black">Admin</span>
            </Link>
          </header>
        )}

        <div className={isFocusMode ? "min-h-full" : "p-4 md:p-10 min-h-full"}>
          {children}
        </div>
      </main>
    </div>
  );
}
