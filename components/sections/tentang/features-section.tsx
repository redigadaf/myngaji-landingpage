"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, GraduationCap, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlobalIllustration, PersonalIllustration, ExpertIllustration } from "./feature-illustrations";

const features = [
  {
    id: "global",
    title: "Jangkauan Global",
    description: "Menghimpunkan pelajar daripada pelbagai latar belakang dari negara seperti Malaysia, Singapura, Indonesia, Australia, Saudi Arabia, Qatar, UAE, dan Brunei sejak tahun 2022.",
    icon: Globe,
    color: "bg-blue-500",
  },
  {
    id: "personal",
    title: "Pembelajaran Personal",
    description: "Membantu setiap pelajar melalui sesi pembelajaran mengikut tahap masing-masing dengan pendekatan yang fleksibel.",
    icon: LayoutList,
    color: "bg-teal-500",
  },
  {
    id: "expert",
    title: "Bimbingan Pakar",
    description: "Disertai bimbingan yang jelas, tersusun dan berterusan oleh asatizah yang kompeten & komited dalam bidang masing-masing.",
    icon: GraduationCap,
    color: "bg-yellow-500",
  },
];

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="container mx-auto px-8 md:px-16 xl:px-24 pt-0 pb-16 md:pb-12">
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl text-primary md:text-5xl font-bold tracking-tight mb-6">
          Temui keunikan <span className="text-secondary font-black">"Myngaji"</span> — rakan pembelajaran anda untuk kejayaan.
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg">
          Temui manfaat luar biasa Myngaji, direka khusus untuk memudahkan perjalanan pembelajaran anda dan memacu kejayaan anda dengan yakin.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left Column: Feature List */}
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          {features.map((feature, index) => {
            const isActive = activeFeature === index;
            return (
              <motion.div key={feature.id} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}>
                <div
                  onClick={() => setActiveFeature(index)}
                  className={cn(
                    "group cursor-pointer rounded-2xl border p-6 transition-all duration-300",
                    isActive ? "bg-white dark:bg-zinc-900 border-primary shadow-lg scale-[1.02]" : "bg-transparent border-stone-200 dark:border-zinc-800 hover:bg-white/50 dark:hover:bg-zinc-900/50 hover:border-primary/50",
                  )}
                >
                  <div className="flex gap-4 items-start">
                    <div className={cn("p-3 rounded-xl transition-colors duration-300 shrink-0", isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary")}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className={cn("text-xl font-bold transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary/80")}>{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Visual */}
        <div className="relative h-[320px] md:h-[500px] w-full bg-white dark:bg-zinc-900 rounded-3xl border border-stone-200 dark:border-zinc-800 overflow-hidden shadow-sm flex items-center justify-center p-8 order-1 lg:order-2">
          <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              {features[activeFeature].id === "global" && <GlobalIllustration />}
              {features[activeFeature].id === "personal" && <PersonalIllustration />}
              {features[activeFeature].id === "expert" && <ExpertIllustration />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
