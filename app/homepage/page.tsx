"use client";

import { HeroSection } from "@/components/sections/hero-section";
import { HadithSection } from "@/components/sections/hadith-section";
import { SenaraiPakejKelas } from "@/components/sections/senarai-pakej-kelas";
import ModernBackgroundPaths from "@/components/modern-background-paths";
import TestimonialsSection from "@/components/sections/testimonial-v2";
import { FooterSection } from "@/components/layout/footer-section";
import { KelebihanSection } from "@/components/sections/kelebihan-section";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
      <HeroSection />
      <KelebihanSection />
      <SenaraiPakejKelas />
      <ModernBackgroundPaths />
      {/* <HadithSection /> */}
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
