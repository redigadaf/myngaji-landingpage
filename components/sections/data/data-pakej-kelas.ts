export type PakejKelas = {
  slug: string;
  nama: string;
  tagline: string;
  icon: string;
  deskripsi: string[];
  sesuaiUntuk: string[];
  syllabus: { tajuk: string; topik: string[] }[];
  badge?: string;
};

export const classesData: PakejKelas[] = [
  {
    slug: "mengaji-dewasa",
    nama: "Kelas Mengaji Dewasa",
    tagline: "Perbaiki bacaan Al-Quran dengan yakin dan lancar.",
    icon: "/pakej/iconn-5.svg",
    deskripsi: [
      "Kelas ini direka khas untuk pelajar dewasa yang ingin memperbaiki bacaan Al-Quran mengikut tajwid yang betul dan memahami makna bacaan mereka.",
      "Pelajar akan dibimbing dengan teknik yang sistematik, termasuk pembetulan kesalahan bacaan, pengulangan, serta penekanan terhadap tajwid and makhraj yang tepat.",
      "Pendekatan pembelajaran direka supaya fleksibel mengikut kemampuan pelajar, sama ada sesi one-to-one atau berkumpulan, bagi memudahkan golongan dewasa yang mempunyai jadual harian padat.",
      "Selain itu, kelas ini juga membantu pelajar memahami ayat yang dihafal, meningkatkan keyakinan membaca Al-Quran, dan membina rutin pembelajaran yang konsisten serta berkesan.",
    ],
    sesuaiUntuk: [
      "Dewasa yang ingin memulakan atau memperkukuh hafalan Al-Quran",
      "Golongan profesional yang mempunyai jadual harian padat",
      "Pelajar yang ingin memperbaiki bacaan dengan tajwid yang tepat",
      "Mereka yang ingin meningkatkan kefahaman terhadap ayat-ayat yang dibaca",
    ],
    syllabus: [
      {
        tajuk: "Pemantapan Makhraj & Sifat Huruf",
        topik: ["Koreksi sebutan huruf", "Sifat huruf tebal & nipis", "Latihan lisan intensif"],
      },
      {
        tajuk: "Hukum Tajwid Lengkap",
        topik: ["Nun Mati & Tanwin", "Mim Mati", "Hukum Mad & Waqaf"],
      },
      {
        tajuk: "Talaqqi & Musyafahah",
        topik: ["Bacaan Surah Pilihan", "Semakan bacaan depan guru", "Soal jawab hukum tajwid"],
      },
    ],
    badge: "Disyorkan",
  },
  {
    slug: "mengaji-kanak-kanak",
    nama: "Kelas Mengaji Kanak-Kanak",
    tagline: "Pembelajaran Al-Quran yang menyeronokkan untuk si kecil.",
    icon: "/pakej/icon-1.svg",
    deskripsi: [
      "Kelas ini direka khusus for kanak-kanak dengan pendekatan yang menyeronokkan, interaktif, dan berstruktur.",
      "Pelajar belajar membaca Al-Quran dengan asas tajwid yang mudah dipahami, melalui aktiviti kreatif, latihan interaktif, dan pengulangan berperingkat yang menyeronokkan.",
      "Selain itu, kanak-kanak juga akan dibimbing secara berperingkat mengikut kemampuan mereka bagi memastikan bacaan lancar, tepat, and membina disiplin dalam membaca Al-Quran sejak awal.",
      "Kelas ini membina asas bacaan yang kukuh sebagai persediaan untuk pembelajaran seterusnya, serta membantu menanam minat dan keyakinan membaca Al-Quran secara berterusan.",
    ],
    sesuaiUntuk: [
      "Kanak-kanak yang baru mula belajar membaca Al-Quran",
      "Anak-anak yang ingin memperkukuh asas bacaan dan tajwid",
      "Pelajar yang ingin rutin ulang kaji bacaan di rumah",
      "Ibu bapa yang mahu anak belajar dalam suasana ceria, interaktif dan positif",
    ],
    syllabus: [
      {
        tajuk: "Pengenalan Huruf Hijaiyah",
        topik: ["Mengenal bentuk dan bunyi huruf", "Makhraj huruf asas", "Latihan penyebutan"],
      },
      {
        tajuk: "Asas Bacaan & Tajwid Mudah",
        topik: ["Baris atas, bawah, depan", "Tanwin & Sukun", "Hukum Nun Mati & Mim Mati (Ringkas)"],
      },
      {
        tajuk: "Bacaan Surah Lazim",
        topik: ["Surah Al-Fatihah dengan betul", "Surah-surah pendek Juz Amma", "Latihan kelancaran"],
      },
    ],
    badge: "Paling Popular",
  },
  {
    slug: "bahasa-arab-dewasa",
    nama: "Bahasa Arab Dewasa",
    tagline: "Fahami bahasa Al-Quran dan komunikasi Arab.",
    icon: "/pakej/icon-6.svg",
    deskripsi: [
      "Kelas ini direka khas untuk membantu pelajar dewasa menguasai Bahasa Arab daripada peringkat asas sehingga mampu berkomunikasi dalam perbualan harian dengan yakin.",
      "Pembelajaran memberi fokus kepada kemahiran membaca, menulis dan bertutur secara seimbang. Pelajar akan dibimbing memahami struktur ayat, tatabahasa asas, serta memperkayakan kosa kata yang praktikal dan relevan dengan situasi harian.",
      "Program ini terbahagi kepada dua kategori utama: Bahasa Arab Komunikasi & Bahasa Arab Al-Quran.",
      "Bahasa Arab Komunikasi: Memberi penekanan kepada kemahiran bertutur dan memahami perbualan harian. Pelajar akan dilatih menggunakan ayat-ayat mudah dan praktikal supaya mampu berinteraksi dengan lebih yakin dalam situasi sebenar.",
      "Bahasa Arab Al-Quran: Memberi fokus kepada pemahaman teks Arab secara lebih mendalam, khususnya untuk membantu pelajar memahami makna dan intipati yang terkandung di dalam Al-Qur’an.",
    ],
    sesuaiUntuk: [
      "Dewasa yang ingin belajar dari asas",
      "Individu yang mahu memperbaiki bacaan dan pemahaman",
      "Mereka yang ingin berkomunikasi dalam Bahasa Arab dengan yakin",
      "Mereka yang ingin memahami mesej dan pengajaran dalam Al-Quran dengan lebih mendalam",
    ],
    syllabus: [
      {
        tajuk: "Bahasa Arab Komunikasi",
        topik: ["Kemahiran bertutur harian", "Penguasaan kosa kata praktikal"],
      },
      {
        tajuk: "Bahasa Arab Al-Quran",
        topik: ["Pemahaman teks Al-Quran", "Struktur bahasa dalam ayat suci"],
      },
    ],
  },
  {
    slug: "bahasa-arab-kanak-kanak",
    nama: "Bahasa Arab Kanak-Kanak",
    tagline: "Kuasai Bahasa Arab dengan aktiviti yang ceria.",
    icon: "/pakej/icon-2.svg",
    deskripsi: [
      "Anak-anak diperkenalkan dengan Bahasa Arab melalui pendekatan yang menyeronokkan dan interaktif seperti aktiviti kreatif, lagu-lagu pendek, permainan bahasa serta latihan sebutan yang mudah diikuti.",
      "Pembelajaran direka mengikut tahap umur supaya anak-anak dapat mengenal huruf hijaiyah, perkataan asas dan ayat mudah dengan cara yang santai dan berkesan.",
      "Selain itu, mereka juga akan belajar menggunakan silibus sekolah semasa sebagai sokongan pembelajaran. Ini membantu anak-anak membuat ulang kaji topik yang dipelajari di sekolah, mengukuhkan kefahaman serta meningkatkan keyakinan mereka dalam kelas.",
      "Kelas ini membina asas Bahasa Arab yang kukuh sebagai persediaan untuk pembelajaran seterusnya, sama ada dalam memahami teks Al-Qur’an mahupun untuk komunikasi harian.",
    ],
    sesuaiUntuk: [
      "Kanak-kanak yang baru berjinak-jinak dengan Bahasa Arab",
      "Anak-anak yang ingin memperkukuh asas bacaan",
      "Pelajar yang ingin mengulang kaji topik Bahasa Arab sekolah",
      "Ibu bapa yang mahu anak belajar dalam suasana ceria dan positif",
    ],
    syllabus: [
      {
        tajuk: "Kosa Kata Harian",
        topik: ["Anggota badan & Keluarga", "Warna & Nombor", "Peralatan sekolah & Rumah"],
      },
      {
        tajuk: "Perbualan Mudah",
        topik: ["Memperkenalkan diri", "Ucapan selamat & Terima kasih", "Bertanya khabar"],
      },
    ],
  },
  {
    slug: "fardhu-ain-kafa",
    nama: "Kelas Agama & Fardhu Ain (KAFA)",
    tagline: "Didikan asas agama yang kukuh untuk semua.",
    icon: "/pakej/icon-4.svg",
    deskripsi: [
      "Kelas KAFA ini memberi tumpuan kepada subjek dan tajuk yang terdapat dalam silibus peperiksaan UPKK (Ujian Penilaian Kelas KAFA) dan PSRA (Penilaian Sekolah Rendah Agama). Silibus disusun secara teratur mengikut format pembelajaran semasa bagi membantu pelajar memahami topik dengan lebih jelas dan tersusun.",
      "Pembelajaran dijalankan secara interaktif serta disertakan latih tubi berstruktur supaya pelajar bukan sahaja memahami isi pelajaran, malah mampu mengaplikasikan ilmu dalam kehidupan seharian.",
    ],
    sesuaiUntuk: [
      "Pelajar yang tidak mengikuti kelas KAFA di sekolah tetapi ingin mendapatkan pendidikan agama yang tersusun",
      "Ibu bapa yang memilih pembelajaran KAFA secara online sahaja",
      "Pelajar yang ingin mengukuhkan asas fardu ain walaupun tidak mengambil peperiksaan",
      "Pelajar yang bakal menduduki peperiksaan UPKK dan PSRA",
    ],
    syllabus: [
      {
        tajuk: "Tauhid (Akidah)",
        topik: ["Rukun Iman", "Sifat-sifat Allah", "Konsep ketuhanan & asas pegangan Islam"],
      },
      {
        tajuk: "Fiqh (Ibadah)",
        topik: ["Taharah (bersuci)", "Wuduk & Solat (asas & mendalam)", "Puasa & Ibadah wajib"],
      },
      {
        tajuk: "Sirah",
        topik: ["Riwayat hidup Nabi Muhammad", "Peristiwa penting sejarah Islam", "Ibrah & Pengajaran"],
      },
      {
        tajuk: "Akhlak (Adab & Akhlak Islamiah)",
        topik: ["Adab terhadap ibu bapa & guru", "Akhlak terpuji & Jauhi mazmumah"],
      },
      {
        tajuk: "Jawi & Khat",
        topik: ["Membaca & Menulis Jawi", "Ejaan & Latihan khat sistematik"],
      },
      {
        tajuk: "Bahasa Arab",
        topik: ["Kosa kata asas", "Tatabahasa mudah (isim, fi‘il, huruf)"],
      },
      {
        tajuk: "Tilawah Al-Quran",
        topik: ["Bacaan bertajwid", "Latihan kelancaran & Penilaian individu"],
      },
    ],
  },
  {
    slug: "hafazan-kanak-kanak",
    nama: "Hafazan Kanak-Kanak",
    tagline: "Hafal Al-Quran dengan teknik menyeronokkan.",
    icon: "/pakej/icon-3.svg",
    deskripsi: [
      "Kelas ini direka khas untuk membantu kanak-kanak menghafal Al-Quran dengan cara yang menyeronokkan dan berkesan. Program ini menekankan strategi hafalan, pengulangan konsisten, dan penguasaan tajwid supaya pelajar dapat membaca dengan lancar dan tepat.",
      "Pendekatan pembelajaran disesuaikan dengan tahap umur dan kemampuan kanak-kanak, menjadikan proses hafalan lebih mudah diikuti serta menyeronokkan.",
    ],
    sesuaiUntuk: [
      "Kanak-kanak yang baru memulakan hafalan",
      "Mereka yang ingin membina asas tajwid yang kuat",
      "Kanak-kanak yang ingin menghafal dengan konsisten dan menyeronokkan",
    ],
    syllabus: [
      {
        tajuk: "Teknik Hafalan",
        topik: ["Kaedah pengulangan (Tikrar)", "Jadual murajaah (ulangkaji)", "Teknik visualisasi ayat"],
      },
      {
        tajuk: "Target Hafalan",
        topik: ["Juz 30 (Juz Amma)", "Surah-surah Pilihan"],
      },
    ],
  },
  {
    slug: "hafazan-dewasa",
    nama: "Hafazan Dewasa",
    tagline: "Kukuhkan hafalan Al-Quran secara sistematik.",
    icon: "/pakej/icon-3.svg",
    deskripsi: [
      "Kelas ini direka untuk membantu dewasa memperkukuh hafalan Al-Quran secara sistematik dan berkesan. Program ini sesuai untuk mereka yang ingin memulakan hafalan baru, menambah hafalan sedia ada, atau memperbaiki bacaan dan tajwid bagi meningkatkan keyakinan membaca Al-Quran.",
      "Pembelajaran menekankan pendekatan holistik termasuk teknik hafalan berstruktur, pengulangan konsisten, pemahaman makna ayat, dan penguasaan tajwid yang tepat. Pelajar dibimbing supaya hafalan bukan sekadar diingati, tetapi juga difahami dan dihayati, menjadikan setiap ayat yang dihafal memberi manfaat spiritual yang mendalam.",
    ],
    sesuaiUntuk: [
      "Dewasa yang ingin memulakan atau menambah hafalan Al-Quran",
      "Individu yang mahu memperbaiki bacaan dan penguasaan tajwid",
      "Mereka yang ingin menghafal dengan sistematik dan konsisten",
      "Mereka yang ingin menghayati makna dan pengajaran Al-Quran dengan lebih mendalam",
    ],
    syllabus: [
      {
        tajuk: "Teknik Hafalan",
        topik: ["Kaedah pengulangan (Tikrar)", "Jadual murajaah (ulangkaji)"],
      },
      {
        tajuk: "Target Hafalan",
        topik: ["Juz 30 (Juz Amma)", "Juz 1-29 (Intensif)"],
      },
    ],
  },
];

export default classesData;
