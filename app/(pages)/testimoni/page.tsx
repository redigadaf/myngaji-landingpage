"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import Image from "next/image";

// --- Types ---
const categories = ["Semua", "Google Review", "Pelajar Mualaf", "Pelajar Dewasa", "Kanak-kanak", "Bukan Pelajar KAFA"] as const;

interface Testimonial {
  id: number;
  text?: string;
  image: string;
  name: string;
  role: string;
  category: typeof categories[number] | "Influencer";
  isImage?: boolean;
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Alhamdulillah, sejak join kelas MyNgaji, bacaan Al-Quran saya semakin lancar. Ustaz sangat membantu membetulkan tajwid saya.",
    image: "/testi/1.png",
    name: "Ahmad Zaki",
    role: "Pelajar Al-Quran",
    category: "Google Review",
  },
  {
    id: 2,
    text: "Anak-anak seronok belajar mengaji online. Ustazah pandai ambil hati budak-buda, tak bosan dan sangat interaktif.",
    image: "/testi/2.png",
    name: "Siti Sarah",
    role: "Ibu Pelajar KAFA",
    category: "Google Review",
  },
  {
    id: 3,
    text: "Jadual yang fleksibel sangat sesuai untuk saya yang bekerja. Boleh pilih masa yang sesuai untuk belajar tanpa ganggu kerja.",
    image: "/testi/3.png",
    name: "Faizal Ramli",
    role: "Eksekutif Pemasaran",
    category: "Google Review",
  },
  {
    id: 4,
    image: "/testi/joeyy.png",
    name: "Pn Joey",
    role: "Pelajar Mualaf",
    category: "Pelajar Mualaf",
    isImage: true,
  },
  {
    id: 11,
    image: "/testi/ellyanaa.png",
    name: "Pn Ellyana",
    role: "Pelajar Mualaf",
    category: "Pelajar Mualaf",
    isImage: true,
  },
  {
    id: 5,
    image: "/testi/nana.png",
    name: "Cik Nana",
    role: "Pelajar Dewasa",
    category: "Pelajar Dewasa",
    isImage: true,
  },
  {
    id: 6,
    image: "/testi/mariyah.png",
    name: "Pn Mariyah",
    role: "Ibu Pelajar",
    category: "Kanak-kanak",
    isImage: true,
  },
  {
    id: 7,
    image: "/testi/maryam.png",
    name: "Pn Maryam",
    role: "Bapa Pelajar Non-KAFA",
    category: "Bukan Pelajar KAFA",
    isImage: true,
  },
  {
    id: 8,
    image: "/testi/influencer1.png",
    name: "Ainaa Chichi",
    role: "Content Creator / Influencer",
    category: "Influencer",
    isImage: true,
  },
  {
    id: 12,
    image: "/testi/influencerr2.png",
    name: "Sharifah Eleen",
    role: "Content Creator / Influencer",
    category: "Influencer",
    isImage: true,
  },
  {
    id: 9,
    text: "Platform yang sangat user-friendly. Senang nak book kelas dan communicate dengan pengajar. Terbaik MyNgaji!",
    image: "/testi/4.png",
    name: "Nurul Huda",
    role: "Pelajar Universiti",
    category: "Google Review",
  },
  {
    id: 10,
    text: "Saya mula dari zero, sekarang dah boleh kenal huruf dan baca sikit-sikit. Terima kasih ustaz atas kesabaran mengajar.",
    image: "/testi/5.png",
    name: "Azman Ali",
    role: "Pelajar Dewasa Al-Quran",
    category: "Google Review",
  },
];


export default function TestimonialPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>("Semua");

  const influencerTestimonials = testimonials.filter(t => t.category === "Influencer");
  const regularTestimonials = testimonials.filter(t => t.category !== "Influencer");

  const filteredTestimonials = selectedCategory === "Semua" 
    ? regularTestimonials 
    : regularTestimonials.filter((t) => t.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#FDFDFD]">
      <PageHeader 
        title={<>Apa Kata <span className="text-secondary">Mereka?</span></>}
        description="Pengalaman nyata daripada komuniti MyNgaji yang telah berjaya memperbaiki bacaan dan kefahaman agama mereka."
      />

      {/* Influencer Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-4 uppercase tracking-tight">
              Pilihan <span className="text-secondary">Influencer</span>
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {influencerTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group h-full"
              >
                <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-stone-200 h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="flex-1 -mx-2 -mt-2 mb-6 overflow-hidden rounded-[2rem] relative min-h-[500px] bg-stone-100/50">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex items-center justify-between px-2">
                    <div>
                      <h4 className="font-black text-stone-900 text-xl leading-tight">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs font-black text-primary/60 uppercase tracking-widest mt-1">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="bg-stone-900 px-4 py-2 rounded-full">
                      <span className="text-[10px] text-white font-bold tracking-widest uppercase">Verified</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-40 bg-[#FDFDFD]/80 backdrop-blur-md border-y border-stone-200 py-4">
        <div className="container mx-auto px-6">
          <div className="mb-6 text-center">
             <h3 className="text-xl font-black text-stone-800 uppercase tracking-widest">Kisah Kejayaan Pelajar</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -10 }}
                  className="p-8 rounded-[2rem] border border-stone-200 bg-white shadow-sm hover:shadow-xl transition-all duration-500 relative group overflow-hidden"
                >
                  {/* Category Badge on individual cards */}
                  <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-black uppercase tracking-tighter bg-stone-100 text-stone-500 px-2 py-1 rounded-md border border-stone-200">
                      {testimonial.category}
                    </span>
                  </div>

                  {/* Quote Icon Background */}
                  <div className="absolute -top-4 -left-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <Quote className="w-24 h-24 fill-primary text-primary" />
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    {testimonial.isImage ? (
                      <div className="flex-1 -mx-8 -mt-8 mb-6 overflow-hidden rounded-t-[2rem] relative min-h-[400px] bg-stone-100/50">
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          fill
                          className="object-contain group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    ) : (
                      <>
                        {/* Stars */}
                        <div className="flex gap-1 mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                          ))}
                        </div>

                        {/* Review Text */}
                        <p className="text-stone-700 leading-relaxed text-[15px] mb-8 min-h-[100px] italic">
                          &quot;{testimonial.text}&quot;
                        </p>
                      </>
                    )}

                    {/* User Info */}
                    <div className="flex items-center gap-4 mt-auto">
                      {!testimonial.isImage && (
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md ring-1 ring-stone-100">
                          <Image 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <h4 className="font-black text-stone-900 leading-tight">
                          {testimonial.name}
                        </h4>
                        <p className="text-[11px] font-black text-primary/60 uppercase tracking-widest mt-1">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredTestimonials.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-stone-400 font-bold uppercase tracking-widest text-sm">
                Tiada testimoni dalam kategori ini buat masa sekarang.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section for testimonials */}
      <section className="py-20 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary to-transparent opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h3 className="text-4xl font-black text-white mb-6">Sudah Menjadi Pelajar Kami?</h3>
          <p className="text-stone-400 mb-10 max-w-xl mx-auto">
            Kongsi pengalaman anda dan sertai komuniti yang saling memberi inspirasi. Maklum balas anda sangat berharga bagi kami.
          </p>
          <button className="px-10 py-4 bg-primary text-white font-black rounded-full hover:scale-105 transition-transform duration-300 shadow-xl shadow-primary/20">
            HANTAR TESTIMONI ANDA
          </button>
        </div>
      </section>

    </main>
  );
}
