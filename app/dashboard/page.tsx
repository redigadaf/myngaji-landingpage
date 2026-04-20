import { DashboardHeader } from "../../components/sections/dashboard/DashboardHeader";
import { StatsOverview } from "../../components/sections/dashboard/StatsOverview";
import { PerformanceAnalytics } from "../../components/sections/dashboard/PerformanceAnalytics";
import { TopArticles } from "../../components/sections/dashboard/TopArticles";
import { ArticleList } from "../../components/sections/dashboard/ArticleList";

export default function DashboardIndex() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* 1. Header Section */}
      <DashboardHeader />

      {/* 2. Stats Overview Cards */}
      <StatsOverview />

      {/* 3. Analytics Section */}
      <div className="flex items-center gap-2 mb-6 pt-4">
        <div className="w-1 h-5 bg-primary rounded-full transition-all" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Analisis Prestasi</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8">
          <PerformanceAnalytics />
        </div>
        <div className="lg:col-span-4">
          <TopArticles />
        </div>
      </div>

      {/* 4. Article List Section */}
      <ArticleList />
    </div>
  );
}
