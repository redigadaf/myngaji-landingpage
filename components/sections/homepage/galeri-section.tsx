"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollFloat from "@/components/scroll-float";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { cn } from "@/lib/utils";

const galleryItems = [
  { src: "/assets/gallery/1.webp", title: "Kelas Al-Quran Dewasa", category: "Bimbingan Personal" },
  { src: "/assets/gallery/2.webp", title: "Sesi Talaqqi", category: "Semakan Bacaan", className: "object-left" },
  { src: "/assets/gallery/3.webp", title: "Kelas Kanak-kanak", category: "Asas Al-Quran" },
  { src: "/assets/gallery/4.webp", title: "Program Tahsin", category: "Pemantapan Tajwid" },
  { src: "/assets/gallery/5.webp", title: "Aktiviti Berkumpulan", category: "Program Khas" },
  { src: "/assets/gallery/6.webp", title: "Seminar Al-Quran", category: "Perkongsian Ilmu" },
  { src: "/assets/gallery/7.webp", title: "Kelas Fardu Ain", category: "Ilmu Asas", className: "object-right" },
  { src: "/assets/gallery/8.webp", title: "Majlis Khatam", category: "Meraikan Kejayaan" },
  { src: "/assets/gallery/9.webp", title: "Komuniti Ngaji", category: "Ukhwah & Ilmu" },
];

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

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 mx-auto max-w-7xl">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl cursor-pointer bg-gray-100",
                // Spanning logic
                index === 0 || index === 5 || index === 8 ? "col-span-2 md:col-span-2 aspect-[16/9] md:aspect-[2/1]" : "col-span-1 md:col-span-1 aspect-square",
              )}
            >
              <Image src={item.src} alt={item.title} fill className={cn("object-cover transition-transform duration-700 ease-in-out group-hover:scale-105", item.className)} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />

              {/* Glass Effect Overlay - visible on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-white font-bold text-xl leading-tight mb-2 drop-shadow-md">{item.title}</h3>
                <p className="text-white/90 text-sm font-medium tracking-wide uppercase">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
