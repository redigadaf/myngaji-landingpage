import { PageHeader } from "@/components/page-header";

export default function LokasiPage() {
  return (
    <main>
      <PageHeader
        title={
          <>
            Lokasi <span className="text-secondary">Kami</span>
          </>
        }
        description="Temui pusat pembelajaran Al-Quran kami yang berdekatan dengan anda. Kami komited untuk menyediakan suasana pembelajaran yang kondusif."
      />
      {/* Content will be added later */}
      <div className="container mx-auto px-6 py-12">
        <p className="text-center text-gray-500">Content coming soon...</p>
      </div>
    </main>
  );
}
