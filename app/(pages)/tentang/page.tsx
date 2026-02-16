"use client";

import { Typewriter } from "@/components/ui/typewriter-text";
import { PageHeader } from "@/components/page-header";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, GraduationCap, LayoutList, Users, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "global",
    title: "Jangkauan Global",
    description: "Menghimpunkan pelajar daripada pelbagai latar belakang dari negara seperti Singapura, Saudi Arabia dan Qatar sejak tahun 2022.",
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

export default function TentangPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-zinc-950 pb-20">
      <PageHeader
        title={
          <>
            Tentang <span className="text-secondary">Kami</span>
          </>
        }
        description="Misi kami adalah untuk melahirkan generasi celik Al-Quran dengan kaedah pembelajaran yang mudah, menyeronokkan, dan berkesan."
      />

      {/* Intro Section */}
      <section className="container px-4 py-16 md:py-24 max-w-4xl mx-auto text-center">
        <div className="min-h-[120px]">
          <Typewriter
            text={[
              { text: "Sejak tahun 2022, " },
              { text: "Myngaji", className: "text-primary font-semibold" },
              { text: " menjadi ruang pembelajaran subjek-subjek agama yang menghimpunkan pelajar daripada pelbagai latar belakang dari negara seperti " },
              { text: "Singapura", className: "text-black font-semibold" },
              { text: ", " },
              { text: "Saudi Arabia", className: "text-black font-semibold" },
              { text: " dan " },
              { text: "Qatar", className: "text-black font-semibold" },
              {
                text: ". Dengan pelbagai subjek pengajian Islam yang ditawarkan, kami membantu setiap pelajar melalui sesi pembelajaran mengikut tahap masing-masing, disertai bimbingan yang jelas, tersusun dan berterusan oleh asatizah yang kompeten & komited.",
              },
            ]}
            speed={20}
            className="text-lg md:text-xl leading-relaxed text-slate-600 font-medium dark:text-stone-400 inline-block"
            cursor="|"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-8 md:px-16 xl:px-24 py-16 md:py-48">
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
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveFeature(index)}
                  className={cn(
                    "group cursor-pointer rounded-2xl border p-6 transition-all duration-300",
                    isActive ? "bg-white dark:bg-zinc-900 border-primary/20 shadow-lg scale-[1.02]" : "bg-transparent border-stone-200 dark:border-zinc-800 hover:bg-white/50 dark:hover:bg-zinc-900/50",
                  )}
                >
                  <div className="flex gap-6 items-start">
                    <div className={cn("p-3 rounded-xl transition-colors duration-300", isActive ? "bg-primary" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary")}>
                      <feature.icon className={cn("w-6 h-6", isActive ? "text-white" : "text-currentColor")} />
                    </div>
                    <div className="space-y-2">
                      <h3 className={cn("text-xl font-bold transition-colors", isActive ? "text-primary" : "text-muted-foreground")}>{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
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
    </main>
  );
}

// Illustrations Components

function GlobalIllustration() {
  const nodes = [
    { label: "Singapura", x: "80%", y: "25%", delay: 0 },
    { label: "Qatar", x: "20%", y: "30%", delay: 1 },
    { label: "Saudi Arabia", x: "60%", y: "80%", delay: 2 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Pulse Rings Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/10"
            style={{ width: `${i * 30}%`, height: `${i * 30}%` }}
            animate={{ opacity: [0.3, 0.1, 0.3], scale: [1, 1.05, 1] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Central Hub */}
      <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40">
        <Globe className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
        <div className="absolute inset-[-4px] rounded-full border border-primary/30 animate-ping" />
        <div className="absolute inset-[-12px] rounded-full border border-primary/10 animate-pulse" />
      </div>

      {/* Connecting Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {nodes.map((node, i) => (
          <motion.line
            key={i}
            x1="50%"
            y1="50%"
            x2={node.x}
            y2={node.y}
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/20"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        ))}
      </svg>

      {/* Floating Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute z-20 flex flex-col items-center gap-2"
          style={{ left: node.x, top: node.y, x: "-50%", y: "-50%" }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: node.delay * 0.2, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
            className="bg-card/95 backdrop-blur-sm px-4 py-2 rounded-xl border border-primary/20 shadow-lg flex items-center gap-2"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-xs md:text-sm font-bold text-foreground">{node.label}</span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

function PersonalIllustration() {
  return (
    <div className="relative w-full max-w-xs bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b">
        <div className="space-y-1">
          <div className="h-2 w-20 bg-primary/20 rounded-full" />
          <div className="h-2 w-12 bg-muted rounded-full" />
        </div>
        <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
          <LayoutList className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {[1, 2, 3].map((_, i) => (
          <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.2 }} className="flex items-center gap-3">
            <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", i === 0 ? "border-primary" : "border-muted")}>{i === 0 && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}</div>
            <div className="flex-1 space-y-2">
              <div className="h-2 w-full bg-muted rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Card */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="bg-primary/5 p-3 rounded-lg mt-4">
        <div className="flex justify-between text-xs mb-2 font-medium text-primary">
          <span>Progres Tahap 1</span>
          <span>75%</span>
        </div>
        <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ duration: 1, delay: 1 }} className="h-full bg-primary" />
        </div>
      </motion.div>
    </div>
  );
}

function ExpertIllustration() {
  return (
    <div className="relative w-full max-w-[280px]">
      {/* Teacher Card */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border p-4 z-10 relative">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-lg font-bold">
            <GraduationCap />
          </div>
          <div>
            <div className="h-3 w-24 bg-foreground/80 rounded-full mb-1" />
            <div className="h-2 w-16 bg-muted rounded-full" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full bg-muted/50 rounded-full" />
          <div className="h-2 w-3/4 bg-muted/50 rounded-full" />
        </div>

        <div className="mt-4 flex gap-2">
          <div className="px-3 py-1 bg-secondary/10 text-secondary-foreground text-[10px] rounded-full font-medium">Tajwid</div>
          <div className="px-3 py-1 bg-secondary/10 text-secondary-foreground text-[10px] rounded-full font-medium">Talaqqi</div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -top-6 -right-6 bg-white dark:bg-zinc-800 p-3 rounded-xl shadow-lg border z-20">
        <CheckCircle2 className="w-8 h-8 text-green-500" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-4 -left-4 bg-white dark:bg-zinc-800 py-2 px-4 rounded-xl shadow-lg border z-20 flex items-center gap-2"
      >
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-muted border-2 border-white dark:border-zinc-800" />
          ))}
        </div>
        <span className="text-xs font-medium">+120 Pelajar</span>
      </motion.div>
    </div>
  );
}
