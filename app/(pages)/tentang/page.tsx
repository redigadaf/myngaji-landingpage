"use client";

import { PageHeader } from "@/components/page-header";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, GraduationCap, LayoutList, Users, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "global",
    title: "Jangkauan Global",
    description: "Menghimpunkan pelajar daripada pelbagai latar belakang dari negara seperti Singapura, Saudi Arabia dan Qatar sejak tahun 2022.",
    icon: Globe,
    color: "bg-blue-500",
  },
  {
    id: "personal",
    title: "Pembelajaran Personal",
    description: "Membantu setiap pelajar melalui sesi pembelajaran mengikut tahap masing-masing dengan pendekatan yang fleksibel.",
    icon: LayoutList,
    color: "bg-teal-500",
  },
  {
    id: "expert",
    title: "Bimbingan Pakar",
    description: "Disertai bimbingan yang jelas, tersusun dan berterusan oleh asatizah yang kompeten & komited dalam bidang masing-masing.",
    icon: GraduationCap,
    color: "bg-yellow-500",
  },
];

export default function TentangPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <main className="min-h-screen bg-background pb-20">
      <PageHeader
        title={
          <>
            Tentang <span className="text-secondary">Kami</span>
          </>
        }
        description="Misi kami adalah untuk melahirkan generasi celik Al-Quran dengan kaedah pembelajaran yang mudah, menyeronokkan, dan berkesan."
      />

      
    </main>
  );
}
