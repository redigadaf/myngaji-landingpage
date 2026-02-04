"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FooterSection } from "@/components/layout/footer-section";
import { ShinyButton } from "@/components/shiny-button";
import { User, BookOpen, Star, Award, GraduationCap, Sparkles } from "lucide-react";

// Mock Data for Instructors
const teachers = [
  {
    id: 1,
    name: "Ustaz Muhammad Amirul",
    role: "Guru Al-Quran",
    specialty: "Tajwid & Tarannum",
    experience: "5 Tahun",
    image: "/tenaga-pengajar/ustadz-1.png",
    bio: "Pakar dalam membimbing bacaan Al-Quran dengan taranum yang mengasyikkan. Mempunyai sanad Hafs 'an Asim.",
  },
  {
    id: 2,
    name: "Ustazah Nurul Huda",
    role: "Guru Fardu Ain",
    specialty: "Fiqh Wanita & Ibadah",
    experience: "4 Tahun",
    image: "/tenaga-pengajar/ustadzah-1.png",
    bio: "Berpengalaman mengajar Fardu Ain untuk kanak-kanak dan dewasa. Fokus kepada aplikasi praktikal dalam kehidupan seharian.",
  },
  {
    id: 3,
    name: "Ustaz Ahmad Fathi",
    role: "Guru Bahasa Arab",
    specialty: "Nahu & Komunikasi",
    experience: "6 Tahun",
    image: "/tenaga-pengajar/ustadz-2.png", // Reusing image placeholder
    bio: "Graduan Universiti Islam Madinah. Menggunakan teknik moden untuk memudahkan penguasaan Bahasa Arab.",
  },
  {
    id: 4,
    name: "Ustazah Siti Sarah",
    role: "Guru Al-Quran Kanak-kanak",
    specialty: "Asas Iqra & Hafazan",
    experience: "3 Tahun",
    image: "/tenaga-pengajar/ustadzah-2.png", // Reusing image placeholder
    bio: "Penyabar dan ceria, mampu menarik minat kanak-kanak untuk mencintai Al-Quran sejak kecil.",
  },
  {
    id: 5,
    name: "Ustaz Hafiz Ibrahim",
    role: "Guru Tafsir",
    specialty: "Tadabbur Al-Quran",
    experience: "8 Tahun",
    image: "/tenaga-pengajar/ustadz-3.png",
    bio: "Membawa pelajar menyelami makna disebalik ayat-ayat Al-Quran untuk penghayatan yang lebih mendalam.",
  },
  {
    id: 6,
    name: "Ustazah Aishah Humaira",
    role: "Guru Sirah",
    specialty: "Sejarah Islam",
    experience: "5 Tahun",
    image: "/tenaga-pengajar/ustadzah-3.png",
    bio: "Menceritakan kisah-kisah Nabi dan Sahabat dengan gaya penceritaan yang menarik dan penuh pengajaran.",
  },
];

const PageHeader = () => (
  <div className="relative w-full bg-primary pt-32 pb-20 overflow-hidden">
    {/* Background Pattern - Consistent with Home Hero but simplified */}
    <div
      className="absolute inset-0 z-0 opacity-[0.2]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='a' width='58' height='100.23' patternTransform='scale(2)' patternUnits='userSpaceOnUse'%3E%3Crect width='100%25' height='100%25' fill='none'/%3E%3Cpath fill='none' stroke='%23F5BB2C' stroke-linecap='round' stroke-linejoin='round' stroke-opacity='.5' stroke-width='1.5' d='m.111-33.307-28.997 16.744zm.012.006 28.993 16.738-.004 33.485L.115 33.492l-28.997-16.57.004-33.485m40.992 43.198v-5.672l4.937 2.85M29.113 9.995 12.117.18l17-9.815M6.114 30.062V10.57l16.967 9.798m-51.963-3.446 57.998-33.485m-29 50.055-.005-66.8m29.001 50.23-57.99-33.485m57.992 19.63-5-2.887 5.002-2.887m28.872-30.805L28.99-16.768zm.012.006 28.993 16.738-.004 33.485-28.997 16.57-28.997-16.57.004-33.485m-.004 33.485 57.998-33.485M57.992 33.287l-.004-66.799m29 50.229Q57.928-.065 28.999-16.768M28.998 2.86l4.998-2.886-4.998-2.886m6.029 23.076 16.964-9.794.002 19.49m-6-3.43v-5.67l-4.936 2.85M28.995 9.789 45.994-.026 28.998-9.84M-.003 66.943-29 83.687zm.012.006 28.993 16.738-.004 33.485m0 0L.001 133.742m0 0-28.997-16.57m0 0 .004-33.485m57.991 26.557-16.996-9.814 17-9.815m-58 26.557 57.999-33.485M.001 133.742l-.004-66.8m29.001 50.23-57.99-33.485m45.994-6.928-5.005 2.89V73.87m11.005 6.353L5.999 90.04l-.002-19.633M29 103.317l-5-2.887 5.002-2.887m28.99-30.6L28.993 83.687zm.011.006 28.993 16.738-.004 33.485m0 0-28.997 16.57m0 0-28.997-16.57m0 0 .004-33.485m22.99-13.28v19.627l-16.995-9.813m-5.999 36.95 57.998-33.484m-29 50.055-.005-66.8m29.001 50.23-57.99-33.485M29 103.314l5-2.886-5-2.886m11.996-20.786 4.996 2.885v-5.77m-16.994 36.373 17-9.815L29 90.615M57.998 66.94l-.003-33.484zm-.012.008-28.992 16.74L-.002 66.94l.148-33.397 28.849-16.827L57.99 33.463M.084 47.363 4.997 50.2.06 53.05m5.936 17.356 16.998-9.812v19.63m35.003-20.212L41 50.2l16.996-9.812m-57.878.067 16.88 9.745L.03 59.996m28.966-43.28v66.971M.144 33.544 57.999 66.94m-58 .001L57.99 33.463M40.994 76.759v-5.78l5.004 2.89m-5.004-50.221v5.772l5-2.886m-11 53.689V60.589l17.004 9.815m-40.003 3.467 5-2.887v5.775m41.002-29.444L53 50.2l4.998 2.885M22.995 20.217v19.589l-16.88-9.744m5.97-3.481 4.91 2.835v-5.7m18-3.535v19.63l16.997-9.813'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800%25' height='800%25' fill='url(%23a)' transform='translate(0 -.92)'/%3E%3C/svg%3E")`,
        maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
      }}
    />
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-50/20 via-transparent to-transparent -z-10" />

    <div className="container mx-auto px-6 relative z-10 text-center">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-black text-white mb-4">
        Tenaga Pengajar <span className="text-secondary">Kami</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-teal-100 max-w-2xl mx-auto">
        Barisan asatizah yang terlatih, berpengalaman dan bertauliah dalam membimbing anda mendalami ilmu agama.
      </motion.p>
    </div>
  </div>
);

const InstructorCard = ({ teacher, index }: { teacher: (typeof teachers)[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      <div className="relative h-72 w-full bg-slate-50 overflow-hidden">
        {/* Background Blob Effect */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-teal-50 to-amber-50 rounded-[40%] animate-spin-slow opacity-60" />

        <Image src={teacher.image} alt={teacher.name} fill className="object-cover object-top group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Floating Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-white/50">
          <Award className="w-3.5 h-3.5 text-secondary" />
          <span className="text-xs font-bold text-slate-800">{teacher.experience} Experience</span>
        </div>
      </div>

      <div className="relative p-6 -mt-12">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-50 relative z-10 mx-2">
          <div className="text-center mb-3">
            <h3 className="text-xl font-bold text-slate-800 mb-1">{teacher.name}</h3>
            <span className="inline-block px-3 py-1 bg-teal-50 text-primary text-xs font-bold rounded-lg uppercase tracking-wider">{teacher.role}</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">
              <div className="p-1.5 bg-white rounded-md shadow-sm text-secondary">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-medium text-xs">{teacher.specialty}</span>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed text-center line-clamp-3">{teacher.bio}</p>
          </div>
        </div>
      </div>

      {/* Hover Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
};

export default function TenagaPengajarPage() {
  return (
    <main className="min-h-screen bg-white font-figtree">
      <PageHeader />

      <section className="py-24 px-6 md:px-12 bg-slate-50/50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Kenali Asatizah Kami</h2>
              <div className="h-1.5 w-24 bg-secondary rounded-full" />
              <p className="text-slate-600 max-w-xl">Setiap tenaga pengajar kami telah melalui proses pemilihan yang ketat untuk memastikan kualiti pembelajaran terbaik untuk anda.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {teachers.map((teacher, index) => (
              <InstructorCard key={teacher.id} teacher={teacher} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Simple & Effective */}
      <section className="relative py-12 bg-[#0a2529] overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Dashed Lines Background */}
        <div className="absolute inset-0 flex items-center justify-center -z-0 pointer-events-none">
          <div className="w-full h-px border-t border-dashed border-teal-800/40" />
        </div>

        <div className="container mx-auto px-4 relative z-10 bg-[#0a2529] md:bg-transparent">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm md:text-base">Bersedia untuk Mula?</span>
          </motion.div>

          {/* Main Typography */}
          <motion.h2 initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-12">
            KAMI SEDIA <br className="hidden md:block" /> MEMBANTU
          </motion.h2>

          <div className="relative inline-flex items-center justify-center">
            <ShinyButton className="relative z-10 !px-12 !py-6 !text-lg md:!text-xl font-bold shadow-2xl hover:scale-105 transition-transform duration-300">Daftar Kelas Sekarang</ShinyButton>

            {/* Floating 'Sticker' Badge with StickerPeel */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-8 hidden md:block z-20">
              <div className="w-[220px] h-14 bg-white flex items-center justify-center gap-3 px-3 rounded-xl border border-slate-200 shadow-xl rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-default select-none">
                <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                  <Sparkles className="w-4 h-4 fill-primary/20 animate-pulse" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest leading-none mb-0.5">Mari Serta</span>
                  <span className="text-lg font-black text-slate-800 tracking-tighter leading-none italic">
                    JOM <span className="text-primary underline decoration-wavy decoration-secondary/50 decoration-2 underline-offset-2">NGAJI!</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-teal-200/50 mt-16 text-sm max-w-md mx-auto">Sertai ribuan pelajar lain yang telah mendapat manfaat daripada bimbingan asatizah kami.</p>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
