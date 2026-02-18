"use client";

import Image from "next/image";

import React from "react";
import ScrollFloat from "@/components/scroll-float";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { UserRoundCheck, Sparkles, NotebookPen, TrendingUp, CalendarClock, UsersRound, MessageCircle, LibraryBig, GraduationCap, Award, Star } from "lucide-react";
import { GlowCard } from "@/components/spotlight-card";
import kelebihanData from "@/components/sections/data/data-kelebihan.json";
import { motion, type Variants } from "framer-motion";

// Icon Mapping
const ICON_MAP: Record<string, any> = {
  UserRoundCheck,
  Sparkles,
  NotebookPen,
  TrendingUp,
  CalendarClock,
  UsersRound,
  MessageCircle,
  LibraryBig,
  GraduationCap,
  Award,
};

// Illustration Mapping
const ILLUSTRATION_MAP: Record<string, React.ReactNode> = {
  "video-call": (
    <div className="w-full h-full flex items-center justify-center p-8">
      <Image src="/assets/kelebihan/video-call.svg" alt="Video Call" width={200} height={200} className="w-full h-full object-contain" />
    </div>
  ),
  "free-trial": (
    <div className="w-full h-full flex items-center justify-center p-8">
      <Image src="/assets/kelebihan/free-trial.svg" alt="Free Trial" width={200} height={200} className="w-full h-full object-contain" />
    </div>
  ),
  notes: (
    <div className="w-full h-full flex items-center justify-center p-1">
      <Image src="/assets/kelebihan/notes.svg" alt="Notes" width={200} height={200} className="w-full h-full object-contain" />
    </div>
  ),
  performance: (
    <div className="w-full h-full flex items-center justify-center p-8">
      <Image src="/assets/kelebihan/performance.svg" alt="Performance" width={200} height={200} className="w-full h-full object-contain" />
    </div>
  ),
  "flexible-time": (
    <div className="w-full h-full flex items-center justify-center p-8">
      <Image src="/assets/kelebihan/flexible-time.svg" alt="Flexible Time" width={200} height={200} className="w-full h-full object-contain" />
    </div>
  ),
  "all-ages": (
    <div className="w-full h-full flex items-center justify-center p-8">
      <Image src="/assets/kelebihan/all-ages.svg" alt="All Ages" width={200} height={200} className="w-full h-full object-contain" />
    </div>
  ),
  whatsapp: (
    <div className="w-full h-full flex items-center justify-center p-6">
      <Image src="/assets/kelebihan/whatsapp.svg" alt="Whatsapp Group" width={200} height={200} className="w-full h-full object-contain" />
    </div>
  ),
  modules: (
    <div className="w-full h-full flex items-center justify-center p-4">
      <Image src="/assets/kelebihan/modules.svg" alt="Modules" width={200} height={200} className="w-full h-full object-contain" />
    </div>
  ),
  tutor: (
    <div className="w-full h-full flex items-center justify-center p-2">
      <Image src="/assets/kelebihan/tutor.svg" alt="Certified Tutor" width={200} height={200} className="w-full h-full object-contain" />
    </div>
  ),
  certificate: (
    <div className="w-full h-full flex items-center justify-center p-2">
      <Image src="/assets/kelebihan/certificate.svg" alt="Certificate" width={200} height={200} className="w-full h-full object-contain" />
    </div>
  ),
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: (index % 3) * 0.1,
      duration: 0.6,
      type: "spring",
      stiffness: 50,
      damping: 20,
    },
  }),
};

export function KelebihanSection() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    if (!isMobile) return;

    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Trigger when item enters the middle 10% of screen
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
    <div className="w-full min-h-svh place-content-center bg-stone-50 py-24 md:py-32">
      <div className="container mx-auto px-6 text-stone-900 xl:px-12">
        <div className="flex flex-col gap-16 items-center">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <GradualSpacing className="text-xl md:text-2xl uppercase tracking-wide text-primary font-black mb-4" text="Kelebihan Kami" />
            <div className="flex flex-wrap justify-center gap-x-2 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-tight">
              <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03} containerClassName="text-primary !my-0">
                Kenapa Anda Perlu Memilih
              </ScrollFloat>
              <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03} containerClassName="text-secondary !my-0">
                MyNgaji?
              </ScrollFloat>
            </div>
            <p className="max-w-2xl text-lg text-gray-600 leading-relaxed mx-auto">
              Kami komited untuk menyediakan pengalaman pembelajaran Al-Quran yang terbaik, mudah, dan berkesan. Pendekatan kami direka khas untuk membantu anda menguasai Al-Quran dengan yakin.
            </p>
          </div>

          {/* Grid Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto overflow-hidden p-4 -m-4">
            {kelebihanData.map((phase, index) => {
              const Icon = ICON_MAP[phase.iconKey] || Star;
              const Illustration = ILLUSTRATION_MAP[phase.illustrationKey] || null;
              const isActive = isMobile && activeIndex === index;

              return (
                <motion.div
                  key={phase.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  data-index={index} // Added for observer
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={cardVariants}
                  className={`h-full ${index === kelebihanData.length - 1 ? "lg:col-start-2" : ""}`}
                >
                  <GlowCard
                    glowColor="myngaji"
                    customSize
                    className={`group !block !w-full !h-full !p-0 !gap-0 overflow-hidden !rounded-3xl border bg-white shadow-sm transition-all duration-300 ${
                      isActive ? "shadow-xl -translate-y-1 border-primary/20" : "border-stone-200 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20"
                    }`}
                  >
                    <div className="flex flex-col h-full justify-between">
                      <div className="p-8 pb-0">
                        <div className="mb-6 flex items-start justify-between">
                          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${isActive ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"}`}>
                            <Icon strokeWidth={2} className="h-7 w-7" />
                          </div>
                        </div>

                        <div className="mb-6">
                          <h3 className={`mb-3 text-xl font-bold transition-colors ${isActive ? "text-primary" : "text-stone-900 group-hover:text-primary"}`}>{phase.title}</h3>
                          <p className="text-gray-600 leading-relaxed text-sm">{phase.description}</p>
                        </div>
                      </div>

                      {/* Illustration Area */}
                      <div className={`mt-auto w-full aspect-[16/9] border-t border-stone-100 relative overflow-hidden transition-colors ${isActive ? "bg-primary/5" : "bg-stone-50 group-hover:bg-primary/5"}`}>
                        {Illustration}

                        {/* Gradient Overlay for seamless integration */}
                        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent opacity-50" />
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
