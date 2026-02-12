"use client";

import ScrollFloat from "@/components/scroll-float";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { UserRoundCheck, Sparkles, NotebookPen, TrendingUp, CalendarClock, UsersRound, MessageCircle, LibraryBig, GraduationCap, Award, Check, Play, Star } from "lucide-react";
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
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-[200px] aspect-video bg-white rounded-xl shadow-sm border border-stone-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-50/50" />
        <div className="relative z-10 flex gap-4 items-center">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <UsersRound size={20} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-2 w-16 bg-stone-200 rounded-full" />
            <div className="h-2 w-10 bg-stone-200 rounded-full" />
          </div>
        </div>
        {/* Video call controls mockup */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="w-6 h-4 bg-stone-200/50 rounded-sm" />
          <div className="w-6 h-4 bg-primary/20 rounded-sm" />
          <div className="w-6 h-4 bg-stone-200/50 rounded-sm" />
        </div>
      </div>
    </div>
  ),
  "free-trial": (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-sm border border-stone-100 p-4 w-48">
        <div className="flex justify-between items-center mb-4">
          <div className="h-2 w-12 bg-stone-200 rounded-full" />
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">FREE</span>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${i === 0 ? "bg-primary/5 ring-1 ring-primary/20" : "opacity-40"}`}>
              <div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-primary" : "bg-stone-200"}`} />
              <div className="h-1.5 w-20 bg-stone-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  notes: (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative w-40 h-32">
        {/* Back page */}
        <div className="absolute top-0 right-0 w-32 h-40 bg-white border border-stone-200 rounded-lg shadow-sm rotate-6 translate-x-4" />
        {/* Middle page */}
        <div className="absolute top-0 right-0 w-32 h-40 bg-white border border-stone-200 rounded-lg shadow-sm rotate-3 translate-x-2" />
        {/* Front page */}
        <div className="absolute top-0 right-0 w-32 h-40 bg-white border border-stone-100 shadow-md rounded-lg p-3 flex flex-col gap-2">
          <div className="h-2 w-16 bg-primary/20 rounded-full mb-1" />
          <div className="h-1.5 w-full bg-stone-100 rounded-full" />
          <div className="h-1.5 w-full bg-stone-100 rounded-full" />
          <div className="h-1.5 w-2/3 bg-stone-100 rounded-full" />

          <div className="mt-auto flex gap-2">
            <div className="w-8 h-8 rounded-md bg-stone-50 border border-stone-100" />
            <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Check size={14} className="text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  performance: (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-4 w-56 space-y-3">
        <div className="flex gap-2 items-end h-24 pb-2 border-b border-stone-100 px-2">
          <div className="w-1/4 h-[40%] bg-primary/20 rounded-t-sm" />
          <div className="w-1/4 h-[60%] bg-primary/40 rounded-t-sm" />
          <div className="w-1/4 h-[50%] bg-primary/30 rounded-t-sm" />
          <div className="w-1/4 h-[90%] bg-primary rounded-t-sm relative group">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] py-0.5 px-1.5 rounded opacity-100">98%</div>
          </div>
        </div>
        <div className="flex justify-between items-center px-1">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-8 h-1.5 bg-stone-100 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  ),
  "flexible-time": (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-3 w-52">
        <div className="flex gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center text-xs font-bold text-stone-400">09</div>
          <div className="flex-1 py-1 space-y-1">
            <div className="h-1.5 w-12 bg-stone-200 rounded-full" />
            <div className="h-1.5 w-full bg-stone-100 rounded-full" />
          </div>
        </div>
        <div className="flex gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">10</div>
          <div className="flex-1 py-1 space-y-1 p-1.5 rounded-md bg-stone-50">
            <div className="h-1.5 w-16 bg-primary/20 rounded-full" />
            <div className="flex justify-between w-full">
              <div className="h-1.5 w-10 bg-primary/10 rounded-full" />
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-3 opacity-40">
          <div className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center text-xs font-bold text-stone-400">11</div>
          <div className="flex-1 py-1 space-y-1">
            <div className="h-1.5 w-10 bg-stone-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  ),
  "all-ages": (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="flex items-end gap-2">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200" />
          <div className="w-12 h-16 rounded-t-xl bg-stone-100 border-x border-t border-stone-200" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20" />
          <div className="w-14 h-20 rounded-t-xl bg-primary/5 border-x border-t border-primary/20 relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary/20 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-stone-50 border border-stone-200" />
          <div className="w-16 h-24 rounded-t-xl bg-stone-50 border-x border-t border-stone-200" />
        </div>
      </div>
    </div>
  ),
  whatsapp: (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 w-48 overflow-hidden">
        <div className="h-8 bg-stone-50 border-b border-stone-100 flex items-center px-3 gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div className="p-3 space-y-3">
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-stone-200 flex-shrink-0" />
            <div className="bg-stone-100 rounded-r-lg rounded-bl-lg p-2 text-[8px] text-stone-500 w-full">Assalamualaikum, kelas hari ini pukul berapa?</div>
          </div>
          <div className="flex gap-2 flex-row-reverse">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0" />
            <div className="bg-primary text-white rounded-l-lg rounded-br-lg p-2 text-[8px] w-full">Waalaikumussalam, kelas bermula jam 8.00 malam Puan.</div>
          </div>
        </div>
      </div>
    </div>
  ),
  modules: (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="grid grid-cols-2 gap-2 w-48">
        <div className="aspect-square rounded-xl bg-primary text-white flex flex-col items-center justify-center p-2 shadow-lg shadow-primary/20">
          <Play size={20} fill="currentColor" className="mb-1" />
          <div className="h-1 w-8 bg-white/30 rounded-full" />
        </div>
        <div className="aspect-square rounded-xl bg-white border border-stone-100 flex flex-col items-center justify-center p-2">
          <div className="w-8 h-8 rounded-full bg-stone-100 mb-2" />
          <div className="h-1 w-8 bg-stone-200 rounded-full" />
        </div>
        <div className="aspect-square rounded-xl bg-white border border-stone-100 flex flex-col items-center justify-center p-2">
          <div className="w-8 h-2 bg-stone-100 rounded-sm mb-1" />
          <div className="w-8 h-2 bg-stone-100 rounded-sm mb-1" />
          <div className="w-5 h-2 bg-stone-100 rounded-sm" />
        </div>
        <div className="aspect-square rounded-xl bg-stone-50 border border-stone-100 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-stone-200/20" />
          <div className="w-4 h-4 rounded-full border-2 border-stone-300" />
        </div>
      </div>
    </div>
  ),
  tutor: (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative">
        <div className="w-32 h-40 bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden flex flex-col items-center pt-6">
          <div className="w-16 h-16 rounded-full bg-stone-100 border-2 border-white shadow-sm mb-3 overflow-hidden relative">
            <UsersRound className="w-full h-full p-3 text-stone-300" />
          </div>
          <div className="h-2 w-20 bg-stone-800 rounded-full mb-1" />
          <div className="h-1.5 w-12 bg-stone-400 rounded-full" />

          <div className="mt-auto w-full bg-primary/5 h-8 flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={8} fill="currentColor" className="text-yellow-400" />
            ))}
          </div>
        </div>
        <div className="absolute -right-4 top-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-l-md shadow-sm">CERTIFIED</div>
      </div>
    </div>
  ),
  certificate: (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative w-56 aspect-[1.4] bg-white border-4 border-stone-100 outline outline-1 outline-stone-200 rounded-sm shadow-sm p-4 flex flex-col items-center text-center">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <Award size={16} className="text-primary" />
        </div>
        <div className="h-1.5 w-24 bg-stone-800 rounded-full mb-1" />
        <div className="h-1 w-32 bg-stone-200 rounded-full mb-3" />

        <div className="w-full flex-1 flex items-center justify-center bg-stone-50 rounded border border-stone-100 border-dashed">
          <div className="h-8 w-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-yellow-400 border-dashed" />
          </div>
        </div>
      </div>
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
  return (
    <div className="w-full min-h-svh place-content-center bg-stone-50 py-24 md:py-32">
      <div className="container mx-auto px-6 text-stone-900 xl:px-12">
        <div className="flex flex-col gap-16 items-center">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <GradualSpacing className="text-xl md:text-2xl uppercase tracking-wide text-primary font-black mb-4" text="Kelebihan Kami" />
            <div className="flex flex-wrap justify-center gap-x-3 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-tight">
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

              return (
                <motion.div key={phase.id} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants} className="h-full">
                  <GlowCard
                    glowColor="myngaji"
                    customSize
                    className="group !block !w-full !h-full !p-0 !gap-0 overflow-hidden !rounded-3xl border border-stone-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/20"
                  >
                    <div className="flex flex-col h-full justify-between">
                      <div className="p-8 pb-0">
                        <div className="mb-6 flex items-start justify-between">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                            <Icon strokeWidth={2} className="h-7 w-7" />
                          </div>
                        </div>

                        <div className="mb-6">
                          <h3 className="mb-3 text-xl font-bold text-stone-900 group-hover:text-primary transition-colors">{phase.title}</h3>
                          <p className="text-gray-600 leading-relaxed text-sm">{phase.description}</p>
                        </div>
                      </div>

                      {/* Illustration Area */}
                      <div className="mt-auto w-full aspect-[16/9] bg-stone-50 border-t border-stone-100 relative overflow-hidden group-hover:bg-primary/5 transition-colors">
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
