
export function TopArticles() {
  const topArticles = [
    { id: 1, title: "12 Tempat Menarik di Melaka...", views: 14 },
    { id: 2, title: "30 Tempat Menarik di Kuala Lumpur...", views: 14 },
    { id: 3, title: "27 Tempat Menarik di Penang...", views: 13 },
    { id: 4, title: "11 Tempat Menarik di Perak...", views: 12 },
    { id: 5, title: "11 Tempat Menarik di Selangor...", views: 9 },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">Top 5 Artikel</h3>
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">Views</span>
      </div>

      <div className="flex-1 space-y-7">
        {topArticles.map((article, index) => (
          <div key={article.id} className="flex items-center gap-4">
            {/* Rank Number */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-black flex-shrink-0
              ${index < 3 
                ? "bg-primary text-white shadow-md shadow-primary/20" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"}`}
            >
              {index + 1}
            </div>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-gray-700 dark:text-gray-200 truncate pr-2">
                {article.title}
              </p>
            </div>

            {/* Progress Bar Mock */}
            <div className="w-[80px] h-2 bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden flex-shrink-0">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${(article.views / 20) * 100}%` }}
              />
            </div>

            {/* View Count */}
            <span className="text-[15px] font-black text-gray-900 dark:text-gray-100 w-6 text-right">
              {article.views}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
