import data from "@/components/sections/kelas/data.json";
import { PageHeader } from "@/components/page-header";
import { PainPoints } from "@/components/sections/kelas/detail/pain-points";
import { Solution } from "@/components/sections/kelas/detail/solution";
import { Proof } from "@/components/sections/kelas/detail/proof";
import { Offer } from "@/components/sections/kelas/detail/offer";
import { Closing } from "@/components/sections/kelas/detail/closing";
import { FAQ } from "@/components/sections/kelas/detail/faq-kelas";

export const metadata = {
  title: "Kelas KAFA | MyNgaji",
  description: "Bimbingan Fardu Ain & Al-Quran yang syumul untuk anak-anak. Modul interaktif Tauhid, Feqah, Akhlak, Sirah dan Jawi.",
};

const kelas = data["kelas-kafa"];

export default function KelasKafaPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title={<>{kelas.header.titlePart1} <span className="text-secondary">{kelas.header.titlePart2}</span></>}
        description={kelas.header.description}
      />
      <PainPoints data={kelas.painPoints} />
      <Solution data={kelas.solution} />
      <Proof data={kelas.proof} />
      <Offer 
        data={kelas.offer}
        packageName={kelas.offerConfig.packageName}
        packageDesc={kelas.offerConfig.packageDesc}
        featureList={kelas.offer.features}
      />
      <Closing data={kelas.closing} />
      <FAQ data={kelas.faqs} categoryName={kelas.header.titlePart2} />
    </main>
  );
}
