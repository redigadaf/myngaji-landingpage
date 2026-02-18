"use client";

import { PageHeader } from "@/components/page-header";
import { IntroSection } from "@/components/sections/tentang/intro-section";
import { FeaturesSection } from "@/components/sections/tentang/features-section";

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-zinc-950 pb-20">
      <PageHeader
        title={
          <>
            Tentang <span className="text-secondary">Kami</span>
          </>
        }
        description="Misi kami adalah untuk melahirkan generasi celik Al-Quran dengan kaedah pembelajaran yang mudah, menyeronokkan, dan berkesan."
      />

      <IntroSection />
      <FeaturesSection />
    </main>
  );
}
