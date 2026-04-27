"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "../../components/layout/dashboard-sidebar";
import { DashboardProvider } from "@/components/providers/DashboardProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Pages that should hide the main dashboard sidebar for focus mode
  const isFocusMode = pathname === "/dashboard/blog/create" || pathname.includes("/edit");

  return (
    <DashboardProvider>
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
    </DashboardProvider>
  );
}
