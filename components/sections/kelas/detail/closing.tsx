"use client";

import { motion } from "framer-motion";
import { Heart, ArrowRight, MessageCircle } from "lucide-react";

interface ClosingProps {
  data: {
    headline: string;
    subline: string;
  };
}

export function Closing({ data }: ClosingProps) {
  // Split headline at the first comma if present to highlight the second part
  const headlineParts = data.headline.includes(",") 
    ? [data.headline.split(",")[0] + ",", data.headline.split(",").slice(1).join(",")]
    : [data.headline, ""];

  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-primary rounded-[2.5rem] p-10 md:p-14 text-center relative overflow-hidden shadow-2xl shadow-primary/20"
          >
            {/* Subtle Pattern Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            
            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
              >
                <Heart className="w-8 h-8 text-secondary fill-secondary" />
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-black text-white mb-6 leading-tight tracking-tight uppercase">
                {headlineParts[0]}<br />
                {headlineParts[1] && <span className="text-secondary italic">{headlineParts[1]}</span>}
              </h2>
              
              <div className="max-w-md mx-auto border-t border-white/10 pt-6 mb-10">
                <p className="text-lg md:text-xl font-medium text-white/80 italic leading-relaxed">
                  &quot;{data.subline}&quot;
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary px-8 py-4 rounded-xl font-black text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  Daftar Sekarang
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary border-2 border-white/30 text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-white/10 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  Tanya Dulu
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
