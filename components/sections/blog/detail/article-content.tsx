"use client";

import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// This is a comprehensive component that simulates markdown rendering for the specific demo content
// In a real app with dynamic content, we'd use react-markdown or MDX

export function ArticleContent() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("Example code snippet");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="prose prose-lg prose-emerald dark:prose-invert max-w-none">
      {/* Introduction */}
      <p className="lead text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
        Sebagai ibu bapa Muslim, mengajar anak mengaji adalah salah satu tanggungjawab penting dalam pendidikan agama mereka. Namun, ramai yang berasa mencabar untuk memulakan atau mengekalkan konsistensi pembelajaran di rumah.
      </p>

      <p className="mb-8">Jangan risau! Dengan pendekatan yang betul, anda boleh menjadikan sesi mengaji di rumah lebih menyeronokkan dan berkesan. Berikut adalah 7 tips praktikal yang boleh anda amalkan hari ini.</p>

      {/* Section 1 */}
      <h2 id="section-1" className="text-2xl font-bold text-primary dark:text-emerald-400 mt-10 mb-4 flex items-center gap-2 group cursor-pointer scroll-mt-24">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">1</span>
        Tetapkan Waktu Khusus Setiap Hari
      </h2>
      <p>Konsistensi adalah kunci kejayaan dalam pembelajaran. Tetapkan waktu khusus setiap hari untuk sesi mengaji, contohnya:</p>
      <ul className="my-6 space-y-2 list-none pl-0">
        {["Selepas Maghrib (15-20 minit)", "Sebelum tidur (10-15 minit)", "Selepas makan pagi hujung minggu"].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <blockquote className="border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 p-6 my-8 rounded-r-lg italic text-gray-700 dark:text-gray-300">
        <div className="flex gap-2 mb-2 font-bold text-emerald-700 dark:text-emerald-400 not-italic">💡 Tip Pro:</div>
        "Mulakan dengan durasi pendek (10 minit) dan tingkatkan secara beransur-ansur. Ini lebih baik daripada sesi panjang yang memenatkan."
      </blockquote>

      <p>Pastikan waktu ini bebas daripada gangguan seperti televisyen atau permainan. Jadikan ia sebagai 'sacred time' yang anak-anak nantikan.</p>

      {/* Section 2 */}
      <h2 id="section-2" className="text-2xl font-bold text-primary dark:text-emerald-400 mt-12 mb-4 flex items-center gap-2 group scroll-mt-24">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">2</span>
        Cipta Persekitaran Pembelajaran yang Selesa
      </h2>

      <p>Ruang pembelajaran yang kondusif mempengaruhi fokus anak. Sediakan:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
          <h4 className="font-bold text-primary mb-2">Sudut Mengaji Khas</h4>
          <p className="text-sm">Sediakan alas atau sejadah kecil yang selesa.</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
          <h4 className="font-bold text-primary mb-2">Pencahayaan Baik</h4>
          <p className="text-sm">Elakkan mata cepat penat dengan cahaya yang cukup.</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
          <h4 className="font-bold text-primary mb-2">Rak Kecil</h4>
          <p className="text-sm">Untuk simpan Al-Quran, Rehal dan buku iqra'.</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
          <h4 className="font-bold text-primary mb-2">Hiasan Dinding</h4>
          <p className="text-sm">Gantung kaligrafi atau doa harian.</p>
        </div>
      </div>

      <p>Biarkan anak membantu menghias sudut ini - ia memberi 'sense of ownership' dan mereka akan lebih excited untuk belajar di situ.</p>

      <figure className="my-8">
        <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md">
          <Image src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=2070&auto=format&fit=crop" alt="Sudut mengaji kanak-kanak" fill className="object-cover" />
        </div>
        <figcaption className="text-center text-sm text-gray-500 mt-2 italic">Contoh sudut mengaji yang menarik dan tenang</figcaption>
      </figure>

      {/* Section 3 */}
      <h2 id="section-3" className="text-2xl font-bold text-primary dark:text-emerald-400 mt-12 mb-4 flex items-center gap-2 group scroll-mt-24">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">3</span>
        Gunakan Kaedah Pembelajaran yang Menyeronokkan
      </h2>

      <p>Pembelajaran tidak semestinya serius dan membosankan. Cuba variasikan dengan:</p>

      <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">a) Gamifikasi</h3>
      <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
        <li>
          Buat <strong>'star chart'</strong> - beri bintang untuk setiap sesi berjaya
        </li>
        <li>Hadiah kecil selepas capai target (contoh: 20 bintang)</li>
        <li>Sistem 'level up' seperti dalam games</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">b) Multimedia</h3>
      <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
        <li>Apps pembelajaran mengaji yang interaktif</li>
        <li>Video tajwid yang menarik</li>
        <li>Audio bacaan Al-Quran yang merdu</li>
      </ul>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-6 rounded-r-lg">
        <p className="text-yellow-800 dark:text-yellow-200 font-medium">⚠️ Penting: Pastikan game dan aktiviti tidak mengalahkan objektif utama - iaitu belajar membaca Al-Quran dengan betul.</p>
      </div>

      {/* Section 4 */}
      <h2 id="section-4" className="text-2xl font-bold text-primary dark:text-emerald-400 mt-12 mb-4 flex items-center gap-2 group scroll-mt-24">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">4</span>
        Berikan Pujian dan Galakan yang Spesifik
      </h2>
      <p>Anak-anak berkembang dengan galakan positif. Daripada hanya kata "Bagus!", cuba lebih spesifik:</p>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100">
          <span className="text-red-600 font-bold block mb-2">❌ Kurang efektif:</span>
          <p>"Bagus!"</p>
        </div>
        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-lg border border-emerald-100">
          <span className="text-emerald-600 font-bold block mb-2">✅ Lebih efektif:</span>
          <p>"MasyaAllah, bacaan huruf 'qaf' awak dah sangat betul hari ni! Mesti awak dah practice kan?"</p>
        </div>
      </div>

      {/* Section 5 */}
      <h2 id="section-5" className="text-2xl font-bold text-primary dark:text-emerald-400 mt-12 mb-4 flex items-center gap-2 group scroll-mt-24">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">5</span>
        Jadi Role Model yang Baik
      </h2>
      <p>Anak meniru apa yang mereka lihat. Jika ibu bapa rajin membaca Al-Quran, anak akan terikut.</p>

      {/* Section 6 */}
      <h2 id="section-6" className="text-2xl font-bold text-primary dark:text-emerald-400 mt-12 mb-4 flex items-center gap-2 group scroll-mt-24">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">6</span>
        Sabar dan Jangan Bandingkan
      </h2>
      <p>Setiap anak berkembang pada kadar yang berbeza. Ada yang cepat tangkap, ada yang perlukan masa lebih lama. Dan itu NORMAL. Jangan bandingkan dengan anak lain atau adik beradik mereka.</p>

      {/* Section 7 */}
      <h2 id="section-7" className="text-2xl font-bold text-primary dark:text-emerald-400 mt-12 mb-4 flex items-center gap-2 group scroll-mt-24">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">7</span>
        Gunakan Teknologi dengan Bijak
      </h2>
      <p>
        Platform online seperti <span className="text-emerald-600 font-bold">MyNgaji</span> menawarkan kelas mengaji one-to-one dengan ustaz/ustazah yang berpengalaman. Ini boleh menjadi sokongan tambahan yang hebat.
      </p>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      <h2 id="kesimpulan" className="text-2xl font-bold text-primary dark:text-emerald-400 mb-4 scroll-mt-24">
        Kesimpulan
      </h2>
      <p>Mengajar anak mengaji di rumah memerlukan kesabaran, konsistensi, dan kreativiti. Namun, ia adalah satu pelaburan terbaik yang ibu bapa boleh buat untuk anak-anak.</p>

      <div className="bg-primary text-white p-8 rounded-xl text-center my-8 shadow-lg">
        <h3 className="text-xl font-bold mb-2">Perlukan bantuan profesional?</h3>
        <p className="mb-6 opacity-90">MyNgaji menawarkan kelas mengaji one-to-one dengan ustaz/ustazah yang berpengalaman.</p>
        <button className="bg-white text-primary px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-sm">Daftar Kelas Percubaan Percuma</button>
      </div>
    </article>
  );
}
