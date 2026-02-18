import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PakejKelas } from "@/components/sections/data/data-pakej-kelas";

interface PakejHargaProps {
  data: PakejKelas;
}

export function PakejHarga({ data }: PakejHargaProps) {
  return (
    <section className="py-24 bg-[#0a2e1a] text-white relative overflow-hidden">
      {/* Bg Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="border-emerald-400/50 text-emerald-300 bg-emerald-900/30 mb-4 px-4 py-1">
            Pilihan Terbaik
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white/95">Pilih Pakej Yang Sesuai</h2>
          <p className="text-lg text-emerald-100/60 font-light">Laburkan untuk masa depan akhirat anda dan keluarga bersama kami.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch justify-center">
          {data.harga.map((plan, index) => {
            // Highlight the "Exclusive", "Intensive", "Pro" or the 2nd item if multiple
            const highlight = data.harga.length > 1 ? index === 1 : index === 0;

            return (
              <Card
                key={index}
                className={`relative flex flex-col justify-between border-0 rounded-[2.5rem] overflow-hidden transition-all duration-300 ${highlight ? "bg-primary text-white scale-105 shadow-2xl shadow-emerald-500/20 z-10 ring-1 ring-emerald-400/30" : "bg-white/5 text-emerald-100 hover:bg-white/10"}`}
              >
                {highlight && <div className="absolute top-0 right-0 bg-secondary text-primary text-xs font-bold px-5 py-2 rounded-bl-2xl uppercase tracking-widest shadow-lg">Paling Popular</div>}
                <CardHeader className="text-center pb-2 pt-12">
                  <h3 className={`text-lg font-semibold uppercase tracking-wider mb-2 ${highlight ? "text-white/90" : "text-white/50"}`}>{plan.label}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-sm align-top opacity-70 mt-2">RM</span>
                    <span className="text-6xl font-black tracking-tighter">{plan.harga.replace("RM", "")}</span>
                    <span className="text-sm opacity-70 self-end mb-2">/{plan.tempoh.toLowerCase()}</span>
                  </div>
                </CardHeader>
                <CardContent className="py-8">
                  <ul className="space-y-4 text-sm font-medium opacity-90 px-4">
                    <li className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${highlight ? "bg-white/20" : "bg-white/10"}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Akses Penuh Modul</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${highlight ? "bg-white/20" : "bg-white/10"}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Jadual Fleksibel</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${highlight ? "bg-white/20" : "bg-white/10"}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Bimbingan Personal</span>
                    </li>
                    {highlight && (
                      <li className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-emerald-400/20 text-emerald-200`}>
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span>Sijil Penyertaan</span>
                      </li>
                    )}
                    <li className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${highlight ? "bg-white/20" : "bg-white/10"}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Penilaian Berkala</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pb-10 pt-4 px-8">
                  <Button
                    className={`w-full h-14 rounded-full text-lg font-bold shadow-lg transition-all hover:scale-105 ${highlight ? "bg-white text-primary hover:bg-emerald-50" : "bg-primary hover:bg-emerald-600 text-white border border-emerald-400/20"}`}
                  >
                    Daftar Sekarang
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
