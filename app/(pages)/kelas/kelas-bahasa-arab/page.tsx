import { PageHeader } from "@/components/page-header";

export default function KelasBahasaArabPage() {
  return (
    <main>
      <PageHeader
        title={
          <>
            Kelas <span className="text-secondary">Bahasa Arab</span>
          </>
        }
        description="Fahami keindahan bahasa Al-Quran dan komunikasi Arab. Modul pembelajaran yang disusun rapi untuk memudahkan pemahaman anda."
      />
      {/* Content will be added later */}
      <div className="container mx-auto px-6 py-12">
        <p className="text-center text-gray-500">Content coming soon...</p>
      </div>
    </main>
  );
}
