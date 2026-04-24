"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Gift, ArrowRight, Timer, ShieldCheck, User, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface OfferProps {
  data: {
    price: string;
    priceSub: string;
    bonuses: string[];
    urgency: string;
    riskReversal: string;
  };
  category?: "alquran" | "arab" | "hafazan" | "kafa";
}

export function Offer({ 
  data,
  category = "alquran"
}: OfferProps) {
  const [target, setTarget] = useState<"adult" | "kid">(category === "kafa" ? "kid" : "adult");
  const [type, setType] = useState<"full" | "trial">("full");

  // Price adjustment logic (fictional for now based on data)
  const displayPrice = type === "trial" ? "FREE" : data.price;
  const displayPriceSub = type === "trial" ? "Sesi Percubaan" : data.priceSub;

  const features = [
    "Sesi 1-ke-1 (Personal)",
    "Penilaian Tahap Percuma",
    "Guru Bertauliah & Berpengalaman",
    "Silibus Sistematik & Berkesan",
    category === "kafa" ? "Silibus UPKK & PSRA" : (target === "adult" ? "Jadual Fleksibel (Dewasa)" : "Teknik Interaktif (Kanak-kanak)")
  ];

  return (
    <section className="py-24 bg-stone-50 overflow-hidden" id="daftar-sekarang">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black text-primary mb-4"
            >
              Sertai Kami Sekarang
            </motion.h2>
            <p className="text-stone-500 font-medium">
              {category === "kafa" ? "Pilih pakej bimbingan agama terbaik untuk anak anda." : "Pilih pakej yang paling sesuai untuk bimbingan anda atau anak-anak."}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(23,131,143,0.15),0_15px_40px_-10px_rgba(0,0,0,0.05)] border border-stone-100 overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Left Side: Configuration & Details */}
            <div className={`flex-1 p-8 md:p-12 relative overflow-hidden bg-primary shadow-inner`}>
              {/* Subtle Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex flex-wrap gap-4 mb-10">
                  {/* Target Toggle - Hidden for KAFA */}
                  {category !== "kafa" && (
                    <div className="flex bg-black/10 backdrop-blur-sm p-1 rounded-xl border border-white/10">
                      <button 
                        onClick={() => setTarget("adult")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all ${target === "adult" ? "bg-white text-primary shadow-lg" : "text-white/60 hover:text-white"}`}
                      >
                        <User className="w-3 h-3" />
                        DEWASA
                      </button>
                      <button 
                        onClick={() => setTarget("kid")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all ${target === "kid" ? "bg-white text-primary shadow-lg" : "text-white/60 hover:text-white"}`}
                      >
                        <Baby className="w-3 h-3" />
                        KANAK-KANAK
                      </button>
                    </div>
                  )}

                  {/* Type Toggle */}
                  <div className="flex bg-black/10 backdrop-blur-sm p-1 rounded-xl border border-white/10">
                    <button 
                      onClick={() => setType("full")}
                      className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${type === "full" ? "bg-secondary text-primary shadow-lg" : "text-white/60 hover:text-white"}`}
                    >
                      PENDAFTARAN PENUH
                    </button>
                    <button 
                      onClick={() => setType("trial")}
                      className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${type === "trial" ? "bg-secondary text-primary shadow-lg" : "text-white/60 hover:text-white"}`}
                    >
                      PERCUBAAN
                    </button>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-3xl font-black text-white mb-2">
                    Kelas {category === "alquran" ? "Al-Quran" : category === "arab" ? "Bahasa Arab" : category === "hafazan" ? "Hafazan" : "KAFA"}
                  </h3>
                  <p className="text-white/60 font-medium text-sm">
                    Bimbingan {target === "adult" ? "Dewasa" : "Kanak-kanak"} — {type === "full" ? "Pendaftaran Terus & Modul Lengkap" : "Sesi Pengenalan & Penilaian Percuma"}
                  </p>
                </div>
                
                <div className="flex flex-col gap-1 mb-10">
                  <span className="text-white/50 text-xs font-bold uppercase tracking-widest">
                    {type === "trial" ? "Tawaran Terhad" : "Yuran Bulanan"}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={displayPrice}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-5xl font-black text-white tracking-tighter"
                      >
                        {displayPrice}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-white/50 font-bold text-sm">{displayPriceSub}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-12 flex-grow">
                  {features.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/90 font-bold text-sm">
                      <div className="flex-shrink-0 w-5 h-5 bg-secondary flex items-center justify-center rounded-full">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <Button className="w-full py-8 rounded-2xl text-lg font-black bg-white text-primary hover:bg-stone-50 shadow-2xl shadow-black/20 group transition-all border-none">
                  {type === "full" ? "Daftar Sekarang" : "Tempah Slot Percubaan"}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Right Side: Bonuses & Info */}
            <div className="flex-1 p-8 md:p-12 bg-stone-50/50 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-black text-stone-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-secondary" />
                  Bonus {type === "full" ? "Eksklusif" : "Penyertaan"}
                </h4>
                <div className="space-y-4 mb-10">
                  {(type === "full" ? data.bonuses : ["Sesi Penilaian 1-ke-1", "Analisa Bacaan Tahap Semasa", "Khidmat Nasihat Modul"]).map((bonus, i) => (
                    <motion.div 
                      key={bonus}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-stone-600 font-bold text-sm bg-white p-3 rounded-xl border border-stone-100 shadow-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      {bonus}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-stone-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-stone-100 italic font-black text-secondary flex items-center justify-center">
                    <Timer className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-stone-900 uppercase tracking-wider mb-1">Status Pengambilan</h5>
                    <p className="text-stone-500 text-[11px] leading-relaxed font-bold">
                      {type === "trial" ? "Tawaran trial sah untuk 7 hari pertama pendaftaran bulan ini sahaja." : data.urgency}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-stone-100 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-[10px] font-black text-stone-900 uppercase tracking-tight">Kualiti Terjamin</p>
                    <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">{data.riskReversal}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
