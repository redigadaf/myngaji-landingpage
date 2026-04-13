import Link from "next/link";
import { Check, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PakejKelas } from "@/components/sections/data/data-pakej-kelas";

interface PakejHargaProps {
  data: PakejKelas;
}

const features = [
  { label: "Akses Penuh Modul", highlight: false },
  { label: "Jadual Fleksibel", highlight: false },
  { label: "Bimbingan Personal", highlight: false },
  { label: "Sijil Penyertaan", highlight: true },
  { label: "Penilaian Berkala", highlight: false },
];

export function PakejHarga({ data }: PakejHargaProps) {
  return (
    <section className="py-24 bg-[#0a2e1a] text-white relative overflow-hidden">
      {/* Bg Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="border-emerald-400/50 text-emerald-300 bg-emerald-900/30 mb-4 px-4 py-1">
            Yuran Pengajian
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white/95">Berminat Untuk Menyertai?</h2>
          <p className="text-lg text-emerald-100/60 font-light">Hubungi kami untuk mendapatkan maklumat yuran terkini dan pakej yang paling sesuai dengan keperluan anda.</p>
        </div>

        {/* Single CTA Card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-primary shadow-2xl shadow-emerald-500/20 ring-1 ring-emerald-400/30">
            <div className="absolute top-0 right-0 bg-secondary text-primary text-xs font-bold px-5 py-2 rounded-bl-2xl uppercase tracking-widest shadow-lg">Daftar Sekarang</div>

            <div className="p-12 text-center space-y-6">
              {/* Icon */}
              <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mx-auto">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>

              <div>
                <h3 className="text-3xl font-black text-white mb-2">Hubungi HQ MyNgaji</h3>
                <p className="text-white/60 text-lg">Dapatkan maklumat lengkap tentang <span className="text-secondary font-semibold">{data.nama}</span> dan yuran pengajian melalui WhatsApp kami.</p>
              </div>

              {/* Features list */}
              <ul className="space-y-3 text-left max-w-sm mx-auto">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80 font-medium">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${feature.highlight ? "bg-secondary/30 text-secondary" : "bg-white/20"}`}>
                      {feature.highlight
                        ? <Star className="w-3.5 h-3.5 fill-current text-secondary" />
                        : <Check className="w-3.5 h-3.5" />
                      }
                    </div>
                    <span>{feature.label}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="https://wa.me/601131018501" target="_blank" className="flex-1">
                  <Button className="w-full h-14 rounded-full text-lg font-bold bg-white text-primary hover:bg-emerald-50 shadow-lg transition-all hover:scale-105">
                    Daftar Via WhatsApp
                  </Button>
                </Link>
                <Link href="https://wa.me/601131018501" target="_blank" className="flex-1">
                  <Button className="w-full h-14 rounded-full text-lg font-bold bg-primary/40 hover:bg-primary/60 text-white border border-emerald-400/20 transition-all hover:scale-105">
                    Cuba Percuma
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
