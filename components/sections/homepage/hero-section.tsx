import Image from "next/image";
import Link from "next/link";
import { BookOpen, Languages, User, Calendar, BarChart, Award } from "lucide-react";
import { FaQuran, FaUser, FaLanguage, FaPrayingHands } from "react-icons/fa";
import { RiUserVoiceFill } from "react-icons/ri";
import CountUp from "../../count-up";
import { ShinyButton } from "../../shiny-button";

export function HeroSection() {
  const stats = [
    { value: 2022, label: "Ditubuhkan", separator: "," },
    { value: 346, label: "Jumlah Pelajar" },
    { value: 280, label: "Kelas Bulanan" },
    { value: 43, label: "Tenaga Pengajar" },
  ];

  const features = [
    { icon: FaQuran, label: "Bacaan Al Quran" },
    { icon: RiUserVoiceFill, label: "Bahasa Arab" },
    { icon: FaPrayingHands, label: "Fardu Ain" },
  ];

  return (
    <section className="relative w-full bg-primary pt-32 pb-32">
      {/* Hexagon Pattern Background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.3]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='a' width='58' height='100.23' patternTransform='scale(2)' patternUnits='userSpaceOnUse'%3E%3Crect width='100%25' height='100%25' fill='none'/%3E%3Cpath fill='none' stroke='%23F5BB2C' stroke-linecap='round' stroke-linejoin='round' stroke-opacity='.5' stroke-width='1.5' d='m.111-33.307-28.997 16.744zm.012.006 28.993 16.738-.004 33.485L.115 33.492l-28.997-16.57.004-33.485m40.992 43.198v-5.672l4.937 2.85M29.113 9.995 12.117.18l17-9.815M6.114 30.062V10.57l16.967 9.798m-51.963-3.446 57.998-33.485m-29 50.055-.005-66.8m29.001 50.23-57.99-33.485m57.992 19.63-5-2.887 5.002-2.887m28.872-30.805L28.99-16.768zm.012.006 28.993 16.738-.004 33.485-28.997 16.57-28.997-16.57.004-33.485m-.004 33.485 57.998-33.485M57.992 33.287l-.004-66.799m29 50.229Q57.928-.065 28.999-16.768M28.998 2.86l4.998-2.886-4.998-2.886m6.029 23.076 16.964-9.794.002 19.49m-6-3.43v-5.67l-4.936 2.85M28.995 9.789 45.994-.026 28.998-9.84M-.003 66.943-29 83.687zm.012.006 28.993 16.738-.004 33.485m0 0L.001 133.742m0 0-28.997-16.57m0 0 .004-33.485m57.991 26.557-16.996-9.814 17-9.815m-58 26.557 57.999-33.485M.001 133.742l-.004-66.8m29.001 50.23-57.99-33.485m45.994-6.928-5.005 2.89V73.87m11.005 6.353L5.999 90.04l-.002-19.633M29 103.317l-5-2.887 5.002-2.887m28.99-30.6L28.993 83.687zm.011.006 28.993 16.738-.004 33.485m0 0-28.997 16.57m0 0-28.997-16.57m0 0 .004-33.485m22.99-13.28v19.627l-16.995-9.813m-5.999 36.95 57.998-33.484m-29 50.055-.005-66.8m29.001 50.23-57.99-33.485M29 103.314l5-2.886-5-2.886m11.996-20.786 4.996 2.885v-5.77m-16.994 36.373 17-9.815L29 90.615M57.998 66.94l-.003-33.484zm-.012.008-28.992 16.74L-.002 66.94l.148-33.397 28.849-16.827L57.99 33.463M.084 47.363 4.997 50.2.06 53.05m5.936 17.356 16.998-9.812v19.63m35.003-20.212L41 50.2l16.996-9.812m-57.878.067 16.88 9.745L.03 59.996m28.966-43.28v66.971M.144 33.544 57.999 66.94m-58 .001L57.99 33.463M40.994 76.759v-5.78l5.004 2.89m-5.004-50.221v5.772l5-2.886m-11 53.689V60.589l17.004 9.815m-40.003 3.467 5-2.887v5.775m41.002-29.444L53 50.2l4.998 2.885M22.995 20.217v19.589l-16.88-9.744m5.97-3.481 4.91 2.835v-5.7m18-3.535v19.63l16.997-9.813'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800%25' height='800%25' fill='url(%23a)' transform='translate(0 -.92)'/%3E%3C/svg%3E")`,
          maskImage: "radial-gradient(circle at center, black 0%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 80%)",
        }}
      />

      {/* Background Gradient/Decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-yellow-50/50 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-secondary block mb-2">Nak topup ilmu ?</span>
              <span className="text-white">Jom MyNgaji bantu.</span>
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed max-w-lg pt-4">Kelas komprehensif yang sesuai bagi semua peringkat umur untuk mendalami ilmu agama dengan cara yang mudah dan fleksibel.</p>
          </div>

          {/* Feature Icons
          <div className="flex items-center">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center gap-3 text-center group cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-medium text-gray-300">{feature.label}</span>
                </div>
                {index < features.length - 1 && <div className="h-12 w-px bg-white/20 mx-6" />}
              </div>
            ))}
          </div> */}

          {/* CTA Button */}
          <div>
            <Link href="#">
              <ShinyButton className="inline-flex items-center justify-center !px-8 !py-4 rounded-full text-base font-extrabold shadow-lg hover:shadow-xl translate-y-0">Daftar Kelas Percubaan</ShinyButton>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center items-center z-10">
          <div className="relative w-full max-w-[500px] aspect-square">
            {/* Floating Card 1: Bacaan Al Quran */}
            <div className="absolute -bottom-4 left-0 sm:-bottom-4 sm:left-[-20px] lg:-left-8 xl:-left-16 z-20 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 border border-emerald-100/50 hover:scale-105 transition-transform">
              <div className="bg-emerald-100/80 p-2 sm:p-3 rounded-xl text-emerald-600 shadow-sm">
                <FaQuran className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-800">Bacaan Al-Quran</p>
                <p className="text-[10px] font-medium text-slate-500">Tajwid & Fasohah</p>
              </div>
            </div>

            {/* Floating Card 2: Bahasa Arab */}
            <div className="absolute top-1/2 right-0 sm:right-[-20px] lg:-right-4 xl:-right-12 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4 animate-in fade-in zoom-in duration-1000 delay-200 border border-amber-100/50 hover:scale-105 transition-transform">
              <div className="bg-amber-100/80 p-2 sm:p-3 rounded-xl text-amber-600 shadow-sm">
                <RiUserVoiceFill className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-800">Bahasa Arab</p>
                <p className="text-[10px] font-medium text-slate-500">Komunikasi & Nahu</p>
              </div>
            </div>

            {/* Floating Card 3: Fardu Ain */}
            <div className="absolute top-0 sm:top-16 left-0 sm:left-[-20px] lg:left-4 xl:-left-4 z-20 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4 animate-in fade-in slide-in-from-left-8 duration-1000 delay-300 border border-blue-100/50 hover:scale-105 transition-transform">
              <div className="bg-blue-100/80 p-2 sm:p-3 rounded-xl text-blue-600 shadow-sm">
                <FaPrayingHands className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-800">Fardu Ain</p>
                <p className="text-[10px] font-medium text-slate-500">Amali & Teori</p>
              </div>
            </div>

            {/* Main Person Image */}
            <div className="relative z-10 w-full h-full p-16 sm:p-12 md:p-20">
              <Image src="/assets/1.webp" alt="Hero Student" fill className="object-contain" priority />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-6 hidden md:block z-20">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 py-8 px-12">
          <div className="grid grid-cols-4 gap-8 divide-x divide-gray-300">
            {stats.map((stat, index) => (
              <div key={index} className="text-center px-4 ">
                <div className="text-3xl font-bold text-[#1A3C34] mb-1">
                  <CountUp to={stat.value} separator={stat.separator} />
                </div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
