"use client";

import PageHeader from "@/components/sections/tenaga-pengajar/page-header";
import InstructorCard from "@/components/sections/tenaga-pengajar/instructor-card";
import CTASection from "@/components/sections/tenaga-pengajar/cta-section";
import { useTeachers } from "@/hooks/useTeachers";

export default function TenagaPengajarPage() {
  const { teachers, loading, error } = useTeachers();

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

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-slate-200 rounded-3xl" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 font-bold mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-primary text-white rounded-full font-bold"
              >
                Cuba Lagi
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {teachers.map((teacher, index) => (
                <InstructorCard key={teacher.id} teacher={teacher} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />

    </main>
  );
}
