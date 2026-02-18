import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export function PakejCta() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-emerald-800 to-emerald-950 text-white relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
        <div className="mb-8 opacity-80 animate-fade-in-up">
          <p className="text-3xl md:text-5xl font-serif text-emerald-200/40 select-none">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        </div>

        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-tight drop-shadow-lg">
          Bersedia Untuk Mulakan <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-white">Perjalanan Ilmu?</span>
        </h2>

        <p className="text-xl md:text-2xl text-emerald-100/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Sertai kami dan ribuan pelajar lain yang telah berjaya memperbaiki bacaan Al-Quran mereka dengan kaedah yang mudah dan berkesan.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button size="lg" className="bg-white text-primary hover:bg-emerald-50 px-10 h-16 rounded-full text-lg font-bold shadow-xl shadow-black/20 hover:scale-105 transition-all w-full sm:w-auto group">
            Daftar Kelas Percubaan <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent border-2 border-emerald-400/30 text-emerald-50 hover:bg-emerald-900/50 hover:border-emerald-400 hover:text-white px-10 h-16 rounded-full text-lg font-semibold transition-all w-full sm:w-auto backdrop-blur-sm"
          >
            Tanya Soalan <MessageCircle className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
