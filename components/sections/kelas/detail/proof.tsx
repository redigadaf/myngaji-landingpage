"use client";

import { motion } from "framer-motion";
import { Quote, TrendingUp, Users, Star, Plus, ArrowRight, LucideIcon } from "lucide-react";

interface Metric {
  label: string;
  title: string;
  desc: string;
}

interface ProofProps {
  data: {
    headline: string;
    testimonial: {
      text: string;
      author: string;
      role: string;
    };
    metrics: Metric[];
  };
  iconMap?: Record<string, LucideIcon>;
}

const defaultIconMap: Record<string, LucideIcon> = {
  "Transformasi Terpantas": Users,
  "Kejayaan Dewasa": Star,
  "Pencapaian Ilmu": TrendingUp,
  "Kefahaman Tahap 1": Users,
  "Keyakinan Membaca": Star,
  "Motivasi Tinggi": TrendingUp
};

export function Proof({ data, iconMap = defaultIconMap }: ProofProps) {
  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden">
      {/* Premium Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left: Headline & The "Big" Proof Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Plus className="w-3 h-3 text-primary" />
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Hasil Nyata</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-stone-900 leading-[1.2] mb-6 tracking-tighter">
                {data.headline.split(' ').slice(0, -1).join(' ')} <br />
                <span className="text-primary italic">{data.headline.split(' ').slice(-1)}</span>
              </h2>

              <p className="text-base md:text-lg text-stone-500 font-medium mb-10 leading-relaxed max-w-md">
                Kami membimbing sehingga anda benar-benar melihat perubahan kualiti bacaan anda sendiri.
              </p>

              {/* Glassmorphism Testimonial Card */}
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-r from-primary to-secondary opacity-15 blur-xl rounded-[2.5rem] transition-all group-hover:opacity-25"></div>
                
                <div className="relative bg-white/80 backdrop-blur-xl border border-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-stone-200/40 transition-all duration-500 group-hover:-translate-y-1.5">
                  <div className="absolute top-8 right-8 opacity-10">
                    <Quote className="w-12 h-12 text-primary" />
                  </div>

                  <div className="flex gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-secondary fill-secondary" />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl font-bold text-stone-800 leading-[1.5] mb-8 italic">
                    &quot;{data.testimonial.text}&quot;
                  </p>

                  <div className="flex items-center gap-4 border-t border-stone-100/50 pt-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-black border-2 border-white shadow-sm overflow-hidden text-sm">
                      {data.testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-black text-stone-900">{data.testimonial.author}</p>
                      <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest">{data.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Modern Metric Cards */}
            <div className="space-y-4">
              {data.metrics.map((metric, i) => {
                const Icon = iconMap[metric.label] || TrendingUp;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.3 }}
                    className="group bg-white p-5 md:p-6 rounded-[1.8rem] border border-stone-100 hover:border-primary/20 hover:shadow-[0_15px_40px_rgba(23,131,143,0.06)] transition-all duration-500 flex items-start gap-5"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-500">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 block text-primary opacity-80">
                        {metric.label}
                      </span>
                      <h4 className="text-lg md:text-xl font-black text-stone-900 mb-1 leading-tight">
                        {metric.title}
                      </h4>
                      <p className="text-stone-500 text-xs md:text-sm font-medium leading-relaxed">
                        {metric.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

              {/* Bottom Trust Signifiers */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-8 flex items-center gap-6 p-4 bg-stone-50 rounded-2xl border border-stone-100"
              >
                <div className="flex -space-x-2 shrink-0">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-stone-200 shadow-sm flex items-center justify-center text-[8px] font-black text-stone-400">
                      U
                    </div>
                  ))}
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-[8px] font-black shadow-sm">
                    +1k
                  </div>
                </div>
                <div className="flex-1">
                    <p className="text-xs md:text-sm font-black text-stone-900 leading-none">
                        Sertai 1,000+ Pelajar
                    </p>
                </div>
                <button className="p-3 rounded-xl bg-white border border-stone-200 text-primary hover:bg-primary hover:text-white transition-all group">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
