"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollFloat from "@/components/scroll-float";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { cn } from "@/lib/utils";

const galleryImages = ["/assets/gallery/poster1.png", "/assets/gallery/poster7.png", "/assets/gallery/poster3.png", "/assets/gallery/poster4.png", "/assets/gallery/poster5.png", "/assets/gallery/poster6.png"];

export function GaleriSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-stone-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Header Content */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <GradualSpacing className="text-xl md:text-2xl font-black uppercase tracking-widest text-primary mb-4" text="Galeri Aktiviti" />

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-x-2 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
            <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03} containerClassName="text-primary !my-0">
              Momen Indah
            </ScrollFloat>
            <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03} containerClassName="text-secondary !my-0">
              Bersama Kami
            </ScrollFloat>
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-2xl text-lg text-gray-600 leading-relaxed">
            Ikuti perjalanan pembelajaran dan program menarik yang telah kami jalankan. Setiap momen adalah bukti komitmen kami dalam mendidik generasi celik Al-Quran.
          </motion.p>
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid group relative rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image src={src} alt={`Aktiviti MyNgaji ${index + 1}`} fill className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
