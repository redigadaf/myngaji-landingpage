"use client";

import { HeroSection } from "@/components/sections/homepage/hero-section";
import { HadithSection } from "@/components/sections/homepage/hadith-section";
import { SenaraiPakejKelas } from "@/components/sections/homepage/senarai-pakej-kelas";
import { FAQSection } from "@/components/sections/homepage/faq-section";
import ModernBackgroundPaths from "@/components/modern-background-paths";
import TestimonialsSection from "@/components/sections/homepage/testimonial-v2";
import { FooterSection } from "@/components/layout/footer-section";
import { KelebihanSection } from "@/components/sections/homepage/kelebihan-section";
import { ContentSocialMedia } from "@/components/sections/homepage/content-socialmedia";
import { GaleriSection } from "@/components/sections/homepage/galeri-section";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
      <HeroSection />
      <KelebihanSection />
      <SenaraiPakejKelas />
      <FAQSection />
      <ContentSocialMedia />
      <GaleriSection />
      <ModernBackgroundPaths />
      {/* <HadithSection /> */}
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
