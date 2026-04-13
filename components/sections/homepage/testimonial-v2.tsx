"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Star } from "lucide-react";
import Image from "next/image";

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    text: "Alhamdulillah, sejak join kelas MyNgaji, bacaan Al-Quran saya semakin lancar. Ustaz sangat membantu membetulkan tajwid saya.",
    image: "/testi/1.png",
    name: "Ahmad Zaki",
    role: "Pelajar Dewasa",
  },
  {
    text: "Anak-anak seronok belajar mengaji online. Ustazah pandai ambil hati budak-buda, takbosan dan sangat interaktif.",
    image: "/testi/2.png",
    name: "Siti Sarah",
    role: "Ibu Pelajar",
  },
  {
    text: "Jadual yang fleksibel sangat sesuai untuk saya yang bekerja. Boleh pilih masa yang sesuai untuk belajar tanpa ganggu kerja.",
    image: "/testi/3.png",
    name: "Faizal Ramli",
    role: "Eksekutif Pemasaran",
  },
  {
    text: "Platform yang sangat user-friendly. Senang nak book kelas dan communicate dengan pengajar. Terbaik MyNgaji!",
    image: "/testi/4.png",
    name: "Nurul Huda",
    role: "Pelajar Universiti",
  },
  {
    text: "Saya mula dari zero, sekarang dah boleh kenal huruf dan baca sikit-sikit. Terima kasih ustaz atas kesabaran mengajar.",
    image: "/testi/5.png",
    name: "Azman Ali",
    role: "Pesara",
  },
  {
    text: "Kelas persediaan SPM untuk Pendidikan Islam pun ada. Sangat membantu anak saya untuk score A dalam exam nanti.",
    image: "/testi/6.png",
    name: "Dr. Faridah",
    role: "Ibu Pelajar",
  },
  {
    text: "Kaedah pengajaran yang moden dan mudah difahami. Rasa lebih yakin nak baca Al-Quran depan orang ramai sekarang.",
    image: "/testi/7.png",
    name: "Hafizuddin",
    role: "Imam Muda",
  },
  {
    text: "Sangat recommended untuk sesiapa yang nak perbaiki bacaan. Yuran pun sangat berbaloi dengan kualiti pengajaran.",
    image: "/testi/8.png",
    name: "Amira Rosli",
    role: "Usahawan",
  },
  {
    text: "Customer service yang sangat responsive. Jika ada masalah teknikal, cepat je mereka bantu selesaikan.",
    image: "/testi/9.png",
    name: "Kamal Hasan",
    role: "IT Freelancer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props: { className?: string; testimonials: Testimonial[]; duration?: number }) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  className="p-8 rounded-3xl border border-stone-200 bg-[#f9f9f9] shadow-sm max-w-sm w-full transition-all duration-300 cursor-default select-none relative group"
                >
                  <div className="flex flex-col gap-4">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#FBBF24] text-[#FBBF24]" />
                      ))}
                    </div>

                    {/* Google Logo */}
                    <div className="relative w-6 h-6">
                      <Image src="/assets/Google Logo.png" alt="Google Logo" width={24} height={24} className="object-contain" />
                    </div>

                    {/* Review Text */}
                    <p className="text-stone-800 leading-relaxed text-[15px]">{text}</p>

                    {/* Name & Role */}
                    <div className="flex flex-col gap-0.5 pt-2">
                      <h4 className="font-bold text-stone-900 text-lg">{name}</h4>
                      <p className="text-stone-500 text-sm">{role}</p>
                    </div>

                    {/* Avatar */}
                    <div className="mt-2">
                      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm" />
                    </div>
                  </div>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section aria-labelledby="testimonials-heading" className="bg-white py-24 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 },
        }}
        className="container px-4 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16">
          <div className="flex justify-center">
            <div className="border border-primary dark:border-neutral-700 py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-primary dark:text-neutral-400 bg-neutral-100/50 dark:bg-neutral-800/50 transition-colors">
              Testimoni
            </div>
          </div>

          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-black tracking-tight mt-6 text-center text-primary dark:text-white transition-colors">
            Apa Kata Pelajar Kami
          </h2>
          <p className="text-center mt-5 text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed max-w-sm transition-colors">Lihat pengalaman mereka yang telah berjaya memperbaiki bacaan Al-Quran bersama MyNgaji.</p>
        </div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden" role="region" aria-label="Scrolling Testimonials">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
