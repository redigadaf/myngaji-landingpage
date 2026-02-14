import { PageHeader } from "@/components/page-header";

export default function KelasFardhuAinPage() {
  return (
    <main>
      <PageHeader
        title={
          <>
            Kelas <span className="text-secondary">Fardhu Ain</span>
          </>
        }
        description="Mantapkan ilmu asas agama, solat, dan ibadah harian. Pembelajaran Fardhu Ain yang praktikal untuk kehidupan seharian seorang Muslim."
      />
      {/* Content will be added later */}
      <div className="container mx-auto px-6 py-12">
        <p className="text-center text-gray-500">Content coming soon...</p>
      </div>
    </main>
  );
}
