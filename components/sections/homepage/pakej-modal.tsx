import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, CheckCircle2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { type PakejKelas } from "@/components/sections/data/data-pakej-kelas";

interface PakejModalProps {
  pakej: PakejKelas | null;
  isOpen: boolean;
  onClose: () => void;
}

const PakejModal = ({ pakej, isOpen, onClose }: PakejModalProps) => {
  if (!pakej && !isOpen) return null;

  const isDarkClass = pakej?.slug.includes('dewasa') || pakej?.slug === 'fardhu-ain-kafa';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[60] w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
              {/* Premium Hero Section */}
              <div className={`relative p-8 md:p-16 overflow-hidden ${isDarkClass ? "bg-primary" : "bg-stone-50"}`}>
                {/* Dynamic Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 bg-secondary`}></div>
                  
                  {/* Decorative Hex Pattern */}
                  <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <pattern id="hex-grid" x="0" y="0" width="40" height="46.2" patternUnits="userSpaceOnUse" viewBox="0 0 40 46.2">
                        <path d="M20 0 L40 11.55 L40 34.65 L20 46.2 L0 34.65 L0 11.55 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#hex-grid)" />
                    </svg>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center text-center md:text-left">
                  {/* Animated Icon Container */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className={`relative w-24 h-24 md:w-32 md:h-32 p-6 rounded-3xl ${isDarkClass ? "bg-white/10 backdrop-blur-xl border border-white/20" : "bg-white border border-stone-100 shadow-xl shadow-stone-200"}`}
                  >
                    {pakej && (
                      <Image 
                        src={pakej.icon} 
                        alt={pakej.nama} 
                        fill 
                        className={`object-contain p-4 ${isDarkClass ? "brightness-0 invert" : ""}`} 
                      />
                    )}
                  </motion.div>
                  
                  <div className="flex-1 space-y-3">
                    {pakej?.badge && (
                      <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${isDarkClass ? "bg-white/20 text-white border border-white/20" : "bg-secondary/10 text-secondary border border-secondary/20"}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 animate-pulse ${isDarkClass ? "bg-white" : "bg-secondary"}`}></span>
                        {pakej.badge}
                      </motion.span>
                    )}
                    <h2 className={`text-4xl md:text-5xl font-black leading-tight tracking-tighter uppercase ${isDarkClass ? "text-white" : "text-primary"}`}>
                      {pakej?.nama}
                    </h2>
                    <p className={`text-lg md:text-xl font-medium max-w-2xl leading-relaxed ${isDarkClass ? "text-white/70" : "text-stone-400"}`}>
                      {pakej?.tagline}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-10 md:px-20 py-16 space-y-24 bg-[#FDFDFD]">
                {/* Horizontal Divider with Icon */}
                <div className="relative h-px bg-stone-100 w-full flex items-center justify-center">
                  <div className="bg-[#FDFDFD] px-6 text-stone-300">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                  {/* Left Column: Story/Description */}
                  <div className="lg:col-span-7 space-y-10">
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Tentang Kelas</h4>
                      <h3 className="text-3xl font-black text-primary">Pembelajaran Sistematik & Berpusatkan Pelajar</h3>
                    </div>
                    <div className="columns-1 md:columns-1 gap-12 space-y-8">
                      {pakej?.deskripsi.map((para, i) => (
                        <p key={i} className="text-stone-500 leading-[1.8] text-lg font-medium italic before:content-[''] before:inline-block before:w-8 before:h-px before:bg-primary/20 before:mr-4 before:align-middle">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Audience Highlights */}
                  <div className="lg:col-span-5">
                    <div className="sticky top-0 bg-primary rounded-[3rem] p-10 md:p-12 text-white overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary mb-10">Kriteria Pelajar</h4>
                      <div className="space-y-6">
                        {pakej?.sesuaiUntuk.map((item, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group"
                          >
                            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <CheckCircle2 className="w-4 h-4 text-secondary" />
                            </div>
                            <span className="text-white/80 font-bold leading-snug">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Syllabus Section - Visual Redesign */}
                {pakej?.syllabus && pakej.syllabus.length > 0 && (
                  <div className="space-y-16">
                    <div className="text-center space-y-4">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Silibus Pembelajaran</h4>
                      <h3 className="text-4xl font-black text-primary">Apa Yang Akan Anda Pelajari?</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {pakej.syllabus.map((modul, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ y: -10 }}
                          className="relative group h-full"
                        >
                          <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative h-full p-8 md:p-10 rounded-[2.5rem] bg-white border border-stone-100 shadow-sm border-l-4 border-l-primary group-hover:shadow-2xl group-hover:shadow-stone-200 transition-all duration-500">
                            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg">
                              {i + 1 < 10 ? `0${i + 1}` : i + 1}
                            </div>
                            <h5 className="text-xl font-black text-primary mb-6 group-hover:text-secondary transition-colors">{modul.tajuk}</h5>
                            <ul className="space-y-3">
                              {modul.topik.map((t, j) => (
                                <li key={j} className="text-stone-400 text-sm flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5"></div>
                                  <span className="group-hover:text-stone-600 transition-colors">{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Premium Footer Actions */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 p-8 md:p-12 rounded-[2.5rem] bg-stone-50 border border-stone-100 relative overflow-hidden mb-10">
                  <div className="text-center lg:text-left relative z-10">
                    <h3 className="text-2xl md:text-3xl font-black text-primary mb-2">Sertai MyNgaji</h3>
                    <p className="text-stone-400 text-base md:text-lg max-w-sm">Dapatkan bimbingan secara profesional bersama pakar.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto relative z-10">
                    <Link
                      href={(() => {
                        const slug = pakej?.slug || "";
                        if (slug.includes('mengaji')) return "/kelas/kelas-alquran";
                        if (slug.includes('bahasa-arab')) return "/kelas/kelas-bahasa-arab";
                        if (slug.includes('hafazan')) return "/kelas/kelas-hafazan";
                        if (slug.includes('fardhu-ain-kafa')) return "/kelas/kelas-kafa";
                        return "#";
                      })()}
                      className="group relative w-full sm:w-auto"
                    >
                      {/* Button Glow Effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                      
                      <div className="relative flex items-center justify-center gap-6 px-12 py-5 bg-primary rounded-2xl leading-none transition duration-300 group-hover:bg-primary/90 text-white shadow-2xl shadow-primary/40">
                        <div className="flex flex-col items-start text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/80 mb-1">Terokai Silibus</span>
                          <span className="text-xl font-black tracking-tight uppercase">Lihat Detail Kelas</span>
                        </div>
                        
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                          <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PakejModal;
