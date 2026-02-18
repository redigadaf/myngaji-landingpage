import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ScrollFloat from "@/components/scroll-float";

import { classesData, type PakejKelas } from "@/components/sections/data/data-pakej-kelas";

const classes: PakejKelas[] = classesData;

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
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Organise data into columns
  const column1 = [classes[0], classes[3]]; // Index 0 (Dark), Index 3 (Dark)
  const column2 = [classes[1], classes[4]]; // Index 1 (Light), Index 4 (Light)
  const column3 = [classes[2], classes[5]]; // Index 2 (Dark), Index 5 (Light)

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

  const renderCard = (item: PakejKelas, index: number) => {
    // Determine if the card should be dark based on the original classes array index.
    const originalIndex = classes.findIndex((c) => c === item);
    const isDark = originalIndex === 1 || originalIndex === 3 || originalIndex === 5;
    const isActive = isMobile && activeIndex === originalIndex;

    return (
      <motion.div key={item.slug} custom={originalIndex} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
        <div
          ref={(el) => {
            cardRefs.current[originalIndex] = el;
          }}
          data-index={originalIndex}
          className={`group relative h-full rounded-[2.5rem] p-8 pb-10 flex flex-col items-center text-center overflow-hidden transition-all duration-500 ease-out ${
            isDark
              ? isActive
                ? "bg-primary shadow-2xl shadow-primary/40 scale-[1.03]"
                : "bg-primary shadow-xl shadow-primary/20"
              : isActive
                ? "bg-white border-primary/50 shadow-[0_20px_40px_rgb(0,0,0,0.12)] scale-[1.03]"
                : "bg-white border-slate-100 border shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1"
          }`}
        >
          <div className={`mb-6 transition-colors duration-300 ${isDark ? "text-white" : isActive ? "text-primary" : "text-primary"}`}>
            <div className="relative w-16 h-16">
              <Image src={item.icon} alt={item.nama} fill className={`object-contain ${isDark ? "brightness-0 invert" : ""}`} />
            </div>
          </div>
          <h3 className={`text-xl font-semibold mb-1 transition-colors duration-300 ${isDark ? "text-white" : isActive ? "text-primary" : "text-slate-900"}`}>{item.nama}</h3>

          <p className={`text-sm leading-relaxed mb-8 mt-4 transition-colors duration-300 ${isDark ? "text-white/80" : isActive ? "text-slate-600" : "text-slate-500"}`}>{item.deskripsi[0]}</p>

          <Link href={`/pakej-kelas/${item.slug}`} className="mt-auto">
            <motion.button
              whileHover="hover"
              whileTap="tap"
              animate={isActive ? "hover" : "rest"}
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.1 },
                tap: { scale: 0.95 },
              }}
              className={`w-14 h-14 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                isDark
                  ? isActive
                    ? "bg-slate-100 text-primary" // Active Dark Card Button
                    : "bg-white text-primary hover:bg-slate-100"
                  : isActive
                    ? "bg-primary text-white" // Active Light Card Button
                    : "bg-primary text-white hover:bg-primary/90"
              }`}
            >
              <motion.div
                animate={isActive ? { rotate: 45 } : { rotate: 0 }}
                variants={{
                  hover: { rotate: 45 },
                }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="w-6 h-6 md:w-5 md:h-5" />
              </motion.div>
            </motion.button>
          </Link>
          <div
            className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary transform transition-transform duration-500 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
          />
        </div>
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
