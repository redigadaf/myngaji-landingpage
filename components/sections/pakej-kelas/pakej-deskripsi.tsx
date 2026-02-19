import Link from "next/link";
import { Star, Clock, Laptop, Users, BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PakejKelas } from "@/components/sections/data/data-pakej-kelas";

interface PakejDeskripsiProps {
  data: PakejKelas;
}

export function PakejDeskripsi({ data }: PakejDeskripsiProps) {
  // Use first price for display
  const startingPrice = data.harga[0];

  return (
    <section className="py-20 md:py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Main Content (Deskripsi) - Desktop: Left, Mobile: Bottom via order */}
          <div className="lg:col-span-2 space-y-8 order-last lg:order-first">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Tentang Kelas Ini</h2>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
              {data.deskripsi.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-yellow-50 rounded-2xl">
                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 shrink-0" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 text-lg">Kaedah Terbukti Berkesan</h3>
                <p className="text-slate-500 leading-relaxed">Kami menggunakan modul pembelajaran yang telah diuji dan terbukti berkesan untuk membantu pelajar menguasai bacaan dengan pantas dan tepat.</p>
              </div>
            </div>
          </div>

          {/* Sidebar (Sticky Card) - Desktop: Right, Mobile: Top via order */}
          <div className="lg:col-span-1 lg:sticky lg:top-32 order-first lg:order-last mb-8 lg:mb-0">
            <Card className="rounded-[2.5rem] shadow-xl border-slate-100 overflow-hidden relative group hover:shadow-2xl transition-all duration-300 bg-white">
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-primary via-emerald-400 to-primary"></div>

              <CardHeader className="text-center pt-8 pb-4">
                <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Harga Bermula</CardTitle>
                <div className="flex items-baseline justify-center gap-1 text-slate-900">
                  <span className="text-5xl font-black tracking-tighter text-primary">{startingPrice.harga}</span>
                  <span className="text-slate-400 font-medium text-lg">/{startingPrice.tempoh.toLowerCase()}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 px-8 pb-6">
                <div className="space-y-4">
                  {[
                    { label: "Tempoh", value: "Fleksibel", icon: Clock },
                    { label: "Kaedah", value: "Online (Zoom/Meet)", icon: Laptop },
                    { label: "Kelas", value: "One-to-One / Kumpulan", icon: Users },
                    { label: "Bahan", value: "Disediakan (PDF)", icon: BookOpen },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 px-3 -mx-2 rounded-xl transition-colors">
                      <span className="text-slate-500 text-sm flex items-center gap-3 font-medium">
                        <item.icon className="w-5 h-5 text-primary" /> {item.label}
                      </span>
                      <span className="font-semibold text-slate-900 text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 px-8 pb-10 bg-slate-50/50 pt-8">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-14 text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.02]">Daftar Sekarang</Button>
                <Button variant="outline" className="w-full border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-full h-14 text-base font-semibold">
                  Cuba Percuma
                </Button>
                <div className="flex justify-center items-center gap-2 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <p className="text-center text-xs text-slate-400 font-medium">Tempat terhad bulan ini</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
