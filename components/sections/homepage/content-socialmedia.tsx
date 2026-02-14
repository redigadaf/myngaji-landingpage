"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import ScrollFloat from "@/components/scroll-float";
import { Play } from "lucide-react";
import { FaYoutube } from "react-icons/fa";

export function ContentSocialMedia() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="w-full bg-white py-24 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 xl:px-12">
        <div className="flex flex-col gap-12 items-center">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <GradualSpacing className="text-xl md:text-2xl uppercase tracking-wide text-primary font-black mb-4" text="Media Sosial" />
            <div className="flex flex-wrap justify-center gap-x-2 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-tight">
              <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03} containerClassName="text-primary !my-0 ">
                Ikuti Aktiviti
              </ScrollFloat>
              <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03} containerClassName="text-secondary !my-0">
                Terkini Kami
              </ScrollFloat>
            </div>
            <p className="max-w-2xl text-lg text-gray-600 leading-relaxed mx-auto">Tonton video-video menarik dan bermanfaat di saluran YouTube kami. Jangan lupa untuk melanggan agar tidak ketinggalan!</p>
          </div>

          {/* Video Container */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl relative group"
          >
            {/* Decorative Elements */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-[2rem] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>

            <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl bg-black aspect-video border-4 border-white/50 ring-1 ring-stone-900/5">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/bLVDmnQyv1A?si=content-socialmedia"
                title="MyNgaji YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>

              {/* Optional Overlay when paused or generic interaction hints can go here, but pure iframe is best for functionality */}
            </div>

            {/* Floating YouTube Icon Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-white p-4 rounded-3xl shadow-xl border border-stone-100 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
                  <FaYoutube size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-stone-900 leading-none">Subscribe</span>
                  <span className="text-xs text-stone-500 font-medium mt-1">MyNgaji Academy</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.8 }} className="flex justify-center mt-8">
            <a
              href="https://www.youtube.com/@MyngajiAcademy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-stone-200 shadow-sm text-stone-600 font-medium hover:bg-stone-50 hover:text-primary transition-colors"
            >
              <FaYoutube size={18} />
              <span>Lihat lebih banyak video</span>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
