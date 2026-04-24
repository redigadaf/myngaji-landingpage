import data from "@/components/sections/kelas/data.json";
import { PageHeader } from "@/components/page-header";
import { PainPoints } from "@/components/sections/kelas/detail/pain-points";
import { Solution } from "@/components/sections/kelas/detail/solution";
import { Proof } from "@/components/sections/kelas/detail/proof";
import { Offer } from "@/components/sections/kelas/detail/offer";
import { Closing } from "@/components/sections/kelas/detail/closing";
import { FAQ } from "@/components/sections/kelas/detail/faq-kelas";

export const metadata = {
  title: "Kelas Hafazan | MyNgaji",
  description: "Lahirkan huffaz di dalam keluarga anda. Teknik hafalan sistematik, fokus kualiti bacaan dan ingatan jangka panjang.",
};

const kelas = data["kelas-hafazan"];

export default function KelasHafazanPage() {
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
        category="hafazan"
      />
      <Closing data={kelas.closing} />
      <FAQ data={kelas.faqs} categoryName={kelas.header.titlePart2} />
    </main>
  );
}
