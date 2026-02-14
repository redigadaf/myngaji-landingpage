"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ScrollFloat from "@/components/scroll-float";

import classesData from "@/components/sections/data/data-pakej-kelas.json";

interface ClassItem {
  title: string;
  description: string;
  icon: string;
}

const classes: ClassItem[] = classesData;

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.2, 0.8, 0.2, 1] as const, // Smooth cubic-bezier
    },
  }),
};

export const SenaraiPakejKelas = () => {
  // Organize data into columns
  const column1 = [classes[0], classes[3]]; // Index 0 (Dark), Index 3 (Dark)
  const column2 = [classes[1], classes[4]]; // Index 1 (Light), Index 4 (Light)
  const column3 = [classes[2], classes[5]]; // Index 2 (Dark), Index 5 (Light)

  const renderCard = (item: ClassItem, index: number) => {
    // Determine if the card should be dark based on the original classes array index.
    // We need to find the original index of the item.
    const originalIndex = classes.findIndex((c) => c === item);
    const isDark = originalIndex === 1 || originalIndex === 3 || originalIndex === 5;

    return (
      <motion.div
        key={item.title}
        custom={originalIndex}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className={`group relative rounded-[2.5rem] p-8 pb-10 flex flex-col items-center text-center overflow-hidden transition-shadow duration-300 ${
          isDark ? "bg-primary shadow-xl shadow-primary/20" : "bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
        }`}
      >
        <div className={`mb-6 ${isDark ? "text-white" : "text-primary"}`}>
          <div className="relative w-16 h-16">
            <Image src={item.icon} alt={item.title} fill className={`object-contain ${isDark ? "brightness-0 invert" : ""}`} />
          </div>
        </div>
        <h3 className={`text-xl font-semibold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>{item.title}</h3>

        {/* Optional Subtitle - keeping simple for now or using description part if needed. 
            User example had subtitle, but data doesn't. 
            We'll skip subtitle to "pertahankan isi konten". 
        */}

        <p className={`text-sm leading-relaxed mb-8 mt-4 ${isDark ? "text-white/80" : "text-slate-500"}`}>{item.description}</p>

        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={{
            hover: { scale: 1.1 },
            tap: { scale: 0.95 },
          }}
          className={`mt-auto w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDark ? "bg-white text-primary hover:bg-slate-100" : "bg-primary text-white hover:bg-primary/90"}`}
        >
          <motion.div
            variants={{
              hover: { rotate: 45 },
            }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight className="w-5 h-5" />
          </motion.div>
        </motion.button>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </motion.div>
    );
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 mb-16 text-center">
          <ScrollFloat containerClassName="!my-0" textClassName="text-3xl md:text-5xl font-black tracking-tight">
            <span className="text-primary">SENARAI </span>
            <span className="text-secondary">PAKEJ KELAS.</span>
          </ScrollFloat>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Column 1 */}
          <div className="flex flex-col gap-6 lg:gap-8">{column1.map((item, i) => renderCard(item, i))}</div>

          {/* Column 2 (Offset Top) */}
          <div className="flex flex-col gap-6 lg:gap-8 lg:mt-16">{column2.map((item, i) => renderCard(item, i))}</div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6 lg:gap-8">{column3.map((item, i) => renderCard(item, i))}</div>
        </div>
      </div>
    </section>
  );
};
