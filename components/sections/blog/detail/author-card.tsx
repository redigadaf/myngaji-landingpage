"use client";

import Image from "next/image";
import { Facebook, Twitter, Instagram, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Author {
  name: string;
  avatar: string;
  role?: string;
  bio?: string; // Optional for now
}

interface AuthorCardProps {
  author: Author;
}

export function AuthorSidebarCard({ author }: AuthorCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
      <div className="relative w-20 h-20 mx-auto mb-4">
        <Image src={author.avatar} alt={author.name} fill className="object-cover rounded-full border-4 border-emerald-50 dark:border-emerald-900" />
      </div>
      <h3 className="font-bold text-gray-900 dark:text-white text-lg">{author.name}</h3>
      <p className="text-primary dark:text-emerald-400 text-sm font-medium mb-3">{author.role || "Tenaga Pengajar"}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">Berpengalaman lebih 8 tahun dalam membimbing pelajar menguasai Al-Quran dengan teknik yang mudah dan berkesan.</p>
      <div className="flex justify-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-emerald-600 rounded-full">
          <Facebook className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-emerald-600 rounded-full">
          <Twitter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-emerald-600 rounded-full">
          <Instagram className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function AuthorFooterCard({ author }: AuthorCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
      <div className="flex-shrink-0 relative w-24 h-24">
        <Image src={author.avatar} alt={author.name} fill className="object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-md" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{author.name}</h3>
        <p className="text-primary dark:text-emerald-400 font-medium mb-3">{author.role || "Tenaga Pengajar Kanan"}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Ustazah Nur Aisyah adalah tenaga pengajar MyNgaji dengan pengalaman 8 tahun mengajar Al-Quran kepada kanak-kanak. Beliau memiliki Ijazah dalam Pengajian Islam dan Diploma Pendidikan. Beliau percaya setiap anak mempunyai potensi
          untuk mencintai Al-Quran jika dididik dengan cara yang betul.
        </p>
        <div className="flex justify-center md:justify-start gap-3">
          <Button variant="outline" size="sm" className="rounded-full text-xs text-primary">
            Lihat Profil
          </Button>
          <div className="flex gap-1 ml-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-primary rounded-full">
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-primary rounded-full">
              <Facebook className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
