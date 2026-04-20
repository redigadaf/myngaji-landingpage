import { FileText, CheckCircle2, Pencil, Eye } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

function StatCard({ label, value, icon, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 ${iconBg} ${iconColor} rounded-2xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <p className="text-gray-400 dark:text-gray-500 text-sm font-medium mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</h3>
    </div>
  );
}

export function StatsOverview() {
  const stats = [
    {
      label: "Total Articles",
      value: "6",
      icon: <FileText className="h-6 w-6" />,
      iconBg: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      label: "Published",
      value: "6",
      icon: <CheckCircle2 className="h-6 w-6" />,
      iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      label: "Draft",
      value: "0",
      icon: <Pencil className="h-6 w-6" />,
      iconBg: "bg-amber-50 dark:bg-amber-900/20",
      iconColor: "text-amber-600 dark:text-amber-400"
    },
    {
      label: "Total Views",
      value: "302",
      icon: <Eye className="h-6 w-6" />,
      iconBg: "bg-secondary/20 dark:bg-secondary/10",
      iconColor: "text-secondary"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
}
