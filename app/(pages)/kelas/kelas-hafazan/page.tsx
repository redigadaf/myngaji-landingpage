import { PageHeader } from "@/components/page-header";

export default function KelasHafazanPage() {
  return (
    <main>
      <PageHeader
        title={
          <>
            Kelas <span className="text-secondary">Hafazan</span>
          </>
        }
        description="Kelas Hafazan direka khas untuk membantu pelajar menghafal al-Quran dengan lebih berkesan dan sistematik. Dengan teknik hafazan moden dan bimbingan guru berpengalaman, pelajar dapat meningkatkan daya ingatan dan kefahaman mereka terhadap ayat-ayat suci al-Quran."
      />
      {/* Content will be added later */}
      <div className="container mx-auto px-6 py-12">
        <p className="text-center text-gray-500">Content coming soon...</p>
      </div>
    </main>
  );
}
