"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export function PerformanceAnalytics() {
  const [timeRange, setTimeRange] = useState("Hari Ini");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewData, setViewData] = useState<{ date: string; views: number }[]>([]);
  const [totalViews, setTotalViews] = useState(0);

  const ranges = [
    "Hari Ini",
    "7 Hari Lalu",
    "30 Hari Lalu",
    "3 Bulan Lalu"
  ];

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      try {
        const { data: posts, error } = await supabase
          .from('blog_posts')
          .select('view_count, published_at, created_at');

        if (error) throw error;

        if (posts) {
          const total = posts.reduce((acc, p) => acc + (p.view_count || 0), 0);
          setTotalViews(total);
          
          // Determine point count based on range
          let pointCount = 7;
          if (timeRange === "30 Hari Lalu") pointCount = 15;
          if (timeRange === "3 Bulan Lalu") pointCount = 13;
          if (timeRange === "Hari Ini") pointCount = 15; // By hour
          
          // Generate realistic mock curve
          const points = [];
          for (let i = 0; i < pointCount; i++) {
            // Sinusoidal mock data with some randomness
            const base = Math.sin((i / pointCount) * Math.PI) * 50 + 20;
            const random = Math.random() * 30;
            points.push(total === 0 ? 0 : (base + random) / (pointCount * 50) * total);
          }
          
          setViewData(points.map((v, i) => ({ 
            date: i.toString(), 
            views: Math.round(v) 
          })));
        }
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [timeRange]);

  // Generate SVG Path based on data
  const chartPath = useMemo(() => {
    if (viewData.length === 0) return "";
    const maxVal = Math.max(...viewData.map(d => d.views), 10);
    const width = 150;
    const height = 100;
    const step = width / (viewData.length - 1);
    
    return viewData.map((d, i) => {
      const x = i * step;
      const y = height - (d.views / maxVal) * height;
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
  }, [viewData]);

  const areaPath = useMemo(() => {
    if (!chartPath) return "";
    return `${chartPath} L150,100 L0,100 Z`;
  }, [chartPath]);

  const xAxisLabels = useMemo(() => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('ms-MY', { day: 'numeric', month: 'short' });
    
    const formatDate = (daysAgo: number) => {
      const d = new Date();
      d.setDate(now.getDate() - daysAgo);
      return formatter.format(d);
    };

    if (timeRange === "7 Hari Lalu") {
      // 7 labels (one each day)
      return Array.from({ length: 7 }, (_, i) => i === 6 ? "Hari Ini" : formatDate(7 - i));
    }
    if (timeRange === "30 Hari Lalu") {
      // 15 labels (one every 2 days)
      return Array.from({ length: 15 }, (_, i) => i === 14 ? "Hari Ini" : formatDate(30 - (i * 2)));
    }
    if (timeRange === "3 Bulan Lalu") {
      // 13 labels (one every 7 days)
      return Array.from({ length: 13 }, (_, i) => i === 12 ? "Hari Ini" : formatDate(84 - (i * 7)));
    }
    return ["Awal", "Pertengahan", "Hari Ini"];
  }, [timeRange]);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm flex flex-col h-full relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Analisis Tontonan Artikel</h3>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
            {loading ? "Mengambil data..." : totalViews === 0 ? "Tiada aktiviti tontonan direkodkan." : `Jumlah tontonan: ${totalViews}`}
          </p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750 transition-all active:scale-95"
          >
            {timeRange}
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl z-20 py-2 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                {ranges.map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setTimeRange(range);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                      ${timeRange === range 
                        ? "bg-primary/10 text-primary font-bold" 
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative flex-1 min-h-[280px] w-full mt-auto">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/50 dark:bg-gray-900/50 rounded-2xl">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        )}
        
        {/* Y-Axis Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full border-t border-gray-50 dark:border-gray-800/50" />
          ))}
        </div>

        {/* SVG Area Chart */}
        <div className="absolute inset-0 pt-4">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 150 100">
            <defs>
              <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#17838F" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#17838F" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d={chartPath} 
              fill="none" 
              stroke="#17838F" 
              strokeWidth="3" 
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <path 
              d={areaPath} 
              fill="url(#performanceGradient)"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* X-Axis Labels */}
        <div className="absolute bottom-[-24px] left-0 right-0 h-4 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
          {(() => {
            const labels = timeRange === "Hari Ini" 
              ? ["7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM"]
              : xAxisLabels;
              
            return labels.map((label, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === labels.length - 1;
              const isMiddle = Math.abs(idx - Math.floor(labels.length / 2)) < 1;
              const showOnMobile = isFirst || isLast || isMiddle;
              const showOnTablet = idx % 2 === 0 || isLast;
              
              return (
                <span 
                  key={idx}
                  className={`absolute whitespace-nowrap 
                    ${isFirst ? 'left-0' : isLast ? 'right-0' : 'transform -translate-x-1/2'}
                    ${!showOnMobile ? 'hidden md:block' : ''}
                    ${!showOnTablet ? 'md:hidden lg:block' : ''}
                  `}
                  style={!isFirst && !isLast ? { left: `${(idx / (labels.length - 1)) * 100}%` } : {}}
                >
                  {label}
                </span>
              );
            });
          })()}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-12 justify-center">
        <div className="w-3 h-3 rounded-sm bg-primary" />
        <span className="text-[12px] font-bold text-gray-500">Jumlah Tontonan</span>
      </div>
    </div>
  );
}

