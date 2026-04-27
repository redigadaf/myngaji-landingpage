"use client";

import { motion } from "framer-motion";
import { ShinyButton } from "@/components/shiny-button";
import { Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-12 bg-[#0a2529] overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Dashed Lines Background */}
      <div className="absolute inset-0 flex items-center justify-center -z-0 pointer-events-none">
        <div className="w-full h-px border-t border-dashed border-teal-800/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10 bg-[#0a2529] md:bg-transparent">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
          <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm md:text-base">Bersedia untuk Mula?</span>
        </motion.div>

        {/* Main Typography */}
        <motion.h2 initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-12">
          KAMI SEDIA <br className="hidden md:block" /> MEMBANTU
        </motion.h2>

        <div className="relative inline-flex items-center justify-center">
          <a 
            href="https://dashboard.myngaji.com/daftar-trial" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block relative z-10"
          >
            <ShinyButton className="!px-12 !py-6 !text-lg md:!text-xl font-bold shadow-2xl hover:scale-105 transition-transform duration-300">
              Tempah Slot Percubaan
            </ShinyButton>
          </a>

          {/* Floating 'Sticker' Badge with StickerPeel */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-8 hidden md:block z-20">
            <div className="w-[220px] h-14 bg-white flex items-center justify-center gap-3 px-3 rounded-xl border border-slate-200 shadow-xl rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-default select-none">
              <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                <Sparkles className="w-4 h-4 fill-primary/20 animate-pulse" />
              </div>
              <div className="flex flex-col items-start justify-center">
                <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest leading-none mb-0.5">Mari Serta</span>
                <span className="text-lg font-black text-slate-800 tracking-tighter leading-none italic">
                  JOM <span className="text-primary underline decoration-wavy decoration-secondary/50 decoration-2 underline-offset-2">NGAJI!</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-teal-200/50 mt-16 text-sm max-w-md mx-auto">Sertai ribuan pelajar lain yang telah mendapat manfaat daripada bimbingan asatizah kami.</p>
      </div>
    </section>
  );
}
