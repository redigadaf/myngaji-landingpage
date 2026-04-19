import { FileText, Users, View } from "lucide-react";

export default function DashboardIndex() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Utama</h1>
        <p className="text-gray-500 mt-2">Selamat datang ke panel pengurusan MyNgaji. Semak prestasi dan uruskan kandungan anda di sini.</p>
      </div>

      {/* Stats Cards Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-4">
            <div className="flex p-3 bg-emerald-50 text-emerald-600 rounded-lg dark:bg-emerald-900/30 dark:text-emerald-400">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Jumlah Artikel</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">10</h3>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-4">
            <div className="flex p-3 bg-blue-50 text-blue-600 rounded-lg dark:bg-blue-900/30 dark:text-blue-400">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tenaga Pengajar</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">29</h3>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-4">
            <div className="flex p-3 bg-amber-50 text-amber-600 rounded-lg dark:bg-amber-900/30 dark:text-amber-400">
              <View className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Jumlah Paparan</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,240</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Action / Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Aktiviti Terkini</h3>
          <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-lg">
            <p className="text-gray-400 text-sm">Tiada aktiviti dikesan hari ini.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
