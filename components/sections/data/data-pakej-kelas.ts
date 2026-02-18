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
      "Direka khas untuk kanak-kanak, kelas ini dijalankan dengan kaedah yang menyeronokkan dan interaktif.",
      "Kanak-kanak belajar membaca Al-Quran dengan asas tajwid yang mudah difahami serta memupuk minat membaca al-Quran sejak kecil.",
      "Modul kami menekankan pendekatan psikologi kanak-kanak supaya mereka tidak bosan dan sentiasa bersemangat untuk belajar.",
    ],
    sesuaiUntuk: ["Kanak-kanak berumur 5 hingga 12 tahun", "Kanak-kanak yang baru mula belajar", "Mereka yang ingin memperbaiki bacaan asas", "Kanak-kanak yang perlukan bimbingan one-to-one"],
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
      "Anak-anak diperkenalkan dengan bahasa Arab melalui aktiviti yang menyeronokkan, lagu pendek, dan permainan.",
      "Kelas ini membina asas yang kukuh untuk pembelajaran selanjutnya dalam Al-Quran dan komunikasi harian.",
      "Melalui kaedah visual dan audio, kanak-kanak lebih mudah mengingati kosa kata dan ayat-ayat mudah.",
    ],
    sesuaiUntuk: ["Kanak-kanak 5-12 tahun", "Pelajar tadika Islam", "Ibu bapa yang ingin anak mahir dwibahasa"],
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
      "Sesuai untuk pelajar dewasa yang ingin memperbaiki bacaan Al-Quran mengikut tajwid yang betul.",
      "Kelas ini menumpukan pada kefahaman bacaan, memperbaiki kesalahan, dan membina keyakinan membaca Al-Quran dengan lancar dan bertajwid.",
      "Jadual yang fleksibel membolehkan anda belajar tanpa mengganggu komitmen kerja atau keluarga.",
    ],
    sesuaiUntuk: ["Dewasa yang sibuk bekerja", "Mereka yang ingin memperbetulkan tajwid", "Mualaf yang baru memeluk Islam", "Warga emas yang ingin mengisi masa lapang"],
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
      "Kelas KAFA menyediakan asas pendidikan Islam untuk kanak-kanak, merangkumi tauhid, ibadah, akhlak, sirah, dan fardu ain.",
      "Pelajar belajar dengan kaedah interaktif supaya ilmu agama mudah difahami, diamalkan, dan menjadi sebahagian daripada kehidupan harian mereka.",
      "Kelas ini juga menekankan amalan fardu ain seperti solat, wuduk, doa, dan ibadah harian, sesuai untuk semua peringkat umur yang ingin memastikan amalan mereka mengikut syarak.",
    ],
    sesuaiUntuk: ["Kanak-kanak sekolah rendah", "Remaja yang perlukan pengukuhan", "Dewasa yang ingin ulangkaji Fardhu Ain"],
    syllabus: [
      {
        tajuk: "Ibadah & Feqah",
        topik: ["Rukun Islam & Iman", "Tatacara Solat & Wuduk", "Puasa & Zakat"],
      },
      {
        tajuk: "Akhlak & Tasawwuf",
        topik: ["Adab dengan ibubapa", "Adab seharian", "Penyucian hati"],
      },
      {
        tajuk: "Sirah Nabi",
        topik: ["Kisah Nabi Muhammad SAW", "Para Sahabat", "Pengajaran dari Sirah"],
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
      "Kelas ini membantu pelajar dewasa menguasai Bahasa Arab dari asas hingga perbualan harian.",
      "Fokus pada kemahiran membaca, menulis, dan bertutur supaya pelajar dapat memahami teks Arab dengan lebih mendalam seterusnya memahami intipati di dalam al-Quran.",
      "Sesuai untuk tujuan melancong, perniagaan, atau mendalami ilmu agama.",
    ],
    sesuaiUntuk: ["Pelajar universiti", "Dewasa bekerjaya", "Jemaah Haji & Umrah"],
    syllabus: [
      {
        tajuk: "Nahu & Sorof Asas",
        topik: ["Pembinaaan ayat mudah", "Kata kerja & Kata nama", "Perubahan baris akhir"],
      },
      {
        tajuk: "Komunikasi Praktikal",
        topik: ["Dialog di lapangan terbang", "Urusan jual beli", "Perbualan di hotel"],
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
      "Kelas ini fokus kepada teknik menghafal Al-Quran dengan berkesan dan konsisten.",
      "Pelajar diajar strategi hafalan, pengulangan, dan tajwid agar dapat menghafal dengan lancar dan tepat.",
      "Kami menggunakan kaedah yang terbukti membantu ingatan jangka panjang dan pemantapan hafalan.",
    ],
    sesuaiUntuk: ["Kanak-kanak & Remaja", "Dewasa yang ingin menghafal Juz Amma", "Mereka yang ingin menjadi huffaz"],
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
