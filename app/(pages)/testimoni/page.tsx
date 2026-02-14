import { PageHeader } from "@/components/page-header";

export default function TestimoniPage() {
  return (
    <main>
      <PageHeader
        title={
          <>
            Testimoni <span className="text-secondary">Pelajar</span>
          </>
        }
        description="Dengarkan pengalaman menarik dan kisah kejayaan daripada pelajar-pelajar kami yang telah berjaya menguasai bacaan Al-Quran bersama MyNgaji."
      />
      {/* Content will be added later */}
      <div className="container mx-auto px-6 py-12">
        <p className="text-center text-gray-500">Content coming soon...</p>
      </div>
    </main>
  );
}
