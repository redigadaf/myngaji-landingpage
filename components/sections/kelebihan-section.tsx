"use client";

import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
import { UserRoundCheck, Sparkles, NotebookPen, TrendingUp, CalendarClock, UsersRound, MessageCircle, LibraryBig, GraduationCap, Award } from "lucide-react";

const KELEBIHAN_PHASES = [
  {
    id: "kelebihan-1",
    title: "Kelas Eksklusif Secara One-to-One",
    description: "Pembelajaran dijalankan secara peribadi antara tutor dan pelajar bagi memastikan fokus penuh serta pendekatan yang disesuaikan dengan tahap dan keperluan pelajar.",
    bg: "bg-white",
    textColor: "text-gray-800",
    titleColor: "text-primary",
    numberColor: "text-primary",
    descriptionColor: "text-gray-600",
    border: "border-stone-200",
    icon: UserRoundCheck,
  },
  {
    id: "kelebihan-2",
    title: "Kelas Percubaan Percuma",
    description: "Kami menyediakan kelas percubaan secara percuma agar ibu bapa dan pelajar dapat merasai sendiri kaedah pembelajaran sebelum meneruskan kelas sepenuhnya.",
    bg: "bg-primary",
    textColor: "text-white",
    titleColor: "text-white",
    numberColor: "text-white",
    descriptionColor: "text-white/90",
    border: "border-[#17838F]",
    icon: Sparkles,
  },
  {
    id: "kelebihan-3",
    title: "Nota & Latihan Disediakan",
    description: "Setiap sesi pembelajaran dilengkapi dengan nota dan latihan yang tersusun bagi membantu pelajar memahami dan mengukuhkan penguasaan pembelajaran.",
    bg: "bg-white",
    textColor: "text-gray-800",
    titleColor: "text-primary",
    numberColor: "text-primary",
    descriptionColor: "text-gray-600",
    border: "border-stone-200",
    icon: NotebookPen,
  },
  {
    id: "kelebihan-4",
    title: "Laporan Prestasi Bulanan",
    description: "Laporan prestasi pelajar disediakan setiap bulan bagi memantau perkembangan pembelajaran serta mengenal pasti aspek yang perlu dipertingkatkan.",
    bg: "bg-primary",
    textColor: "text-white",
    titleColor: "text-white",
    numberColor: "text-white",
    descriptionColor: "text-white/90",
    border: "border-[#17838F]",
    icon: TrendingUp,
  },
  {
    id: "kelebihan-5",
    title: "Waktu Kelas Yang Fleksibel",
    description: "Jadual pembelajaran yang fleksibel membolehkan kelas diatur mengikut kesesuaian masa pelajar dan ibu bapa tanpa tekanan.",
    bg: "bg-white",
    textColor: "text-gray-800",
    titleColor: "text-primary",
    numberColor: "text-primary",
    descriptionColor: "text-gray-600",
    border: "border-stone-200",
    icon: CalendarClock,
  },
  {
    id: "kelebihan-6",
    title: "Terbuka Untuk Semua Peringkat Usia",
    description: "Program pembelajaran kami terbuka kepada semua peringkat umur, dari kanak-kanak hingga dewasa, mengikut tahap kemampuan masing-masing.",
    bg: "bg-primary",
    textColor: "text-white",
    titleColor: "text-white",
    numberColor: "text-white",
    descriptionColor: "text-white/90",
    border: "border-[#17838F]",
    icon: UsersRound,
  },
  {
    id: "kelebihan-7",
    title: "Sokongan Kumpulan WhatsApp",
    description: "Disediakan kumpulan WhatsApp khas sebagai medium komunikasi antara tutor dan ibu bapa bagi perbincangan serta pemantauan pembelajaran.",
    bg: "bg-white",
    textColor: "text-gray-800",
    titleColor: "text-primary",
    numberColor: "text-primary",
    descriptionColor: "text-gray-600",
    border: "border-stone-200",
    icon: MessageCircle,
  },
  {
    id: "kelebihan-8",
    title: "Modul Pembelajaran Lengkap & Interaktif",
    description: "Modul pembelajaran disusun secara sistematik, lengkap dan interaktif untuk menjadikan sesi pembelajaran lebih menarik dan mudah difahami.",
    bg: "bg-primary",
    textColor: "text-white",
    titleColor: "text-white",
    numberColor: "text-white",
    descriptionColor: "text-white/90",
    border: "border-[#17838F]",
    icon: LibraryBig,
  },
  {
    id: "kelebihan-9",
    title: "Dibimbing Oleh Tutor Berpengalaman",
    description: "Setiap pelajar dibimbing oleh tutor yang berpengalaman, berkelayakan dan berdedikasi dalam mendidik dengan penuh kesabaran.",
    bg: "bg-white",
    textColor: "text-gray-800",
    titleColor: "text-primary",
    numberColor: "text-primary",
    descriptionColor: "text-gray-600",
    border: "border-stone-200",
    icon: GraduationCap,
  },
  {
    id: "kelebihan-10",
    title: "Sijil Pencapaian Disediakan",
    description: "Sijil pencapaian akan diberikan sebagai penghargaan atas usaha dan kemajuan pelajar sepanjang mengikuti program pembelajaran.",
    bg: "bg-primary",
    textColor: "text-white",
    titleColor: "text-white",
    numberColor: "text-white",
    descriptionColor: "text-white/90",
    border: "border-[#17838F]",
    icon: Award,
  },
];

export function KelebihanSection() {
  return (
    <div className="w-full min-h-svh place-content-center bg-stone-50 py-24">
      <div className="container mx-auto px-6 text-stone-900 xl:px-12">
        <div className="flex flex-col gap-12 items-center">
          <div className="sticky top-32 flex flex-col items-center text-center max-w-3xl mx-auto">
            <h5 className="text-2xl uppercase tracking-wide text-primary font-black mb-2">Kelebihan Kami</h5>
            <h2 className="mb-6 text-4xl font-black tracking-tight leading-tight">
              Kenapa Anda Perlu Memilih <span className="text-primary">MyNgaji?</span>
            </h2>
            <p className="max-w-prose text-lg text-gray-600 leading-relaxed mx-auto">
              Kami komited untuk menyediakan pengalaman pembelajaran Al-Quran yang terbaik, mudah, dan berkesan. Pendekatan kami direka khas untuk membantu anda menguasai Al-Quran dengan yakin.
            </p>
          </div>
          <ContainerScroll className="w-full max-w-4xl mx-auto space-y-8 pb-24">
            {KELEBIHAN_PHASES.map((phase, index) => (
              <CardSticky offsetTop={380} key={phase.id} index={index + 1} className={`rounded-2xl border p-8 shadow-md backdrop-blur-md overflow-hidden ${phase.bg} ${phase.border}`}>
                {/* Decorative Background Icon */}
                <div className={`absolute -right-6 -bottom-6 opacity-[0.07] pointer-events-none select-none z-0 ${phase.bg === "bg-white" ? "text-primary" : "text-white"}`}>
                  <phase.icon strokeWidth={1.5} className="w-56 h-56 transform -rotate-12" />
                </div>

                {/* Decorative Blur Blob */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-current opacity-10 blur-3xl rounded-full pointer-events-none -z-10 ${phase.bg === "bg-white" ? "text-primary/50" : "text-white/50"}`} />

                <div className="relative z-10 flex items-center justify-between gap-4">
                  <h2 className={`my-6 text-2xl font-bold tracking-tighter ${phase.titleColor}`}>{phase.title}</h2>
                  <h3 className={`text-4xl font-bold ${phase.numberColor}`}>{String(index + 1).padStart(2, "0")}</h3>
                </div>

                <p className={`relative z-10 leading-relaxed ${phase.descriptionColor}`}>{phase.description}</p>
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>
      </div>
    </div>
  );
}
