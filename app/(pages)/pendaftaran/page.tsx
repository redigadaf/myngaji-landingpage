"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  Sparkles, 
  GraduationCap, 
  Clock, 
  Users, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Star
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ShinyButton } from "@/components/shiny-button";

export default function PendaftaranPage() {
  const [activeStep, setActiveStep] = useState(1);
  
  const benefits = [
    { icon: GraduationCap, title: "Ustaz Bertauliah", desc: "Bimbingan dari guru berpengalaman." },
    { icon: Clock, title: "Waktu Fleksibel", desc: "Belajar mengikut keselesaan anda." },
    { icon: Users, title: "Personal coaching", desc: "Fokus 100% kepada kemajuan anda." },
    { icon: Star, title: "Silibus Terkini", desc: "Kaedah moden yang mudah difahami." },
  ];

  const testimonials = [
    { name: "Puan Sarah", role: "Ibu Pelajar", text: "Alhamdulillah, anak saya semakin lancar mengaji dalam masa 2 bulan." },
    { name: "En. Zul", role: "Pelajar Dewasa", text: "Silibus yang sangat sistematik dan tidak membosankan." }
  ];

  return (
    <main className="min-h-screen bg-[#FDFDFD] dark:bg-gray-950 flex flex-col relative overflow-hidden font-sans selection:bg-primary/30">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[60%] h-full bg-primary/[0.02] -skew-x-12 translate-x-1/4 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header / Navigation */}
      <nav className="relative z-50 w-full px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:border-primary/20 group-hover:shadow-md transition-all duration-300">
              <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:-translate-x-0.5 transition-all" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[3px] text-gray-400 group-hover:text-gray-600 transition-colors">Laman Utama</span>
          </Link>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100/50">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Pendaftaran Dibuka</span>
          </div>
        </div>
      </nav>

      <div className="flex-1 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center relative z-10 pb-20">
        
        {/* Left Side: Brand & Social Proof */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[2px]">Tawaran Terhad</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight">
              Mulai Perjalanan <br />
              <span className="text-primary relative inline-block">
                Sains Al-Quran
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed max-w-md">
              Daftar sekarang untuk sesi percubaan percuma. Alami sendiri perbezaan pembelajaran Al-Quran yang sistematik dan menyeronokkan.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors mb-3">
                  <benefit.icon className="w-5 h-5" />
                </div>
                <h4 className="text-gray-900 font-bold text-sm mb-1">{benefit.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Trust Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 max-w-xs border border-gray-100"
          >
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                  <Image src={`/assets/placeholders/student-${i}.jpg`} alt="Student" width={32} height={32} onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/assets/ustaz-dafli.jpg";
                  }} />
                </div>
              ))}
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-900 uppercase tracking-tighter leading-none">300+ Pelajar Terpilih</p>
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: High-Intent Form */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:mt-0 mt-8"
        >
          {/* Decorative Elements for the Card */}
          <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" />
          
          <div className="bg-white dark:bg-gray-900 rounded-[48px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.06)] border border-white dark:border-gray-800 overflow-hidden relative">
            
            {/* Step Indicator */}
            <div className="h-2 w-full flex">
              <div className={`h-full transition-all duration-500 bg-primary ${activeStep === 1 ? 'w-1/2' : 'w-full'}`} />
              <div className={`h-full transition-all duration-500 bg-gray-50 flex-1`} />
            </div>

            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">Tempah Slot <br /> Percubaan Anda</h2>
                  <p className="text-gray-400 font-medium text-sm mt-2">Daftar hari ini, kami akan hubungi dalam 24 jam.</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="w-7 h-7" />
                </div>
              </div>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <AnimatePresence mode="wait">
                  {activeStep === 1 ? (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2 group">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] ml-1 group-focus-within:text-primary transition-colors">Nama Penuh Anda</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="Ahmad Bin Ismail"
                            className="w-full h-14 px-6 rounded-2xl bg-[#F8F9FA] border-2 border-transparent focus:bg-white focus:border-primary/30 focus:shadow-[0_0_0_6px_rgba(23,131,143,0.05)] transition-all text-gray-900 outline-none font-bold placeholder:text-gray-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] ml-1 group-focus-within:text-primary transition-colors">No. WhatsApp</label>
                        <div className="relative">
                          <input 
                            type="tel" 
                            placeholder="+60 12-345 6789"
                            className="w-full h-14 px-6 rounded-2xl bg-[#F8F9FA] border-2 border-transparent focus:bg-white focus:border-primary/30 focus:shadow-[0_0_0_6px_rgba(23,131,143,0.05)] transition-all text-gray-900 outline-none font-bold placeholder:text-gray-300"
                          />
                        </div>
                      </div>

                      <button 
                        onClick={() => setActiveStep(2)}
                        className="w-full h-14 mt-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-[2px] flex items-center justify-center gap-3 hover:bg-gray-800 transition-all group"
                      >
                        Berikutnya
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] ml-1">Pilihan Program</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['Al-Quran', 'Iqra', 'Hafazan', 'Bahasa Arab'].map(program => (
                            <div 
                              key={program}
                              className="px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-[13px] font-bold text-gray-600 hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-all flex items-center justify-between group"
                            >
                              {program}
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-primary transition-colors" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] ml-1">Mesej Tambahan</label>
                        <textarea 
                          rows={2}
                          placeholder="..."
                          className="w-full p-6 rounded-2xl bg-[#F8F9FA] border-2 border-transparent focus:bg-white focus:border-primary/30 transition-all text-gray-900 outline-none font-bold placeholder:text-gray-300 resize-none"
                        />
                      </div>

                      <div className="flex gap-4">
                        <button 
                          onClick={() => setActiveStep(1)}
                          className="flex-[0.3] h-14 bg-gray-50 text-gray-400 rounded-2xl font-bold flex items-center justify-center hover:bg-gray-100 transition-all"
                        >
                          Balik
                        </button>
                        <ShinyButton className="flex-1 h-14 rounded-2xl text-sm font-black shadow-xl shadow-primary/20">
                          <div className="flex items-center justify-center gap-3">
                            <span>Sahkan Pendaftaran</span>
                            <Send className="w-4 h-4" />
                          </div>
                        </ShinyButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Privasi Dijamin</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Tanpa Komitmen</span>
                    </div>
                  </div>
                  <Link href="#" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Bantuan</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          
          {/* Subtle Decorative Aura */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
      </div>

      {/* Background Graphic: Quran Photo Placeholder Area */}
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] opacity-[0.05] grayscale rotate-12 pointer-events-none select-none overflow-hidden rounded-[80px]">
        <Image 
          src="/assets/placeholders/quran-detail.jpg" 
          alt="Quran decorative" 
          fill 
          className="object-cover" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/assets/placeholders/blog1.jpg";
          }}
        />
      </div>
    </main>
  );
}
