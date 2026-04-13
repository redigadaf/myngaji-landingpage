import Link from "next/link";
import { ArrowRight, BookOpen, Globe, Star, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export const metadata = {
  title: "Kelas Kami | MyNgaji",
  description:
    "Terokai pelbagai kelas online bersama MyNgaji — Al-Quran, Bahasa Arab, KAFA dan Hafazan. Bimbingan guru bertauliah, fleksibel & berkesan.",
};

interface KelasEntry {
  slug: string;
  title: string;
  titleHighlight: string;
  description: string;
  badge: string;
  icon: ReactNode;
  color: string;
  gradient: string;
}

const KELAS_LIST: KelasEntry[] = [
  {
    slug: "kelas-alquran",
    title: "Kelas",
    titleHighlight: "Al-Quran",
    description:
      "Pelajari bacaan Al-Quran dari asas hingga mahir dengan bimbingan guru yang bertauliah. Kami menawarkan kelas mengaji personal dan berkumpulan.",
    badge: "Paling Popular",
    icon: <BookOpen className="w-7 h-7" />,
    color: "from-teal-500 to-primary",
    gradient: "from-teal-50 to-emerald-50",
  },
  {
    slug: "kelas-bahasa-arab",
    title: "Kelas",
    titleHighlight: "Bahasa Arab",
    description:
      "Fahami keindahan bahasa Al-Quran dan komunikasi Arab. Modul pembelajaran yang disusun rapi untuk memudahkan pemahaman anda dari peringkat asas.",
    badge: "Bahasa Syurga",
    icon: <Globe className="w-7 h-7" />,
    color: "from-amber-500 to-orange-500",
    gradient: "from-amber-50 to-orange-50",
  },
  {
    slug: "kelas-kafa",
    title: "Kelas",
    titleHighlight: "KAFA",
    description:
      "Bimbingan Fardu Ain & Al-Quran yang syumul untuk anak-anak. Kami tawarkan modul interaktif yang merangkumi Tauhid, Feqah, Akhlak, Sirah dan Jawi.",
    badge: "Untuk Kanak-kanak",
    icon: <Star className="w-7 h-7" />,
    color: "from-violet-500 to-purple-600",
    gradient: "from-violet-50 to-purple-50",
  },
  {
    slug: "kelas-hafazan",
    title: "Kelas",
    titleHighlight: "Hafazan",
    description:
      "Lahirkan huffaz di dalam keluarga anda. Kami tawarkan teknik hafalan yang sistematik, fokus kepada kualiti bacaan dan ingatan jangka panjang.",
    badge: "Eksklusif",
    icon: <Sparkles className="w-7 h-7" />,
    color: "from-rose-500 to-pink-600",
    gradient: "from-rose-50 to-pink-50",
  },
];

export default function KelasPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white border-b border-stone-100 pt-28 pb-20">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #d6d3d1 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide mb-6">
            <Sparkles className="w-4 h-4" />
            Pilih Kelas Anda
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-stone-900 leading-tight mb-5">
            Program Bimbingan{" "}
            <span className="text-primary">Online MyNgaji</span>
          </h1>
          <p className="text-stone-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Bimbingan guru bertauliah secara online — fleksibel, berkesan dan
            sesuai untuk semua peringkat umur.
          </p>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {KELAS_LIST.map((kelas) => (
            <Link
              key={kelas.slug}
              href={`/kelas/${kelas.slug}`}
              className={`group relative flex flex-col rounded-[2rem] bg-gradient-to-br ${kelas.gradient} border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Top accent bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${kelas.color}`} />

              <div className="flex flex-col flex-1 p-8">
                {/* Badge & Icon */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${kelas.color} text-white flex items-center justify-center shadow-lg`}
                  >
                    {kelas.icon}
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${kelas.color} text-white shadow-sm`}
                  >
                    {kelas.badge}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-black text-stone-900 mb-3 leading-tight">
                  {kelas.title}{" "}
                  <span
                    className={`bg-gradient-to-r ${kelas.color} bg-clip-text text-transparent`}
                  >
                    {kelas.titleHighlight}
                  </span>
                </h2>

                {/* Description */}
                <p className="text-stone-500 text-sm leading-relaxed flex-1 mb-8">
                  {kelas.description}
                </p>

                {/* CTA */}
                <div className="inline-flex items-center gap-2 font-bold text-sm text-primary group-hover:gap-3 transition-all">
                  Lihat Kelas
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white border-t border-stone-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-stone-500 text-base md:text-lg mb-4">
            Tidak pasti kelas yang sesuai?
          </p>
          <a
            href="https://wa.me/601XXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-black text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30"
          >
            Hubungi Kami di WhatsApp
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  );
}
