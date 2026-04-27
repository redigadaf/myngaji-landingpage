"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { AlertCircle, HelpCircle } from "lucide-react";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { useRef } from "react";

interface PainPoint {
  title: string;
  desc: string;
}

interface PainPointsProps {
  data: {
    hook: string;
    description?: string;
    points: PainPoint[];
    empathy?: {
      headline: string;
      content: string;
      quote: string;
    };
  };
}

export function PainPoints({ data }: PainPointsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const empathyOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const empathyY = useTransform(scrollYProgress, [0.7, 0.85], [40, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section ref={containerRef} className="relative bg-[#fafaf9] border-t border-stone-200 pb-20">
      {/* 
          Sticky wrapper with extra height for scroll duration
      */}
      <div className="h-[350vh] relative">
        {/* Sticky wrapper */}
        <div className="sticky top-0 h-[100dvh] flex flex-col justify-start lg:justify-center items-center py-4 md:py-8 overflow-hidden">
          {/* Background Subtle Gradient */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-stone-200/20 to-transparent"></div>
          
          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full pt-12 md:pt-20">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-4 md:mb-6 px-4">
              <GradualSpacing 
                text="DILEMA YANG DIHADAPI" 
                className="text-primary font-black tracking-[0.2em] text-[10px] md:text-xs mb-4 opacity-60 flex justify-center"
              />
              
              <motion.h2 
                className="text-xl md:text-3xl lg:text-4xl font-black text-primary leading-[1.2] tracking-tight"
              >
                {data.hook}
              </motion.h2>
              
              {data.description && (
                <motion.p
                  className="text-sm md:text-lg text-stone-500 font-medium mt-3 md:mt-4 max-w-2xl mx-auto"
                >
                  {data.description}
                </motion.p>
              )}
            </div>

            {/* Main Grid */}
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-4 items-center">
                
                {/* Left side: Points List */}
                <div className="relative pl-8 space-y-1 md:space-y-3 py-1">
                  {/* Vertical line indicator */}
                  <div className="absolute left-[3px] top-4 bottom-4 w-[2px] bg-stone-200"></div>
                  
                  {data.points.map((point, index) => {
                    const totalPoints = data.points.length;
                    const step = 0.6 / totalPoints;
                    const startShift = 0.1;
                    const start = startShift + (index * step); 
                    const end = start + step;
                    
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const textColor = useTransform(
                      scrollYProgress,
                      (val) => val >= end ? "#1c1917" : "#a8a29e"
                    );

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const subTextColor = useTransform(
                      scrollYProgress,
                      (val) => val >= end ? "#78716c" : "#d6d3d1"
                    );

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const y = useTransform(scrollYProgress, [start, end], [20, 0]);
                    
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const dotColor = useTransform(
                      scrollYProgress,
                      (val) => val >= end ? "#17838F" : "#d6d3d1"
                    );

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const dotScale = useTransform(
                      scrollYProgress,
                      [start, end],
                      [0.5, 1.4]
                    );

                    return (
                      <motion.div
                        key={index}
                        style={{ opacity, y }}
                        className="relative"
                      >
                        {/* Indicator dot */}
                        <motion.div 
                          style={{ backgroundColor: dotColor, scale: dotScale }}
                          className="absolute -left-[36px] top-2 w-4 h-4 rounded-full border-2 border-[#fafaf9] shadow-sm z-10"
                        />
                        
                        <div className="space-y-1">
                          <motion.p 
                            style={{ color: textColor }}
                            className="text-lg md:text-xl font-black leading-tight cursor-default tracking-tight"
                          >
                            {point.title}
                          </motion.p>
                          <motion.p
                            style={{ color: subTextColor }}
                            className="text-xs md:text-sm font-medium leading-relaxed"
                          >
                            {point.desc}
                          </motion.p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right side: Empathy Card */}
                <motion.div
                  style={{ 
                    opacity: empathyOpacity,
                    y: empathyY
                  }}
                  className={`block h-fit mt-8 lg:mt-0 ${!data.empathy ? 'hidden' : ''}`}
                >
                  {data.empathy && (
                    <div className="p-0 rounded-[2rem] border-none shadow-xl overflow-hidden bg-white">
                      <div className="p-6 md:p-8 flex flex-col bg-white relative overflow-hidden">
                        <div className="absolute -bottom-10 -right-10 opacity-[0.03]">
                          <HelpCircle className="w-48 md:w-56 h-48 md:h-56 text-primary" />
                        </div>

                        <div className="relative z-10">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                            <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                          </div>
                          
                          <h3 className="text-lg md:text-xl lg:text-2xl font-black text-stone-900 mb-3 md:mb-4 tracking-tight uppercase">
                            {data.empathy.headline}
                          </h3>
                          
                          <div className="space-y-4">
                            <p className="text-stone-600 leading-relaxed text-sm lg:text-base font-medium">
                              {data.empathy.content}
                            </p>
                            
                            <div className="pt-4 border-t border-stone-100">
                              <p className="text-primary font-bold text-base md:text-lg italic">
                                &quot;{data.empathy.quote}&quot;
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>

              </div>
            </div>
          </div>

          {/* Floating Scroll Indicator */}
          <motion.div 
            style={{ opacity: scrollHintOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Teruskan Scroll</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-9 border-2 border-[#17838F]/60 rounded-full flex justify-center p-1.5"
            >
              <motion.div
                animate={{ 
                  y: [0, 16],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 1.8, 
                  repeat: Infinity, 
                  ease: [0.4, 0, 0.2, 1],
                  times: [0, 0.5, 1]
                }}
                className="w-1 h-2 bg-primary rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
