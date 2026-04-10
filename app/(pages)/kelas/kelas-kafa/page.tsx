import { PageHeader } from "@/components/page-header";

export default function KelasKafaPage() {
  return (
    <main>
      <PageHeader
        title={
          <>
            Kelas <span className="text-secondary">Kafa</span>
          </>
        }
        description="Kelas KAFA (Keluarga Angkat Pengajian Agama) adalah program pendidikan agama yang direka khas untuk kanak-kanak berumur 7 hingga 12 tahun. Ia menawarkan pembelajaran yang komprehensif dalam bidang akidah, ibadah, sirah, akhlak, dan bacaan al-Quran, dengan penekanan pada nilai-nilai murni dan pembentukan sahsiah Islamik."
      />
      {/* Content will be added later */}
      <div className="container mx-auto px-6 py-12">
        <p className="text-center text-gray-500">Content coming soon...</p>
      </div>
    </main>
  );
}
