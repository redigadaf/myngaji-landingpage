"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function PerformanceAnalytics() {
  const [timeRange, setTimeRange] = useState("Hari Ini");
  const [isOpen, setIsOpen] = useState(false);

  const ranges = [
    "Hari Ini",
    "7 Hari Lalu",
    "30 Hari Lalu",
    "3 Bulan Lalu"
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm flex flex-col h-full relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Analisis Tontonan Artikel</h3>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
            {timeRange === "Hari Ini" ? "Jumlah tontonan hari ini mengikut jam." : `Ringkasan prestasi artikel bagi tempoh ${timeRange.toLowerCase()}.`}
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

      {/* Mock Chart Area */}
      <div className="relative flex-1 min-h-[280px] w-full mt-auto">
        {/* Y-Axis Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full border-t border-gray-50 dark:border-gray-800/50" />
          ))}
        </div>

        {/* SVG Area Chart Mockup */}
        <div className="absolute inset-0 pt-4">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d="M0,100 C10,95 20,98 30,95 C40,92 50,96 60,94 C70,92 80,94 90,85 C100,75 110,65 120,40 C130,15 140,5 150,0" 
              fill="none" 
              stroke="var(--primary)" 
              strokeWidth="3" 
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ transform: 'scale(1, 1)' }}
            />
            <path 
              d="M0,100 C10,95 20,98 30,95 C40,92 50,96 60,94 C70,92 80,94 90,85 C100,75 110,65 120,40 C130,15 140,5 150,0 L150,100 L0,100 Z" 
              fill="url(#gradient)"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* X-Axis Labels */}
        <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-tight">
          {timeRange === "Hari Ini" ? (
            <>
              <span>7:00 PG</span>
              <span>10:00 PG</span>
              <span>1:00 PTG</span>
              <span>4:00 PTG</span>
              <span>7:00 PTG</span>
            </>
          ) : (
            <>
              <span>Awal</span>
              <span>Pertengahan</span>
              <span>Hari Ini</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-12 justify-center">
        <div className="w-3 h-3 rounded-sm bg-primary" />
        <span className="text-[12px] font-bold text-gray-500">Jumlah Tontonan</span>
      </div>
    </div>
  );
}

