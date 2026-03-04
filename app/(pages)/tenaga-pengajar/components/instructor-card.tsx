"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import teachersData from "@/app/(pages)/tenaga-pengajar/data/data-guru.json";

const InstructorCard = ({ teacher, index }: { teacher: (typeof teachersData)[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      <div className="relative h-72 w-full bg-teal-50/80 overflow-hidden">
        {/* Background Blob Effect */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-teal-800 via-amber-800 to-teal-800 rounded-[40%] animate-spin-slow opacity-[0.15]" />

        <Image src={teacher.image} alt={teacher.name} fill className="object-cover mt-6 object-top drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-500" />
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
            <p className="text-sm text-slate-500 leading-relaxed text-center line-clamp-3">{teacher.bio}</p>
          </div>
        </div>
      </div>

      {/* Hover Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
};

export default InstructorCard;
