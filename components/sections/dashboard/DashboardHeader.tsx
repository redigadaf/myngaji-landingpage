import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight">Article Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Urus dan pantau prestasi blog anda</p>
      </div>
      <Link href="/dashboard/blog/create">
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 h-12 flex items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <Plus className="h-5 w-5" />
          <span className="font-bold">Artikel Baru</span>
        </Button>
      </Link>
    </div>
  );
}
