"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Gift, ArrowRight, Timer, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OfferProps {
  data: {
    price: string;
    priceSub: string;
    bonuses: string[];
    urgency: string;
    riskReversal: string;
  };
  packageName?: string;
  packageDesc?: string;
  featureList?: string[];
}

export function Offer({ 
  data, 
  packageName = "Bimbingan Personal", 
  packageDesc = "Sesi One-to-One Fokus 100%",
  featureList = ["Pelajaran Fleksibel", "Guru Bertauliah", "Modul Sistematik"]
}: OfferProps) {
  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(23,131,143,0.15),0_15px_40px_-10px_rgba(0,0,0,0.05)] border border-stone-100 overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left Side: The Package */}
            <div className={`flex-1 p-8 md:p-12 relative overflow-hidden bg-primary shadow-inner`}>
              {/* Subtle Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-8">
                  <Sparkles className="w-3 h-3 text-secondary" />
                  <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em]">Eksklusif</span>
                </div>

                <h3 className="text-3xl font-black text-white mb-2">{packageName}</h3>
                <p className="text-white/60 font-medium text-sm mb-10">{packageDesc}</p>
                
                <div className="flex flex-col gap-1 mb-10">
                  <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Yuran Bulanan</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white tracking-tighter">{data.price}</span>
                    <span className="text-white/50 font-bold text-sm">{data.priceSub}</span>
                  </div>
                </div>

                <ul className="space-y-5 mb-12">
                  {featureList.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/90 font-bold text-sm">
                      <div className="flex-shrink-0 w-5 h-5 bg-secondary flex items-center justify-center rounded-full">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <Button className="w-full py-8 rounded-2xl text-lg font-black bg-white text-primary hover:bg-stone-50 shadow-2xl shadow-black/20 group transition-all border-none">
                  Sertai Kelas Percubaan
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Right Side: Bonuses & Urgency */}
            <div className="flex-1 p-8 md:p-12 bg-stone-50/50 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-black text-stone-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-secondary" />
                  Bonus Eksklusif
                </h4>
                <div className="space-y-4 mb-10">
                  {data.bonuses.map((bonus, i) => (
                    <div key={i} className="flex items-center gap-3 text-stone-600 font-bold text-sm bg-white p-3 rounded-xl border border-stone-100 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      {bonus}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-stone-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Timer className="w-5 h-5 text-secondary animate-pulse" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-stone-900 uppercase tracking-wider mb-1">Slot Terhad</h5>
                    <p className="text-stone-500 text-[11px] leading-relaxed font-bold">
                      {data.urgency}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-stone-100 shadow-sm mt-6">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <p className="text-[10px] font-black text-stone-600 uppercase tracking-tight">{data.riskReversal}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
