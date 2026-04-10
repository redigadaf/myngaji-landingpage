"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { AlertCircle, HelpCircle } from "lucide-react";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { useRef } from "react";

const painPoints = [
  "Rasa malu nak mula…",
  "Takut orang judge…",
  "Bila baca, masih tersekat-sekat…",
  "Lebih menyedihkan — Al-Quran ada, tapi jarang dibaca dengan yakin.",
  "Anak rendah diri kerana ketinggalan",
];

export function PainPoints() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress for the whole section
  // Higher height for the container to allow for "sticky" scrolling duration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative bg-[#fafaf9] border-t border-stone-200 pb-20">
      {/* 
          We use a container with extra height to create the "pinned" effect.
          Total items = 5. Let's make it 300vh for a comfortable scroll duration.
      */}
      <div className="h-[300vh] relative">
        {/* Sticky wrapper */}
        <div className="sticky top-0 h-screen flex flex-col justify-center items-center py-4 md:py-8 overflow-hidden">
          {/* Background Subtle Gradient */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-stone-200/20 to-transparent"></div>
          
          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full">
            {/* Constrained Header */}
            <div className="max-w-4xl mx-auto text-center mb-6 md:mb-10 px-4">
              <GradualSpacing 
                text="DILEMA YANG DIHADAPI" 
                className="text-primary font-black tracking-[0.2em] text-[10px] md:text-xs mb-4 opacity-60 flex justify-center"
              />
              
              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-black text-primary leading-[1.2] tracking-tight"
              >
                Masih merangkak baca <span className="text-secondary">Al-Quran</span> walaupun dah bertahun cuba? 🤍
              </motion.h2>
              
              <motion.p
                className="text-base md:text-lg text-stone-500 font-medium mt-4 max-w-2xl mx-auto"
              >
                Dah 2026 tapi anak masih belum khatam al-Quran walaupun sekali?
              </motion.p>
            </div>

            {/* Constrained Main Grid */}
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                
                {/* Left side: Pain Points List (with Scroll Logic) */}
                <div className="relative pl-8 space-y-6 md:space-y-8 py-2">
                  {/* Vertical line indicator */}
                  <div className="absolute left-[3px] top-4 bottom-4 w-[2px] bg-stone-200"></div>
                  
                  {painPoints.map((point, index) => {
                    // Start after some initial scroll (e.g. 15% into the section)
                    const startShift = 0.15;
                    const start = startShift + (index * 0.12); 
                    const end = start + 0.18;
                    
                    // Transform for text color (Snappy)
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const textColor = useTransform(
                      scrollYProgress,
                      (val) => val >= end ? "#1c1917" : "#a8a29e"
                    );

                    // Smooth Entrance (Opacity & Y)
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const y = useTransform(scrollYProgress, [start, end], [20, 0]);
                    
                    // Transform for dot color (Snappy)
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const dotColor = useTransform(
                      scrollYProgress,
                      (val) => val >= end ? "#17838F" : "#d6d3d1"
                    );

                    // Transform for dot scale (Smooth)
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const dotScale = useTransform(
                      scrollYProgress,
                      [start, end],
                      [0.5, 1.4]
                    );

                    return (
                      <motion.div
                        key={index}
                        style={{ opacity, y }}
                        className="relative"
                      >
                        {/* Indicator dot */}
                        <motion.div 
                          style={{ backgroundColor: dotColor, scale: dotScale }}
                          className="absolute -left-[36px] top-2 w-4 h-4 rounded-full border-2 border-[#fafaf9] shadow-sm z-10"
                        />
                        
                        <motion.p 
                          style={{ color: textColor }}
                          className="text-lg md:text-xl font-black leading-tight cursor-default tracking-tight"
                        >
                          {point}
                        </motion.p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right side: Empathy Card */}
                <motion.div
                  style={{ 
                    opacity: useTransform(scrollYProgress, [0.82, 0.92], [0, 1]),
                    y: useTransform(scrollYProgress, [0.82, 0.92], [20, 0])
                  }}
                  className="block h-fit mt-8 lg:mt-0"
                >
                  <div 
                    className="p-0 rounded-[2rem] border-none shadow-xl overflow-hidden bg-white"
                  >
                    <div className="p-6 md:p-8 flex flex-col bg-white relative overflow-hidden">
                      {/* Decorative background icon */}
                      <div className="absolute -bottom-10 -right-10 opacity-[0.03]">
                        <HelpCircle className="w-48 md:w-56 h-48 md:h-56 text-primary" />
                      </div>

                      <div className="relative z-10">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                          <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                        </div>
                        
                        <h3 className="text-lg md:text-xl lg:text-2xl font-black text-stone-900 mb-3 md:mb-4 tracking-tight">
                          Kami Faham Perasaan Anda
                        </h3>
                        
                        <div className="space-y-3 md:space-y-4">
                          <p className="text-stone-600 leading-relaxed text-xs md:text-sm lg:text-base font-medium">
                            Belajar Al-Quran bukan soal siapa paling cepat, tapi soal istiqamah dan keinginan untuk memperbaiki diri.
                          </p>
                          
                          <div className="pt-3 md:pt-4 border-t border-stone-100 italic">
                            <p className="text-primary font-bold text-sm md:text-base">
                              &quot;Langkah kecil hari ini, besar nilainya di sisi Allah.&quot;
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
