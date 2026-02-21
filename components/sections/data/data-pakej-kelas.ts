export type PakejKelas = {
  slug: string;
  nama: string;
  tagline: string;
  icon: string;
  deskripsi: string[];
  sesuaiUntuk: string[];
  syllabus: { tajuk: string; topik: string[] }[];
  harga: { label: string; harga: string; tempoh: string }[];
  badge?: string;
};

export const classesData: PakejKelas[] = [
  {
    slug: "mengaji-kanak-kanak",
    nama: "Kelas Mengaji Kanak-Kanak",
    tagline: "Pembelajaran Al-Quran yang menyeronokkan untuk si kecil.",
    icon: "/pakej/icon-1.svg",
    deskripsi: [
      "Kelas ini direka khusus untuk kanak-kanak dengan pendekatan yang menyeronokkan, interaktif, dan berstruktur.",
      "Pelajar belajar membaca Al-Quran dengan asas tajwid yang mudah difahami, melalui aktiviti kreatif, latihan interaktif, dan pengulangan berperingkat yang menyeronokkan.",
      "Selain itu, kanak-kanak juga akan dibimbing secara berperingkat mengikut kemampuan mereka bagi memastikan bacaan lancar, tepat, dan membina disiplin dalam membaca Al-Quran sejak awal.",
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
    harga: [
      { label: "Basic", harga: "RM80", tempoh: "Bulan" },
      { label: "Pro", harga: "RM120", tempoh: "Bulan" },
      { label: "Premium", harga: "RM150", tempoh: "Bulan" },
    ],
    badge: "Paling Popular",
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
    harga: [
      { label: "Starter", harga: "RM90", tempoh: "Bulan" },
      { label: "Intensive", harga: "RM130", tempoh: "Bulan" },
    ],
  },
  {
    slug: "mengaji-dewasa",
    nama: "Kelas Mengaji Dewasa",
    tagline: "Perbaiki bacaan Al-Quran dengan yakin dan lancar.",
    icon: "/pakej/iconn-5.svg",
    deskripsi: [
      "Kelas ini direka khas untuk pelajar dewasa yang ingin memperbaiki bacaan Al-Quran mengikut tajwid yang betul dan memahami makna bacaan mereka.",
      "Pelajar akan dibimbing dengan teknik yang sistematik, termasuk pembetulan kesalahan bacaan, pengulangan, serta penekanan terhadap tajwid dan makhraj yang tepat.",
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
    harga: [
      { label: "Standard", harga: "RM100", tempoh: "Bulan" },
      { label: "Exclusive (1-on-1)", harga: "RM180", tempoh: "Bulan" },
    ],
    badge: "Disyorkan",
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
    ],
    syllabus: [
      {
        tajuk: "Tauhid (Akidah)",
        topik: ["Rukun Iman", "Sifat-sifat Allah", "Konsep ketuhanan dan asas pegangan Islam"],
      },
      {
        tajuk: "Fiqh (Ibadah)",
        topik: ["Taharah (bersuci)", "Wuduk dan perkara membatalkan wuduk", "Solat (rukun, syarat sah, perkara membatalkan)", "Puasa dan ibadah asas lain"],
      },
      {
        tajuk: "Sirah",
        topik: ["Riwayat hidup Nabi Muhammad", "Peristiwa penting dalam sejarah Islam", "Pengajaran dan ibrah daripada sirah"],
      },
      {
        tajuk: "Akhlak (Adab & Akhlak Islamiah)",
        topik: ["Adab terhadap ibu bapa, guru dan rakan", "Akhlak terpuji dan menjauhi akhlak tercela", "Pengamalan nilai Islam dalam kehidupan"],
      },
      {
        tajuk: "Jawi & Khat",
        topik: ["Membaca dan menulis Jawi", "Ejaan dan binaan ayat", "Latihan penulisan yang sistematik"],
      },
      {
        tajuk: "Bahasa Arab",
        topik: ["Kosa kata asas", "Tatabahasa mudah (isim, fi‘il, huruf)", "Kefahaman teks pendek"],
      },
      {
        tajuk: "Tilawah Al-Quran",
        topik: ["Bacaan yang betul dan bertajwid", "Latihan kelancaran bacaan", "Penilaian bacaan secara individu"],
      },
    ],
    harga: [
      { label: "Basic", harga: "RM90", tempoh: "Bulan" },
      { label: "Pro", harga: "RM120", tempoh: "Bulan" },
    ],
  },
  {
    slug: "bahasa-arab-dewasa",
    nama: "Bahasa Arab Dewasa",
    tagline: "Fahami bahasa Al-Quran dan komunikasi Arab.",
    icon: "/pakej/icon-6.svg",
    deskripsi: [
      "Kelas ini direka khas untuk membantu pelajar dewasa menguasai Bahasa Arab daripada peringkat asas sehingga mampu berkomunikasi dalam perbualan harian dengan yakin.",
      "Pembelajaran memberi fokus kepada kemahiran membaca, menulis dan bertutur secara seimbang. Pelajar akan dibimbing memahami struktur ayat, tatabahasa asas, serta memperkayakan kosa kata yang praktikal dan relevan dengan situasi harian.",
      "Program ini terbahagi kepada dua kategori utama: Bahasa Arab Komunikasi dan Bahasa Arab Al-Quran.",
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
        topik: ["Memberi penekanan kepada kemahiran bertutur dan memahami perbualan harian", "Melatih penggunaan ayat-ayat mudah dan praktikal dalam interaksi harian"],
      },
      {
        tajuk: "Bahasa Arab Al-Quran",
        topik: ["Fokus pemahaman teks Arab untuk mendalami makna dalam Al-Qur'an", "Mempelajari struktur bahasa yang sering digunakan dalam ayat-ayat Al-Quran"],
      },
    ],
    harga: [
      { label: "Standard", harga: "RM110", tempoh: "Bulan" },
      { label: "Premium", harga: "RM160", tempoh: "Bulan" },
    ],
  },
  {
    slug: "hafazan",
    nama: "Hafazan",
    tagline: "Hafal Al-Quran dengan teknik berkesan.",
    icon: "/pakej/icon-3.svg",
    deskripsi: [
      "Hafazan Kanak-kanak: Kelas ini direka khas untuk membantu kanak-kanak menghafal Al-Quran dengan cara yang menyeronokkan dan berkesan. Program ini menekankan strategi hafalan, pengulangan konsisten, dan penguasaan tajwid supaya pelajar dapat membaca dengan lancar dan tepat.",
      "Pendekatan pembelajaran disesuaikan dengan tahap umur dan kemampuan kanak-kanak, menjadikan proses hafalan lebih mudah diikuti serta menyeronokkan. Aktiviti interaktif dan teknik pengulangan kreatif membantu memastikan hafalan kekal dalam ingatan jangka panjang.",
      "Hafazan Dewasa: Kelas ini direka untuk membantu dewasa memperkukuh hafalan Al-Quran secara sistematik dan berkesan. Program ini sesuai untuk mereka yang ingin memulakan hafalan baru, menambah hafalan sedia ada, atau memperbaiki bacaan dan tajwid bagi meningkatkan keyakinan membaca Al-Quran.",
      "Pembelajaran menekankan pendekatan holistik termasuk teknik hafalan berstruktur, pengulangan konsisten, pemahaman makna ayat, dan penguasaan tajwid yang tepat. Pelajar dibimbing supaya hafalan bukan sekadar diingati, tetapi juga difahami dan dihayati, menjadikan setiap ayat yang dihafal memberi manfaat spiritual yang mendalam.",
    ],
    sesuaiUntuk: [
      "Kanak-kanak yang baru memulakan hafalan",
      "Mereka yang ingin membina asas tajwid yang kuat",
      "Kanak-kanak yang ingin menghafal dengan konsisten dan menyeronokkan",
      "Dewasa yang ingin memulakan atau menambah hafalan Al-Quran",
      "Individu yang mahu memperbaiki bacaan dan penguasaan tajwid",
      "Mereka yang ingin menghafal dengan sistematik dan konsisten",
      "Mereka yang ingin menghayati makna dan pengajaran Al-Quran dengan lebih mendalam",
    ],
    syllabus: [
      {
        tajuk: "Teknik Hafalan",
        topik: ["Kaedah pengulangan (Tikrar)", "Jadual murajaah (ulangkaji)", "Teknik visualisasi ayat"],
      },
      {
        tajuk: "Target Hafalan",
        topik: ["Juz 30 (Juz Amma)", "Surah-surah Pilihan (Al-Mulk, Yasin, dll)", "Juz 1-29 (Intensif)"],
      },
    ],
    harga: [
      { label: "Basic", harga: "RM120", tempoh: "Bulan" },
      { label: "Intensive", harga: "RM200", tempoh: "Bulan" },
    ],
  },
];

export default classesData; // Fallback for default import if needed, but named export is better
