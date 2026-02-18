"use client";

import { TextRevealByWord } from "@/components/ui/text-reveal";

export function IntroSection() {
  return (
    <section className="container px-4 pt-16 md:pt-24 pb-0 max-w-4xl mx-auto text-center">
      <div className="space-y-12">
        <TextRevealByWord
          text={`Myngaji merupakan platform pembelajaran agama dalam talian yang ditubuhkan pada tahun 2022, dengan fokus menyediakan pendidikan Islam yang tersusun, berperingkat dan mudah diakses oleh pelajar dari pelbagai latar belakang.

Menawarkan subjek seperti pembacaan Al-Quran, tajwid, asas Fardhu Ain serta pembetulan bacaan, sesi pembelajaran dijalankan secara fleksibel sama ada secara individu (one-to-one) atau berkumpulan, sesuai untuk kanak-kanak, dewasa, golongan profesional bekerja serta para ibu yang mempunyai jadual harian yang padat.

Sehingga kini, Myngaji telah membimbing hampir 500 orang pelajar dari lebih 5 buah negara termasuk Singapura, Saudi Arabia dan Qatar dalam meningkatkan keyakinan bacaan Al-Quran serta kefahaman asas agama melalui bimbingan berterusan oleh barisan asatizah yang berkelayakan dan komited.`}
          className="h-[150vh]"
        />
      </div>
    </section>
  );
}
