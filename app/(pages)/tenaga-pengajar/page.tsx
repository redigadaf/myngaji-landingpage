"use client";

import { FooterSection } from "@/components/layout/footer-section";
import PageHeader from "@/app/(pages)/tenaga-pengajar/components/page-header";
import InstructorCard from "@/app/(pages)/tenaga-pengajar/components/instructor-card";
import CTASection from "@/app/(pages)/tenaga-pengajar/components/cta-section";
import teachersData from "@/app/(pages)/tenaga-pengajar/data/data-guru.json";

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
            {teachersData.map((teacher, index) => (
              <InstructorCard key={teacher.id} teacher={teacher} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <FooterSection />
    </main>
  );
}
