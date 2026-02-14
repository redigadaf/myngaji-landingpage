import { PageHeader } from "@/components/page-header";


export default function TentangPage() {
  return (
    <main>
      <PageHeader
        title={
          <>
            Tentang <span className="text-secondary">Kami</span>
          </>
        }
        description="Misi kami adalah untuk melahirkan generasi celik Al-Quran dengan kaedah pembelajaran yang mudah, menyeronokkan, dan berkesan untuk semua peringkat umur."
      />
    </main>
  );
}
