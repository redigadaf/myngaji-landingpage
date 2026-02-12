import { Flower2, Sprout } from "lucide-react";

export function HadithSection() {
  return (
    <section className="px-4 py-20 bg-background">
      <div className="max-w-5xl mx-auto bg-primary rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 text-primary-foreground opacity-5 transform -translate-x-10 -translate-y-10">
          <Flower2 width={150} height={150} />
        </div>
        <div className="absolute bottom-0 right-0 text-primary-foreground opacity-5 transform translate-x-10 translate-y-10">
          <Sprout width={150} height={150} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <p className="font-semibold text-2xl md:text-3xl text-primary-foreground leading-loose" dir="rtl">
            مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ، وَمَا اجْتَمَعَ قَوْمٌ فِي بَيْتٍ مِنْ بُيُوتِ اللهِ، يَتْلُونَ كِتَابَ اللهِ، وَيَتَدَارَسُونَهُ ,بَيْنَهُمْ، إِلَّا نَزَلَتْ
            عَلَيْهِمِ السَّكِينَةُ وَغَشِيَتْهُمُ الرَّحْمَةُ وَحَفَّتْهُمُ الْمَلَائِكَةُ، وَذَكَرَهُمُ اللهُ فِيمَنْ عِنْدَهُ
          </p>
          <p className="text-primary-foreground text-lg md:text-xl leading-relaxed font-regular">
            Barangsiapa yang menempuh satu jalan untuk menuntut ilmu, maka Allah SWT akan memudahkan baginya jalan untuk ke syurga. Tidaklah satu kumpulan berkumpul di dalam sebuah rumah di antara rumah-rumah Allah, membaca kitab Allah (Al
            Quran) dan mempelajarinya sesama mereka melainkan akan turun kepada mereka sakinah (ketenangan), diliputi ke atas mereka rahmat dan dinaungi oleh malaikat serta Allah SWT akan menyebut mereka pada malaikat yang berada di
            sisi-Nya.
          </p>
          <div className="inline-block px-6 py-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground text-sm font-medium">(Riwayat Muslim 4867)</div>
        </div>
      </div>
    </section>
  );
}
