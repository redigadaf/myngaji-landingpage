import { PageHeader } from "@/components/page-header";

export default function KelasAlquranPage() {
  return (
    <main>
      <PageHeader
        title={
          <>
            Kelas <span className="text-secondary">Al-Quran</span>
          </>
        }
        description="Pelajari bacaan Al-Quran dari asas hingga mahir dengan bimbingan guru yang bertauliah. Kami menawarkan kelas mengaji personal dan berkumpulan."
      />
      {/* Content will be added later */}
      <div className="container mx-auto px-6 py-12">
        <p className="text-center text-gray-500">Content coming soon...</p>
      </div>
    </main>
  );
}
