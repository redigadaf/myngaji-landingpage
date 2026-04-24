"use client";

import { HeroSection } from "@/components/sections/homepage/hero-section";
import { SenaraiPakejKelas } from "@/components/sections/homepage/senarai-pakej-kelas";
import { FAQSection } from "@/components/sections/homepage/faq-section";
import CtaSection from "@/components/sections/homepage/cta-section";
import TestimonialsSection from "@/components/sections/homepage/testimonial-v2";
import { FooterSection } from "@/components/layout/footer-section";
import { KelebihanSection } from "@/components/sections/homepage/kelebihan-section";
import { ContentSocialMedia } from "@/components/sections/homepage/content-socialmedia-section";
import { GaleriSection } from "@/components/sections/homepage/galeri-section";
import { PengajarSection } from "@/components/sections/homepage/pengajar/pengajar-section";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
      <HeroSection />
      <KelebihanSection />
      <SenaraiPakejKelas />
      <ContentSocialMedia />
      <GaleriSection />
      <PengajarSection />
      <TestimonialsSection />
      <FAQSection />
      <CtaSection />
      <FooterSection />
      <FloatingWhatsApp />
    </main>
  );
}
