import { PageHeader } from "@/components/page-header";
import { PainPoints } from "@/components/sections/kelas/alquran/pain-points";
import { Solution } from "@/components/sections/kelas/alquran/solution";
import { Offer } from "@/components/sections/kelas/alquran/offer";
import { Closing } from "@/components/sections/kelas/alquran/closing";
import { FAQAlquran } from "@/components/sections/kelas/alquran/faq-alquran";

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
      
      <PainPoints />
      <Solution />
      <Offer />
      <Closing />
      <FAQAlquran />
    </main>
  );
}
