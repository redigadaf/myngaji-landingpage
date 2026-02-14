import { PageHeader } from "@/components/page-header";

export default function WaktuSholatPage() {
  return (
    <main>
      <PageHeader
        title={
          <>
            Waktu <span className="text-secondary">Sholat</span>
          </>
        }
        description="Jadual waktu solat yang tepat dan terkini untuk memudahkan urusan ibadah harian anda di mana sahaja anda berada."
      />
      {/* Content will be added later */}
      <div className="container mx-auto px-6 py-12">
        <p className="text-center text-gray-500">Content coming soon...</p>
      </div>
    </main>
  );
}
