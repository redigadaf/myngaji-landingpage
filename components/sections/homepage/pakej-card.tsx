import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { type PakejKelas } from "@/components/sections/data/data-pakej-kelas";

interface PackageCardProps {
  item: PakejKelas;
  originalIndex: number;
  isDark: boolean;
  isActive: boolean;
  onOpenModal: (item: PakejKelas) => void;
  cardRef?: (el: HTMLDivElement | null) => void;
}

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
      ease: [0.2, 0.8, 0.2, 1] as const,
    },
  }),
};

const PackageCard = ({ item, originalIndex, isDark, isActive, onOpenModal, cardRef }: PackageCardProps) => {
  return (
    <motion.div 
      custom={originalIndex} 
      variants={cardVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-50px" }} 
      className="h-full w-full flex flex-col"
    >
      <div
        ref={cardRef}
        data-index={originalIndex}
        className={`group relative flex-1 w-full min-h-[420px] rounded-[2rem] p-6 pb-8 flex flex-col items-center text-center overflow-hidden transition-all duration-500 ease-out ${
          isDark
            ? isActive
              ? "bg-primary shadow-2xl shadow-primary/40 scale-[1.03]"
              : "bg-primary shadow-xl shadow-primary/20"
            : isActive
              ? "bg-white border-primary/50 shadow-[0_20px_40px_rgb(0,0,0,0.12)] scale-[1.03]"
              : "bg-white border-slate-100 border shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1"
        }`}
      >
        <div className={`mb-4 transition-colors duration-300 ${isDark ? "text-white" : isActive ? "text-primary" : "text-primary"}`}>
          <div className="relative w-12 h-12">
            <Image 
              src={item.icon} 
              alt={item.nama} 
              fill 
              className={`object-contain ${isDark ? "brightness-0 invert" : ""}`} 
            />
          </div>
        </div>
        <h3 className={`text-lg font-bold mb-1 transition-colors duration-300 ${isDark ? "text-white" : isActive ? "text-primary" : "text-slate-900"}`}>
          {item.nama}
        </h3>

        <div className="flex-1 flex flex-col">
          <p className={`text-[13px] leading-relaxed mb-6 mt-2 transition-colors duration-300 line-clamp-5 ${isDark ? "text-white/80" : isActive ? "text-slate-600" : "text-slate-500"}`}>
            {item.deskripsi[0]}
          </p>
        </div>

        <button
          onClick={() => onOpenModal(item)}
          className="mt-auto"
        >
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.1 },
              tap: { scale: 0.95 },
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isDark
                ? "bg-white text-primary hover:bg-slate-100"
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
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </button>
        
        <div
          className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary transform transition-transform duration-500 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
        />
      </div>
    </motion.div>
  );
};

export default PackageCard;
