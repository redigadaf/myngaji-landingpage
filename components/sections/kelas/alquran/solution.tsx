"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, BookOpen, Users, Star, ArrowRight } from "lucide-react";
import ScrollFloat from "@/components/scroll-float";
import { GradualSpacing } from "@/components/ui/gradual-spacing";

const mechanisms = [
  {
    title: "Modul step-by-step",
    desc: "Iqra’ → Al-Quran yang disusun sistematik untuk semua peringkat.",
    icon: BookOpen,
  },
  {
    title: "Fokus makhraj & tajwid",
    desc: "Bukan sekadar baca, kami tekankan sebutan yang betul dan hukum tajwid.",
    icon: Star,
  },
  {
    title: "Kelas kecil / 1-1",
    desc: "Lebih fokus dan personal. Guru boleh beri perhatian penuh kepada anda.",
    icon: Users,
  },
  {
    title: "Guru bertauliah",
    desc: "Guru ditapis & dilatih khas untuk mengajar dengan teknik yang mudah.",
    icon: CheckCircle2,
  },
];

export function Solution() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          setActiveIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle Background Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <GradualSpacing 
                text="SOLUSI KAMI" 
                className="text-secondary font-black tracking-widest text-sm mb-6 justify-start"
            />
            
            <ScrollFloat 
                animationDuration={0.8} 
                ease="back.out(1.4)" 
                containerClassName="!my-0 mb-8"
                textClassName="text-3xl md:text-4xl lg:text-4xl font-black leading-tight block uppercase tracking-tight"
            >
              <span className="text-primary">Di MyNgaji, kami bantu anda dari</span> 
              <br className="hidden md:block" />
              <span className="text-secondary"> Zero </span> 
              <span className="text-primary">→</span> 
              <span className="text-secondary"> Lancar </span> 
              <span className="text-primary">→</span> 
              <span className="text-secondary"> Yakin.</span>
            </ScrollFloat>

            <p className="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed font-medium">
              Kami menggabungkan teknik tradisional yang muktabar dengan teknologi moden untuk memastikan sesiapa sahaja boleh mula membaca Al-Quran dengan mudah.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 flex items-center gap-3 transition-all group"
            >
              Daftar Sekarang
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right Grid */}
          <div className="lg:w-1/2 grid sm:grid-cols-2 gap-5 p-2">
            {mechanisms.map((item, index) => {
              const isActive = isMobile && activeIndex === index;
              return (
                <motion.div
                  key={index}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  data-index={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="h-full"
                >
                  <div
                    className={`group block w-full h-full p-6 rounded-[1.5rem] border transition-all duration-500 overflow-hidden ${
                      isActive 
                        ? "shadow-xl shadow-primary/5 border-primary/20 bg-white -translate-y-1" 
                        : "border-stone-200/60 bg-stone-50 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:bg-white hover:-translate-y-1"
                    }`}
                  >
                    <div className="relative z-10 flex flex-col h-full">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm transition-all duration-300 ${
                        isActive 
                          ? "bg-primary text-white scale-110" 
                          : "bg-white border border-stone-100 group-hover:bg-primary group-hover:text-white group-hover:scale-110"
                      }`}>
                        <item.icon className={`w-6 h-6 transition-colors ${
                          isActive ? "text-white" : "text-primary group-hover:text-white"
                        }`} />
                      </div>
                      
                      <h3 className={`text-lg font-bold mb-2 transition-colors ${
                        isActive ? "text-primary" : "text-stone-900 group-hover:text-primary"
                      }`}>
                        {item.title}
                      </h3>
                      
                      <p className="text-stone-500 leading-relaxed font-medium text-xs md:text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
